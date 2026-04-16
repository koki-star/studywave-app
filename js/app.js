// topic colors
const TOPIC_COLORS = {
  'JavaScript': '#F59E0B',
  'React':      '#38BDF8',
  'SQL':        '#6366F1',
  'Python':     '#3B82F6',
  'Node.js':    '#22C55E',
};

function getSessions() {
  return JSON.parse(localStorage.getItem('sessions') || '[]');
}

function saveSessions(sessions) {
  localStorage.setItem('sessions', JSON.stringify(sessions));
}

function addSession(session) {
  const sessions = getSessions();
  session.id = Date.now().toString();
  sessions.unshift(session); // newest first
  saveSessions(sessions);
}

function deleteSession(id) {
  const sessions = getSessions().filter(s => s.id !== id);
  saveSessions(sessions);
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

function formatHours(h) {
  const n = parseFloat(h);
  return Number.isInteger(n) ? `${n}h` : `${n}h`;
}

function isThisMonth(dateStr) {
  const now = new Date();
  const [year, month] = dateStr.split('-').map(Number);
  return year === now.getFullYear() && month === now.getMonth() + 1;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning, Kokob';
  if (h < 17) return 'Good afternoon, Kokob';
  return 'Good evening, Kokob';
}

function topicColor(topic) {
  return TOPIC_COLORS[topic] || '#1D9E75';
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// --- Stats ---

function computeStats(sessions) {
  const totalSessions  = sessions.length;
  const totalHours     = sessions.reduce((sum, s) => sum + parseFloat(s.duration), 0);
  const sessionsMonth  = sessions.filter(s => isThisMonth(s.date)).length;

  const counts = {};
  sessions.forEach(s => { counts[s.topic] = (counts[s.topic] || 0) + 1; });
  const topTopic      = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || null;
  const topCount      = topTopic ? counts[topTopic] : 0;

  const uniqueTopics  = Object.keys(counts).length;
  const avgSession    = totalSessions > 0 ? (totalHours / totalSessions) : 0;

  const hoursByTopic = {};
  sessions.forEach(s => {
    hoursByTopic[s.topic] = (hoursByTopic[s.topic] || 0) + parseFloat(s.duration);
  });

  return { totalSessions, totalHours, sessionsMonth, topTopic, topCount,
           uniqueTopics, avgSession, hoursByTopic };
}

// --- Render: Dashboard ---

function renderDashboard() {
  const sessions = getSessions();
  const stats    = computeStats(sessions);

  document.getElementById('greeting').textContent = getGreeting();

  document.getElementById('dash-sessions').textContent = stats.sessionsMonth;
  document.getElementById('dash-hours').textContent    = formatHours(
    Math.round(stats.totalHours * 10) / 10
  );
  document.getElementById('dash-top-topic').textContent = stats.topTopic || '—';
  document.getElementById('dash-top-count').textContent  =
    stats.topTopic ? `${stats.topCount} sessions` : '0 sessions';

  const listEl = document.getElementById('dash-list');
  const recent = sessions.slice(0, 3);

  if (recent.length === 0) {
    listEl.innerHTML = '<p class="empty-state">No sessions yet. Add your first one!</p>';
    return;
  }

  listEl.innerHTML = recent.map(s => {
    const meta = s.notes
      ? `${formatDate(s.date)} · ${escapeHtml(s.notes)}`
      : formatDate(s.date);
    return `
      <div class="session-card">
        <span class="topic-dot" style="background:${topicColor(s.topic)}"></span>
        <div class="session-info">
          <p class="session-topic">${s.topic}</p>
          <p class="session-meta">${meta}</p>
        </div>
        <span class="session-duration">${formatHours(s.duration)}</span>
        <button class="btn-delete" data-id="${s.id}">Delete</button>
      </div>`;
  }).join('');
}

// --- Render: All Sessions ---

function renderAllSessions(filterTopic) {
  const allSessions = getSessions();
  const stats       = computeStats(allSessions);

  const totalH = Math.round(stats.totalHours * 10) / 10;
  document.getElementById('all-subtitle').textContent =
    `${stats.totalSessions} sessions, ${totalH} hours total`;

  const sessions = filterTopic === 'All'
    ? allSessions
    : allSessions.filter(s => s.topic === filterTopic);

  const listEl = document.getElementById('all-list');

  if (sessions.length === 0) {
    listEl.innerHTML = '<p class="empty-state">No sessions found.</p>';
    return;
  }

  listEl.innerHTML = sessions.map(s => `
    <div class="session-card">
      <span class="topic-dot" style="background:${topicColor(s.topic)}"></span>
      <div class="session-info">
        <p class="session-topic">${s.topic}</p>
        <p class="session-meta">${formatDate(s.date)}</p>
        ${s.notes ? `<span class="session-notes-chip">${escapeHtml(s.notes)}</span>` : ''}
      </div>
      <span class="session-duration">${formatHours(s.duration)}</span>
      <button class="btn-delete" data-id="${s.id}">Delete</button>
    </div>`
  ).join('');
}

// --- Render: Stats ---

function renderStats() {
  const sessions = getSessions();
  const stats    = computeStats(sessions);

  document.getElementById('stats-hours').textContent    = Math.round(stats.totalHours * 10) / 10;
  document.getElementById('stats-sessions').textContent = stats.totalSessions;
  document.getElementById('stats-topics').textContent   = stats.uniqueTopics;
  document.getElementById('stats-avg').textContent      =
    stats.avgSession > 0 ? formatHours(Math.round(stats.avgSession * 10) / 10) : '0h';

  const chartEl = document.getElementById('chart-body');
  const byTopic = stats.hoursByTopic;
  const entries = Object.entries(byTopic).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    chartEl.innerHTML = '<p class="empty-state">No data yet.</p>';
    return;
  }

  const maxH = Math.max(...entries.map(e => e[1]));
  chartEl.innerHTML = entries.map(([topic, hours]) => {
    const pct = Math.round((hours / maxH) * 100);
    return `
      <div class="chart-row">
        <span class="chart-label">${topic}</span>
        <div class="chart-track">
          <div class="chart-bar"
               style="width:${pct}%; background:${topicColor(topic)}"></div>
        </div>
        <span class="chart-hours">${hours}h</span>
      </div>`;
  }).join('');
}

// --- Navigation ---

let currentView    = 'dashboard';
let currentFilter  = 'All';

function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');

  document.querySelectorAll('.nav-link[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });

  currentView = viewName;

  if (viewName === 'dashboard')    renderDashboard();
  if (viewName === 'all-sessions') renderAllSessions(currentFilter);
  if (viewName === 'stats')        renderStats();
}

// --- Modal ---

function openModal() {
  document.getElementById('overlay').classList.add('open');
  // default the date input to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('f-date').value = today;
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('session-form').reset();
}

// --- Events ---

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('nav-brand').addEventListener('click', () => showView('dashboard'));

  document.querySelectorAll('.nav-link[data-view]').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  document.getElementById('nav-add').addEventListener('click', openModal);
  document.getElementById('btn-add-open').addEventListener('click', openModal);
  document.getElementById('btn-cancel').addEventListener('click', closeModal);

  // click outside the modal to close it
  document.getElementById('overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('overlay')) closeModal();
  });

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.topic;
      renderAllSessions(currentFilter);
    });
  });

  document.getElementById('session-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const topic    = document.getElementById('f-topic').value;
    const date     = document.getElementById('f-date').value;
    const duration = document.getElementById('f-duration').value;
    const notes    = document.getElementById('f-notes').value.trim();

    if (!topic || !date || !duration) return;

    addSession({ topic, date, duration: parseFloat(duration), notes });
    closeModal();

    if (currentView === 'dashboard')    renderDashboard();
    if (currentView === 'all-sessions') renderAllSessions(currentFilter);
    if (currentView === 'stats')        renderStats();
  });

  // event delegation for delete buttons — works across all session lists
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-delete')) return;
    const id = e.target.dataset.id;
    deleteSession(id);
    if (currentView === 'dashboard')    renderDashboard();
    if (currentView === 'all-sessions') renderAllSessions(currentFilter);
    if (currentView === 'stats')        renderStats();
  });

  renderDashboard();
});
