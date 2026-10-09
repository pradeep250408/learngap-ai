/* ============================================================
   utils.js — Shared Utilities
   ============================================================ */

// ── Toast Notifications ──
const ToastManager = (() => {
  let container;
  function ensureContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function show(message, type = 'info', duration = 3500) {
    const c = ensureContainer();
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    c.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 300);
    }, duration);
    return toast;
  }

  return { success: (m, d) => show(m, 'success', d), error: (m, d) => show(m, 'error', d), warning: (m, d) => show(m, 'warning', d), info: (m, d) => show(m, 'info', d) };
})();

// ── Loading States ──
function showLoading(containerId, message = 'Loading...', type = 'spinner') {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (type === 'ai') {
    el.innerHTML = `
      <div class="ai-analyzing">
        <div class="brain-icon">🧠</div>
        <h3 style="margin: 12px 0 6px; color: var(--primary-700);">AI is Analyzing</h3>
        <p style="color: var(--gray-500); margin: 0 0 16px;">${message}</p>
        <div class="loading-dots"><span></span><span></span><span></span></div>
      </div>`;
  } else {
    el.innerHTML = `
      <div class="loading-overlay">
        <div class="loading-spinner"></div>
        <p class="loading-text">${message}</p>
      </div>`;
  }
}

function showSkeleton(containerId, count = 3) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({ length: count }, () => `
    <div class="card" style="padding:20px; margin-bottom:12px;">
      <div class="skeleton" style="height:16px; width:60%; margin-bottom:10px;"></div>
      <div class="skeleton" style="height:12px; width:80%; margin-bottom:6px;"></div>
      <div class="skeleton" style="height:10px; width:40%;"></div>
    </div>`).join('');
}

// ── Render Utilities ──
function renderMasteryBadge(score) {
  const level = getMasteryLevel(score);
  return `<span class="badge ${level.badgeClass}">${level.icon} ${level.label}</span>`;
}

function renderProgressBar(score, label = '') {
  const level = getMasteryLevel(score);
  return `
    <div class="progress-bar-wrap ${label ? 'mb-sm' : ''}">
      <div class="progress-bar-fill ${level.barClass}" style="width:${score}%"></div>
    </div>`;
}

function renderDifficultyBadge(difficulty) {
  const d = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.easy;
  return `<span class="badge ${d.badgeClass}">${d.label}</span>`;
}

// ── Time Utilities ──
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good night';
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Navigation ──
function navigate(page) {
  window.location.href = page;
}

function setActiveNav(page) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
}

// ── Demo Banner ──
function showDemoBanner() {
  if (!document.querySelector('.demo-banner')) {
    const banner = document.createElement('div');
    banner.className = 'demo-banner';
    banner.innerHTML = `🎮 Demo Mode — Using sample student "Alex". <a href="auth.html" style="color:#fff; text-decoration:underline; margin-left:6px;">Sign up for real tracking →</a>`;
    document.body.prepend(banner);
    // Adjust main content to account for banner
    const main = document.querySelector('.main-content');
    if (main) main.style.paddingTop = '36px';
  }
}

// ── Modal ──
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
}

// ── Sidebar Toggle (Mobile) ──
function initMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const hamburger = document.querySelector('.hamburger-btn');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('show');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
}

// ── Number Animation ──
function animateNumber(el, target, duration = 1000, suffix = '') {
  const start = parseInt(el.textContent) || 0;
  const range = target - start;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + range * ease) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── Initials from name ──
function getInitials(name) {
  return (name || 'U').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// ── Local Storage helpers ──
function lsGet(key, fallback = null) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}

// ── Debounce ──
function debounce(fn, delay) {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

// ── Sanitize HTML ──
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
