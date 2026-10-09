/* ============================================================
   quiz.js — Adaptive Quiz Engine
   ============================================================ */

let session;
let adaptiveSession;
let currentQuestion = null;
let selectedAnswer = null;
let questionTimer = null;
let timeElapsed = 0;
let questionCount = 0;
let practiceMode = 'quiz'; // 'quiz' or 'study'
const MAX_QUESTIONS = 10;

document.addEventListener('DOMContentLoaded', async () => {
  const isDemo = isDemoMode();
  const s = getSession();

  if (!s && !isDemo) { window.location.href = 'auth.html'; return; }
  if (isDemo) showDemoBanner();
  initMobileSidebar();

  setActiveNav('practice');

  const data = isDemo ? getDemoData() : await API.getProgress(s?.id).catch(() => getDemoData());
  session = isDemo ? getDemoData().student : (s || getDemoData().student);

  adaptiveSession = new AdaptiveSession(session.id, data.conceptProgress);

  // Update user info
  document.querySelectorAll('.user-name').forEach(el => el.textContent = session.name || 'Student');
  document.querySelectorAll('.user-avatar').forEach(el => el.textContent = getInitials(session.name));

  loadNextQuestion();
});

function switchPracticeMode(mode) {
  practiceMode = mode;
  document.getElementById('btn-mode-quiz')?.classList.toggle('active', mode === 'quiz');
  document.getElementById('btn-mode-study')?.classList.toggle('active', mode === 'study');
  
  const modeLabel = document.getElementById('current-mode-label');
  if (modeLabel) {
    modeLabel.textContent = mode === 'quiz' ? '🎯 Adaptive Quiz' : '📖 Study Q&A Mode';
  }

  const timerEl = document.getElementById('quiz-timer');
  const progressEl = document.getElementById('progress-container');

  if (mode === 'study') {
    stopTimer();
    if (timerEl) timerEl.style.display = 'none';
    if (progressEl) progressEl.style.display = 'none';
    renderStudyQAMode();
  } else {
    if (timerEl) timerEl.style.display = 'flex';
    if (progressEl) progressEl.style.display = 'flex';
    questionCount = 0;
    loadNextQuestion();
  }
}

function renderStudyQAMode() {
  const currentDept = getSelectedDepartment();
  const qArea = document.getElementById('question-area');
  const expArea = document.getElementById('explanation-area');
  if (expArea) expArea.innerHTML = '';

  const qas = getQuestionsAndAnswersForConcept(currentDept, '');

  qArea.innerHTML = `
    <div class="card mb-lg" style="background:linear-gradient(135deg, var(--primary-600), var(--accent-600)); color:#fff; border:none; padding:24px;">
      <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; opacity:0.8;">STUDY & REVISION MODE</div>
      <h2 style="color:#fff; margin:4px 0 8px;">${DEPARTMENTS[currentDept] || currentDept} — Questions & Detailed Solutions</h2>
      <p style="color:rgba(255,255,255,0.9); margin:0;">Explore verified practice questions with step-by-step explanations, key formulas, and verified answers.</p>
    </div>
    <div class="qa-list">
      ${qas.map((q, idx) => `
        <div class="qa-card mb-md">
          <div class="qa-card-header">
            <div class="qa-question-title">Q${idx + 1}. ${escapeHtml(q.question)}</div>
            <div style="display:flex; gap:6px;">
              <span class="concept-tag">📚 ${escapeHtml(q.concept)}</span>
              <span class="badge ${DIFFICULTY_LEVELS[q.difficulty]?.badgeClass || 'badge-easy'}">${DIFFICULTY_LEVELS[q.difficulty]?.label || 'Easy'}</span>
            </div>
          </div>
          <div class="qa-options-list">
            ${q.options.map((opt, i) => {
              const letter = ['A','B','C','D'][i];
              const isCorrect = letter === q.correctAnswer;
              return `
                <div class="qa-option-item ${isCorrect ? 'is-correct' : ''}">
                  <span style="font-weight:700; font-size:0.8rem;">${letter}.</span>
                  <span>${escapeHtml(opt)}</span>
                  ${isCorrect ? '<span style="margin-left:auto;">✓ Verified Answer</span>' : ''}
                </div>`;
            }).join('')}
          </div>
          <div class="qa-solution-box">
            <div class="qa-solution-title">💡 Detailed Solution & Analysis</div>
            <div class="qa-solution-text">${escapeHtml(q.explanation)}</div>
            ${q.keyTakeaway ? `<div class="qa-key-takeaway">🔑 <strong>Key Takeaway:</strong> ${escapeHtml(q.keyTakeaway)}</div>` : ''}
          </div>
        </div>`).join('')}
    </div>`;
}

async function loadNextQuestion() {
  if (questionCount >= MAX_QUESTIONS) {
    showSessionComplete();
    return;
  }

  // Show loading
  document.getElementById('question-area').innerHTML = `
    <div class="ai-analyzing">
      <div class="brain-icon">🧠</div>
      <h3 style="margin:12px 0 6px; color:var(--primary-700);">Preparing your question...</h3>
      <p style="color:var(--gray-500); margin:0 0 16px;">Analyzing your learning gaps to find the best question</p>
      <div class="loading-dots"><span></span><span></span><span></span></div>
    </div>`;
  document.getElementById('explanation-area').innerHTML = '';

  // Get next concept & difficulty from adaptive engine
  const targetConcept = adaptiveSession.getCurrentConcept();
  const difficulty = adaptiveSession.getCurrentDifficulty(targetConcept);

  // Show adaptive indicator
  updateAdaptiveIndicator(targetConcept, difficulty);

  // Check for gap / improvement alerts
  const gapAlert = adaptiveSession.getGapAlert();
  const improvementAlert = adaptiveSession.getImprovementAlert();
  updateAlerts(gapAlert, improvementAlert);

  // Fetch question
  const excludeIds = [...adaptiveSession.questionsSeen];
  try {
    currentQuestion = await API.getNextQuestion(
      session.id,
      targetConcept?.concept || 'Array Basics',
      difficulty,
      excludeIds
    );
  } catch {
    currentQuestion = getQuestionsForConcept(targetConcept?.concept || 'Array Basics', difficulty, excludeIds);
  }

  selectedAnswer = null;
  questionCount++;
  renderQuestion(currentQuestion);
  startTimer();
  updateSessionStats();
  updateProgress();
}

function renderQuestion(q) {
  const diffInfo = DIFFICULTY_LEVELS[q.difficulty] || DIFFICULTY_LEVELS.easy;
  const levelInfo = getMasteryLevel(
    adaptiveSession.conceptProgress.find(c => c.concept === q.concept)?.mastery_score || 50
  );

  document.getElementById('question-area').innerHTML = `
    <div class="question-card animate-scale-in">
      <div class="question-card-header">
        <div class="question-info">
          <div class="question-number">Question ${questionCount} of ${MAX_QUESTIONS}</div>
          <div class="question-concept">${escapeHtml(q.concept || q.topic)}</div>
        </div>
        <div class="question-badges">
          ${renderDifficultyBadge(q.difficulty)}
          <span class="badge ${levelInfo.badgeClass}">${levelInfo.label}</span>
        </div>
      </div>
      <div class="question-body">
        <p class="question-text">${escapeHtml(q.question)}</p>
        <div class="options-grid" id="options-grid" role="radiogroup" aria-label="Answer options">
          ${['A','B','C','D'].map((letter, i) => `
            <button class="option-btn" data-answer="${letter}" role="radio" aria-checked="false"
              onclick="selectOption('${letter}')" id="option-${letter}"
              aria-label="Option ${letter}: ${escapeHtml(q.options[i] || '')}">
              <span class="option-letter">${letter}</span>
              <span class="option-text">${escapeHtml(q.options[i] || '')}</span>
            </button>`).join('')}
        </div>
      </div>
      <div class="quiz-submit-area">
        <button class="btn btn-ghost" onclick="skipQuestion()" id="skip-btn">Skip</button>
        <button class="btn btn-primary" id="submit-btn" onclick="submitAnswer()" disabled>
          Submit Answer →
        </button>
      </div>
    </div>`;
}

function selectOption(letter) {
  if (document.getElementById('submit-btn')?.disabled === false && selectedAnswer !== null) return;

  selectedAnswer = letter;
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.answer === letter);
    btn.setAttribute('aria-checked', btn.dataset.answer === letter);
  });

  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) submitBtn.disabled = false;
}

async function submitAnswer() {
  if (!selectedAnswer || !currentQuestion) return;

  stopTimer();
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const timeTaken = timeElapsed;

  // Disable all options and submit button
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.answer === currentQuestion.correctAnswer) btn.classList.add('correct');
    else if (btn.dataset.answer === selectedAnswer && !isCorrect) btn.classList.add('incorrect');
  });
  document.getElementById('submit-btn').disabled = true;
  document.getElementById('skip-btn').style.display = 'none';

  // Record answer in adaptive engine
  adaptiveSession.recordAnswer(
    currentQuestion.concept,
    currentQuestion.topic,
    isCorrect,
    currentQuestion.difficulty,
    currentQuestion.id
  );

  // Submit to API
  await API.submitAttempt(
    session.id,
    currentQuestion.id,
    selectedAnswer,
    isCorrect,
    timeTaken,
    currentQuestion.concept,
    currentQuestion.topic
  );

  // Show explanation
  renderExplanation(currentQuestion, selectedAnswer, isCorrect);
  updateSessionStats();
}

function renderExplanation(q, selected, isCorrect) {
  const selectedText = q.options[['A','B','C','D'].indexOf(selected)] || selected;
  const correctText  = q.options[['A','B','C','D'].indexOf(q.correctAnswer)] || q.correctAnswer;

  const headerClass = isCorrect ? 'correct-header' : 'incorrect-header';
  const iconClass   = isCorrect ? 'correct-icon'   : 'incorrect-icon';
  const infoClass   = isCorrect ? 'correct-info'   : 'incorrect-info';
  const icon        = isCorrect ? '✓' : '✗';
  const title       = isCorrect ? 'Correct! Well done.' : 'Not quite — let\'s learn from this.';
  const subtitle    = isCorrect
    ? `You selected Option ${selected} — that's right!`
    : `You selected Option ${selected}, but the correct answer is Option ${q.correctAnswer}.`;

  document.getElementById('explanation-area').innerHTML = `
    <div class="explanation-panel animate-fade-up">
      <div class="explanation-header ${headerClass}">
        <div class="result-icon ${iconClass}">${icon}</div>
        <div class="result-info ${infoClass}">
          <h3>${title}</h3>
          <p>${escapeHtml(subtitle)}</p>
        </div>
      </div>
      <div class="explanation-body">
        ${!isCorrect ? `
          <div class="explanation-section">
            <h4>Your answer vs correct answer</h4>
            <div class="answer-comparison">
              <div class="answer-box your-answer">
                <div class="answer-box-label">Your Answer (${selected})</div>
                <div class="answer-box-value">${escapeHtml(selectedText)}</div>
              </div>
              <div class="answer-box correct-answer">
                <div class="answer-box-label">Correct Answer (${q.correctAnswer})</div>
                <div class="answer-box-value">${escapeHtml(correctText)}</div>
              </div>
            </div>
          </div>` : ''}
        <div class="explanation-section">
          <h4>Explanation</h4>
          <div class="explanation-text">${escapeHtml(q.explanation)}</div>
        </div>
        <div class="explanation-section">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <span class="concept-tag">📚 ${escapeHtml(q.concept)}</span>
              ${renderDifficultyBadge(q.difficulty)}
            </div>
            <button class="btn btn-primary" onclick="loadNextQuestion()" id="next-question-btn">
              ${questionCount >= MAX_QUESTIONS ? 'View Results →' : 'Next Question →'}
            </button>
          </div>
        </div>
      </div>
    </div>`;

  // Scroll to explanation
  document.getElementById('explanation-area').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function skipQuestion() {
  stopTimer();
  adaptiveSession.recordAnswer(
    currentQuestion?.concept || 'Unknown',
    currentQuestion?.topic || 'Unknown',
    false,
    currentQuestion?.difficulty || 'easy',
    currentQuestion?.id || 'skip-' + Date.now()
  );
  questionCount++;
  loadNextQuestion();
}

function startTimer() {
  timeElapsed = 0;
  const timerEl = document.getElementById('quiz-timer');
  if (!timerEl) return;

  if (questionTimer) clearInterval(questionTimer);
  questionTimer = setInterval(() => {
    timeElapsed++;
    const mins = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
    const secs = (timeElapsed % 60).toString().padStart(2, '0');
    timerEl.textContent = `⏱ ${mins}:${secs}`;
    if (timeElapsed > 60) timerEl.className = 'quiz-timer warning';
    if (timeElapsed > 90) timerEl.className = 'quiz-timer danger';
  }, 1000);
}

function stopTimer() {
  if (questionTimer) { clearInterval(questionTimer); questionTimer = null; }
}

function updateSessionStats() {
  const stats = adaptiveSession.getStats();
  const correctEl   = document.getElementById('session-correct');
  const incorrectEl = document.getElementById('session-incorrect');
  const accuracyEl  = document.getElementById('session-accuracy');

  if (correctEl)   correctEl.textContent   = stats.correct;
  if (incorrectEl) incorrectEl.textContent = stats.incorrect;
  if (accuracyEl)  accuracyEl.textContent  = stats.accuracy + '%';
}

function updateProgress() {
  const fill = document.getElementById('question-progress-fill');
  const text = document.getElementById('question-progress-text');
  if (fill) fill.style.width = `${(questionCount / MAX_QUESTIONS) * 100}%`;
  if (text) text.textContent = `${questionCount}/${MAX_QUESTIONS}`;
}

function updateAdaptiveIndicator(concept, difficulty) {
  const el = document.getElementById('adaptive-indicator');
  if (!el || !concept) return;
  el.innerHTML = `
    <span class="adaptive-icon">🎯</span>
    <span class="adaptive-text">
      Focusing on <strong>${escapeHtml(concept.concept)}</strong> · 
      Difficulty: <strong>${DIFFICULTY_LEVELS[difficulty]?.label || 'Easy'}</strong>
      ${concept.mastery_score < 50 ? ' · Working on your weakest area' : ''}
    </span>`;
}

function updateAlerts(gapAlert, improvementAlert) {
  const alertsEl = document.getElementById('session-alerts');
  if (!alertsEl) return;

  if (gapAlert.show) {
    alertsEl.innerHTML = `
      <div class="gap-detected-alert">
        <div class="gap-detected-icon">⚠️</div>
        <div class="gap-detected-text">
          <h4>Learning gap detected</h4>
          <p>${escapeHtml(gapAlert.message)}</p>
        </div>
      </div>`;
  } else if (improvementAlert.show) {
    alertsEl.innerHTML = `
      <div class="improvement-alert" style="margin-bottom:16px;">
        <div class="improvement-icon">🎉</div>
        <div class="improvement-text">
          <h4>${escapeHtml(improvementAlert.message)}</h4>
        </div>
      </div>`;
  } else {
    alertsEl.innerHTML = '';
  }
}

function showSessionComplete() {
  stopTimer();
  const stats = adaptiveSession.getStats();
  const updates = adaptiveSession.getMasteryUpdates();

  document.getElementById('quiz-main').innerHTML = `
    <div class="session-complete card" style="padding:0; overflow:hidden;">
      <div class="card-body" style="padding:48px;">
        <div class="complete-icon">${stats.accuracy >= 80 ? '🏆' : stats.accuracy >= 60 ? '⭐' : '💪'}</div>
        <h2 class="complete-title">${stats.accuracy >= 80 ? 'Excellent Session!' : stats.accuracy >= 60 ? 'Good Work!' : 'Keep Practicing!'}</h2>
        <p class="complete-subtitle">${stats.accuracy >= 80 ? 'Your mastery is growing fast.' : 'Every question makes you better.'}</p>

        <div class="complete-stats">
          <div>
            <div class="complete-stat-val green">${stats.correct}</div>
            <div class="complete-stat-label">Correct</div>
          </div>
          <div>
            <div class="complete-stat-val" style="color:var(--danger-600)">${stats.incorrect}</div>
            <div class="complete-stat-label">Incorrect</div>
          </div>
          <div>
            <div class="complete-stat-val blue">${stats.accuracy}%</div>
            <div class="complete-stat-label">Accuracy</div>
          </div>
        </div>

        ${updates.length > 0 ? `
          <div class="mastery-update-list">
            <div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:var(--gray-500); margin-bottom:8px;">Mastery Updated</div>
            ${updates.map(u => `
              <div class="mastery-update-item">
                <span class="mastery-update-name">${escapeHtml(u.concept)}</span>
                <span class="mastery-update-change ${u.change > 0 ? 'up' : u.change < 0 ? 'down' : 'same'}">
                  ${u.change > 0 ? '+' : ''}${u.change}%
                </span>
                <span class="text-sm text-muted">${u.score}% mastery</span>
              </div>`).join('')}
          </div>` : ''}

        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn-primary btn-lg" onclick="restartSession()" id="practice-again-btn">🔄 Practice Again</button>
          <a href="dashboard.html${isDemoMode() ? '?demo=true' : ''}" class="btn btn-secondary btn-lg" id="go-dashboard-btn">📊 View Dashboard</a>
          <a href="gaps.html${isDemoMode() ? '?demo=true' : ''}" class="btn btn-outline btn-lg" id="view-gaps-btn">🔍 View Gaps</a>
        </div>
      </div>
    </div>`;
}

function restartSession() {
  questionCount = 0;
  selectedAnswer = null;
  currentQuestion = null;
  const data = getDemoData();
  adaptiveSession = new AdaptiveSession(session.id, data.conceptProgress);

  document.getElementById('quiz-main').innerHTML = `
    <div id="session-alerts"></div>
    <div id="adaptive-indicator" class="adaptive-indicator">
      <span class="adaptive-icon">🎯</span>
      <span class="adaptive-text">Finding your best practice area...</span>
    </div>
    <div id="question-area"></div>
    <div id="explanation-area"></div>`;

  loadNextQuestion();
}
