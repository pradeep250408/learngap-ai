/* ============================================================
   dashboard.js — Dashboard Logic (Multi-Department)
   ============================================================ */

let trendChartInstance = null;
let radarChartInstance = null;

document.addEventListener('DOMContentLoaded', async () => {
  const isDemo = isDemoMode();
  const session = getSession();

  if (!session && !isDemo) {
    window.location.href = 'auth.html';
    return;
  }

  if (isDemo) showDemoBanner();
  initMobileSidebar();

  const currentDept = getSelectedDepartment();
  
  // Set department dropdown value
  const deptSelector = document.getElementById('dept-selector');
  if (deptSelector) deptSelector.value = currentDept;

  // Load data for department
  const data = isDemo ? getDemoData(currentDept) : await API.getProgress(session?.id).catch(() => getDemoData(currentDept));
  const student = isDemo ? getDemoData(currentDept).student : (session || getDemoData(currentDept).student);

  renderDashboard(student, data, currentDept);
  renderActivityFeed(isDemo ? getDemoData(currentDept).activity : []);
  initCharts(data);
  
  const recs = generateRecommendations(data.conceptProgress);
  renderRecommendationCard(recs[0]);
  renderRoadmapSummary(data.conceptProgress);

  setTimeout(() => {
    document.querySelectorAll('[data-animate-num]').forEach(el => {
      const target = parseInt(el.dataset.animateNum);
      const suffix = el.dataset.suffix || '';
      animateNumber(el, target, 1200, suffix);
    });
  }, 300);
});

function renderDashboard(student, data, currentDept) {
  const { conceptProgress } = data;
  const overall = computeOverallMastery(conceptProgress);
  const total   = student.totalQuestions || conceptProgress.reduce((a, b) => a + b.attempt_count, 0);
  const correct = student.totalCorrect   || conceptProgress.reduce((a, b) => a + b.correct_count, 0);
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const mastered = conceptProgress.filter(c => c.mastery_score >= 90).length;
  const needsPractice = conceptProgress.filter(c => c.mastery_score < 60).length;

  const deptFullName = DEPARTMENTS[currentDept] || 'Engineering';

  // Greeting
  document.getElementById('greeting-text').textContent = `${getGreeting()}, ${student.name?.split(' ')[0] || 'Student'} 👋`;
  document.getElementById('greeting-sub').textContent = needsPractice > 0
    ? `You have ${needsPractice} concept${needsPractice > 1 ? 's' : ''} in ${deptFullName} needing attention today.`
    : `Great job! Your ${deptFullName} performance is strong.`;

  // Update user avatar / name in sidebar
  const nameEls = document.querySelectorAll('.user-name');
  const initEls = document.querySelectorAll('.user-avatar');
  nameEls.forEach(el => el.textContent = student.name || 'Student');
  initEls.forEach(el => {
    el.innerHTML = `<img src="assets/images/student_avatar.png" alt="${escapeHtml(student.name || 'Student')}">`;
  });
  
  const deptLabelEl = document.getElementById('sidebar-dept-name');
  if (deptLabelEl) deptLabelEl.textContent = `${currentDept} Student`;

  // Metric cards
  setMetric('overall-mastery', overall, '%');
  setMetric('questions-count', total);
  setMetric('accuracy-val', accuracy, '%');
  setMetric('streak-val', student.streak || 7);
  setMetric('mastered-count', mastered);
  setMetric('needs-count', needsPractice);

  renderGapList(conceptProgress);
}

function setMetric(id, value, suffix = '') {
  const el = document.getElementById(id);
  if (el) {
    el.setAttribute('data-animate-num', value);
    el.setAttribute('data-suffix', suffix);
    el.textContent = '0' + suffix;
  }
}

function renderGapList(conceptProgress) {
  const container = document.getElementById('gap-list');
  if (!container) return;

  const weakest = getWeakestConcepts(conceptProgress, 5);

  if (!weakest.length) {
    container.innerHTML = `<div class="empty-state" style="padding:20px;"><p>No gaps detected in this department yet!</p></div>`;
    return;
  }

  container.innerHTML = weakest.map(concept => {
    const level = getMasteryLevel(concept.mastery_score);
    return `
      <div class="gap-item">
        <div class="gap-header">
          <div class="gap-name">
            <span>${level.icon}</span>
            ${escapeHtml(concept.concept)}
            <span class="text-xs text-muted">(${concept.topic})</span>
          </div>
          <div class="gap-meta">
            <span class="gap-score" style="color:${level.color}">${concept.mastery_score}%</span>
            <span class="badge ${level.badgeClass}">${level.label}</span>
          </div>
        </div>
        ${renderProgressBar(concept.mastery_score)}
      </div>`;
  }).join('');
}

function renderActivityFeed(activities) {
  const container = document.getElementById('activity-list');
  if (!container) return;

  if (!activities.length) {
    container.innerHTML = `<div class="empty-state" style="padding:24px;"><p>No activity yet. Start practicing!</p></div>`;
    return;
  }

  container.innerHTML = activities.slice(0, 6).map(a => `
    <div class="activity-item">
      <div class="activity-dot ${a.type}"></div>
      <div class="activity-content">
        <div class="activity-title">${escapeHtml(a.title)}</div>
        <div class="activity-time">${timeAgo(a.time)}</div>
      </div>
    </div>`).join('');
}

function renderRecommendationCard(rec) {
  const container = document.getElementById('recommendation-card');
  if (!container || !rec) return;

  container.innerHTML = `
    <div class="recommendation-header-graphic">
      <div>
        <div class="rec-label">🎯 Recommended Focus Area</div>
        <div class="rec-concept">${escapeHtml(rec.concept)}</div>
        <div class="rec-accuracy">Current accuracy: <strong>${rec.accuracy}%</strong></div>
      </div>
      <img src="assets/images/ai_tutor.png" alt="AI Study Tutor" class="recommendation-thumb">
    </div>
    <p style="font-size:0.875rem; color:rgba(255,255,255,0.85); margin-bottom:16px;">${escapeHtml(rec.reason)}</p>
    <div style="margin-bottom:20px; background:rgba(255,255,255,0.08); padding:12px 16px; border-radius:12px; border:1px solid rgba(255,255,255,0.12);">
      <h4 style="font-size:0.75rem; font-weight:700; color:rgba(255,255,255,0.75); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px;">Recommended sequence:</h4>
      ${(rec.sequence || []).map((s, i) => `
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:0.85rem; color:rgba(255,255,255,0.9);">
          <span style="width:20px; height:20px; background:rgba(56,189,248,0.3); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:700; flex-shrink:0;">${i + 1}</span>
          ${escapeHtml(s)}
        </div>`).join('')}
    </div>
    <button class="rec-btn" onclick="navigate('practice.html${isDemoMode() ? '?demo=true' : ''}')" id="start-practice-btn">
      🚀 Start Targeted Practice →
    </button>`;
}

function renderRoadmapSummary(conceptProgress) {
  const container = document.getElementById('roadmap-summary');
  if (!container) return;

  const roadmap = generateRoadmap(conceptProgress).slice(0, 5);
  container.innerHTML = roadmap.map(item => `
    <div class="topic-mastery-item">
      <div class="topic-icon ${TOPIC_COLORS[item.topic] || 'icon-indigo'}">${TOPIC_ICONS[item.topic] || '📚'}</div>
      <div class="topic-info">
        <div class="topic-name">${item.topic}</div>
        <div class="topic-sub">${item.concepts.length} concepts</div>
      </div>
      <div class="topic-score" style="color:${item.mastery > 75 ? 'var(--success-600)' : item.mastery > 50 ? 'var(--warning-600)' : 'var(--danger-600)'}">${item.mastery}%</div>
    </div>`).join('');
}

function initCharts(data) {
  const { conceptProgress } = data;
  const topicMastery = computeTopicMastery(conceptProgress);

  // Radar chart
  const radarCtx = document.getElementById('radar-chart');
  if (radarCtx && typeof Chart !== 'undefined') {
    if (radarChartInstance) radarChartInstance.destroy();
    radarChartInstance = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: topicMastery.map(t => t.topic),
        datasets: [{
          label: 'Mastery %',
          data: topicMastery.map(t => t.mastery),
          backgroundColor: 'rgba(99,102,241,0.15)',
          borderColor: '#6366f1',
          borderWidth: 2,
          pointBackgroundColor: '#6366f1',
          pointRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { stepSize: 25, font: { size: 10 } },
            grid: { color: '#e2e8f0' },
            pointLabels: { font: { size: 11, weight: '600' }, color: '#334155' },
          },
        },
        plugins: { legend: { display: false } },
      },
    });
  }

  // Mastery trend line chart
  const trendCtx = document.getElementById('trend-chart');
  if (trendCtx && typeof Chart !== 'undefined') {
    if (trendChartInstance) trendChartInstance.destroy();
    const mockTrend = [52, 55, 58, 62, 64, 68, computeOverallMastery(conceptProgress)];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];

    trendChartInstance = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Overall Mastery',
          data: mockTrend,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#6366f1',
          pointRadius: 4,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: { min: 30, max: 100, ticks: { stepSize: 20 }, grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } },
        },
        plugins: { legend: { display: false } },
      },
    });
  }
}
