// Popup Script - X Unfollow Tool (Modern UI)

document.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const runningBtns = document.getElementById('runningBtns');
  const whitelist = document.getElementById('whitelist');
  const statusBadge = document.getElementById('statusBadge');
  const statusIcon = document.getElementById('statusIcon');
  const statusText = document.getElementById('statusText');
  const unfollowedCount = document.getElementById('unfollowedCount');
  const skippedCount = document.getElementById('skippedCount');
  const scannedCount = document.getElementById('scannedCount');
  const logArea = document.getElementById('logArea');
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const speedSelect = document.getElementById('speedSelect');
  const limitInput = document.getElementById('limitInput');
  const whitelistValidation = document.getElementById('whitelistValidation');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');

  // Menu Elements
  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuPanel = document.getElementById('menuPanel');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const langSelect = document.getElementById('langSelect');
  const themeSelect = document.getElementById('themeSelect');

  // View Elements
  const mainView = document.getElementById('mainView');
  const whitelistView = document.getElementById('whitelistView');
  const logsView = document.getElementById('logsView');
  const historyView = document.getElementById('historyView');
  const exportImportView = document.getElementById('exportImportView');
  const backFromWhitelist = document.getElementById('backFromWhitelist');
  const backFromLogs = document.getElementById('backFromLogs');
  const backFromHistory = document.getElementById('backFromHistory');
  const backFromExportImport = document.getElementById('backFromExportImport');
  const clearLogs = document.getElementById('clearLogs');
  const clearHistory = document.getElementById('clearHistory');

  // Export/Import Elements
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const exportImportArea = document.getElementById('exportImportArea');
  const exportImportStatus = document.getElementById('exportImportStatus');

  // History
  const historyArea = document.getElementById('historyArea');

  // State
  let currentlyPaused = false;
  let lastPageValid = false;

  // Username validation regex
  const USERNAME_REGEX = /^[a-zA-Z0-9_]{1,15}$/;

  // Apply translations to UI
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });
  }

  // Load saved settings
  const saved = await chrome.storage.local.get(['whitelist', 'mode', 'stats', 'lang', 'logs', 'speed', 'limit', 'history', 'theme']);
  if (saved.whitelist) whitelist.value = saved.whitelist;
  if (saved.mode) {
    const radio = document.querySelector(`input[name="mode"]`)?.closest('.mode-cards')
      ?.querySelector(`input[value="${CSS.escape(saved.mode)}"]`);
    if (radio) radio.checked = true;
  }
  if (saved.stats) {
    unfollowedCount.textContent = saved.stats.unfollowed || 0;
    skippedCount.textContent = saved.stats.skipped || 0;
    scannedCount.textContent = saved.stats.scanned || 0;
  }
  if (saved.lang) {
    langSelect.value = saved.lang;
    if (saved.lang !== 'auto') {
      window.i18n.forcedLang = saved.lang;
    }
  }
  if (saved.logs) {
    saved.logs.forEach(log => addLogItem(log.message, log.type, false));
  }
  if (saved.speed) {
    speedSelect.value = saved.speed;
  }
  if (saved.limit) {
    limitInput.value = saved.limit;
  }
  if (saved.history) {
    renderHistory(saved.history);
  }
  if (saved.theme) {
    themeSelect.value = saved.theme;
    document.documentElement.setAttribute('data-theme', saved.theme);
  }

  applyTranslations();
  updateThemeToggleIcon(saved.theme || 'dark');

  // Menu handlers
  function openMenu() {
    menuOverlay.classList.remove('hidden');
    menuPanel.classList.remove('hidden');
  }

  function closeMenu() {
    menuOverlay.classList.add('hidden');
    menuPanel.classList.add('hidden');
  }

  menuBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // View navigation
  const viewMap = {
    whitelist: whitelistView,
    logs: logsView,
    history: historyView,
    exportImport: exportImportView
  };

  document.querySelectorAll('.menu-item[data-view]').forEach(item => {
    item.addEventListener('click', () => {
      const view = item.getAttribute('data-view');
      closeMenu();
      const viewEl = viewMap[view];
      if (viewEl) viewEl.classList.remove('hidden');
    });
  });

  backFromWhitelist.addEventListener('click', () => whitelistView.classList.add('hidden'));
  backFromLogs.addEventListener('click', () => logsView.classList.add('hidden'));
  backFromHistory.addEventListener('click', () => historyView.classList.add('hidden'));
  backFromExportImport.addEventListener('click', () => exportImportView.classList.add('hidden'));

  clearLogs.addEventListener('click', () => {
    logArea.innerHTML = '';
    chrome.storage.local.set({ logs: [] });
  });

  clearHistory.addEventListener('click', () => {
    historyArea.innerHTML = '';
    chrome.storage.local.set({ history: [] });
    renderHistory([]);
  });

  // Language change
  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    chrome.storage.local.set({ lang });
    if (lang === 'auto') {
      delete window.i18n.forcedLang;
    } else {
      window.i18n.forcedLang = lang;
    }
    applyTranslations();
  });

  // Theme change (menu select)
  themeSelect.addEventListener('change', () => {
    const theme = themeSelect.value;
    applyTheme(theme);
  });

  // Theme toggle button (header)
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    themeSelect.value = next;
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    chrome.storage.local.set({ theme });
    updateThemeToggleIcon(theme);
  }

  function updateThemeToggleIcon(theme) {
    if (theme === 'light') {
      themeToggleIcon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
    } else {
      themeToggleIcon.innerHTML = '<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>';
    }
  }

  // Save whitelist on change with validation
  whitelist.addEventListener('input', () => {
    chrome.storage.local.set({ whitelist: whitelist.value });
    validateWhitelist();
  });

  function validateWhitelist() {
    const lines = whitelist.value.split('\n').map(u => u.trim().replace('@', '')).filter(u => u.length > 0);
    if (lines.length === 0) {
      whitelistValidation.textContent = '';
      whitelistValidation.className = 'hint';
      return;
    }
    let valid = 0;
    let invalid = 0;
    lines.forEach(u => {
      if (USERNAME_REGEX.test(u)) {
        valid++;
      } else {
        invalid++;
      }
    });
    if (invalid > 0) {
      whitelistValidation.textContent = t('whitelistValidCount', { valid, invalid });
      whitelistValidation.className = 'hint hint-error';
    } else {
      whitelistValidation.textContent = t('whitelistValidCount', { valid, invalid: 0 });
      whitelistValidation.className = 'hint hint-success';
    }
  }

  // Save mode on change
  modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const selected = getSelectedMode();
      chrome.storage.local.set({ mode: selected });
    });
  });

  // Save speed on change
  speedSelect.addEventListener('change', async () => {
    const speed = parseFloat(speedSelect.value);
    chrome.storage.local.set({ speed: speedSelect.value });
    // Update running content script speed
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.tabs.sendMessage(tab.id, { action: 'updateSpeed', speed });
    } catch (e) { }
  });

  // Save limit on change
  limitInput.addEventListener('change', () => {
    const limit = parseInt(limitInput.value) || 0;
    limitInput.value = limit;
    chrome.storage.local.set({ limit });
  });

  // Check if on correct page
  async function checkPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = tab.url || '';
      const isXDomain = url.includes('x.com') || url.includes('twitter.com');
      const isFollowingPage = isXDomain && url.includes('/following');

      if (!isXDomain) {
        lastPageValid = false;
        showStatus('warning', '\u26A0\uFE0F', t('statusGoToFollowing'));
        updateStartButton(t('btnOpenX'), false);
        return { valid: false, needsRedirect: true, hasUsername: false };
      }

      if (!isFollowingPage) {
        const username = extractUsername(url);
        if (username) {
          lastPageValid = false;
          showStatus('warning', '\u26A0\uFE0F', `${t('statusGoingToFollowing')} (@${username})`);
          return { valid: false, needsRedirect: true, hasUsername: true, username };
        } else {
          lastPageValid = false;
          showStatus('warning', '\u26A0\uFE0F', t('statusGoToProfile'));
          updateStartButton(t('btnGoToProfile'), false);
          return { valid: false, needsRedirect: true, hasUsername: false };
        }
      }

      hideStatus();
      lastPageValid = true;
      updateStartButton(t('btnStart'), false);
      return { valid: true };
    } catch (e) {
      lastPageValid = false;
      showStatus('error', '\u274C', t('statusPageError'));
      return { valid: false };
    }
  }

  function extractUsername(url) {
    try {
      const urlObj = new URL(url);
      const match = urlObj.pathname.match(/^\/([a-zA-Z0-9_]+)/);
      if (match) {
        const username = match[1];
        const reserved = ['home', 'explore', 'notifications', 'messages', 'settings', 'i', 'search', 'compose'];
        if (!reserved.includes(username.toLowerCase())) {
          return username;
        }
      }
    } catch (e) { }
    return null;
  }

  async function openFollowingPage(username) {
    const url = username ? `https://x.com/${username}/following` : 'https://x.com/home';
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.update(tab.id, { url });
    window.close();
  }

  async function checkRunningState() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'getState' });

      if (response && response.isRunning) {
        if (response.isPaused) {
          showPausedState();
        } else {
          showRunningState();
        }
        updateStats(response.stats);
      }
    } catch (e) { }
  }

  function showStatus(type, icon, text) {
    statusBadge.className = `status-badge ${type}`;
    statusBadge.classList.remove('hidden');
    statusIcon.textContent = icon;
    statusText.textContent = text;
  }

  function hideStatus() {
    statusBadge.classList.add('hidden');
  }

  function updateStartButton(text, isRunning) {
    if (isRunning) {
      startBtn.classList.add('hidden');
      runningBtns.classList.remove('hidden');
    } else {
      startBtn.classList.remove('hidden');
      runningBtns.classList.add('hidden');
      startBtn.querySelector('span').textContent = text;
    }
  }

  function showRunningState() {
    currentlyPaused = false;

    showStatus('running', '\uD83D\uDD04', t('statusRunning'));
    updateStartButton('', true);
    pauseBtn.querySelector('span').textContent = t('btnPause');
    pauseBtn.className = 'action-btn action-btn-warning';
  }

  function showPausedState() {
    currentlyPaused = true;

    showStatus('paused', '\u23F8\uFE0F', t('statusPaused'));
    updateStartButton('', true);
    pauseBtn.querySelector('span').textContent = t('btnResume');
    pauseBtn.className = 'action-btn action-btn-primary';
  }

  function addLogItem(message, type = 'info', save = true) {
    const logItem = document.createElement('div');
    logItem.className = `log-item log-${type}`;
    const timeFormat = (window.i18n.forcedLang || window.i18n.getLanguage()) === 'tr' ? 'tr-TR' : 'en-US';
    logItem.textContent = `[${new Date().toLocaleTimeString(timeFormat)}] ${message}`;
    logArea.insertBefore(logItem, logArea.firstChild);

    while (logArea.children.length > 100) {
      logArea.removeChild(logArea.lastChild);
    }

    if (save) {
      chrome.storage.local.get(['logs'], (data) => {
        const logs = data.logs || [];
        logs.unshift({ message, type, time: Date.now() });
        if (logs.length > 100) logs.pop();
        chrome.storage.local.set({ logs });
      });
    }
  }

  function addLog(message, type = 'info') {
    addLogItem(message, type, true);
  }

  function updateStats(stats) {
    if (stats) {
      unfollowedCount.textContent = stats.unfollowed || 0;
      skippedCount.textContent = stats.skipped || 0;
      scannedCount.textContent = stats.scanned || 0;
      chrome.storage.local.set({ stats });
    }
  }

  function getSelectedMode() {
    const selected = document.querySelector('input[name="mode"]:checked');
    return selected ? selected.value : 'non-followers';
  }


  // Badge update helper
  function updateBadge(count) {
    if (chrome.action && chrome.action.setBadgeText) {
      chrome.action.setBadgeText({ text: count > 0 ? String(count) : '' });
      chrome.action.setBadgeBackgroundColor({ color: '#1d9bf0' });
    }
  }

  // History management
  function addToHistory(username) {
    chrome.storage.local.get(['history'], (data) => {
      const history = data.history || [];
      history.unshift({ username, time: Date.now() });
      if (history.length > 500) history.pop();
      chrome.storage.local.set({ history });
      renderHistory(history);
    });
  }

  function renderHistory(history) {
    if (!historyArea) return;
    historyArea.innerHTML = '';
    if (!history || history.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'history-empty';
      empty.textContent = t('historyEmpty');
      historyArea.appendChild(empty);
      return;
    }
    const timeFormat = (window.i18n.forcedLang || window.i18n.getLanguage()) === 'tr' ? 'tr-TR' : 'en-US';
    history.forEach(item => {
      const el = document.createElement('div');
      el.className = 'history-item';
      const userSpan = document.createElement('span');
      userSpan.className = 'history-user';
      userSpan.textContent = `@${item.username}`;
      const timeSpan = document.createElement('span');
      timeSpan.className = 'history-time';
      timeSpan.textContent = new Date(item.time).toLocaleString(timeFormat);
      el.appendChild(userSpan);
      el.appendChild(timeSpan);
      historyArea.appendChild(el);
    });
  }

  // Export/Import
  exportBtn.addEventListener('click', async () => {
    const data = await chrome.storage.local.get(['whitelist', 'mode', 'speed', 'limit', 'history', 'logs']);
    exportImportArea.value = JSON.stringify(data, null, 2);
    try {
      await navigator.clipboard.writeText(exportImportArea.value);
      exportImportStatus.textContent = t('exportSuccess');
      exportImportStatus.className = 'hint hint-success';
    } catch (e) {
      exportImportStatus.textContent = '';
    }
  });

  importBtn.addEventListener('click', () => {
    try {
      const data = JSON.parse(exportImportArea.value);
      const allowedKeys = ['whitelist', 'mode', 'speed', 'limit', 'history', 'logs'];
      const filtered = {};
      allowedKeys.forEach(key => {
        if (data[key] !== undefined) filtered[key] = data[key];
      });
      chrome.storage.local.set(filtered, () => {
        exportImportStatus.textContent = t('importSuccess');
        exportImportStatus.className = 'hint hint-success';
        // Reload UI
        if (filtered.whitelist) whitelist.value = filtered.whitelist;
        if (filtered.mode) {
          const radio = document.querySelector(`input[name="mode"]`)?.closest('.mode-cards')
            ?.querySelector(`input[value="${CSS.escape(filtered.mode)}"]`);
          if (radio) radio.checked = true;
        }
        if (filtered.speed) speedSelect.value = filtered.speed;
        if (filtered.limit) limitInput.value = filtered.limit;
        if (filtered.history) renderHistory(filtered.history);
        if (filtered.logs) {
          logArea.innerHTML = '';
          filtered.logs.forEach(log => addLogItem(log.message, log.type, false));
        }
      });
    } catch (e) {
      exportImportStatus.textContent = t('importError');
      exportImportStatus.className = 'hint hint-error';
    }
  });

  // Start button
  startBtn.addEventListener('click', async () => {
    const pageStatus = await checkPage();

    if (pageStatus.needsRedirect) {
      if (pageStatus.hasUsername) {
        addLog(t('logGoingToFollowing', { username: pageStatus.username }), 'info');
        await openFollowingPage(pageStatus.username);
      } else {
        addLog(t('logGoingToHome'), 'info');
        await openFollowingPage(null);
      }
      return;
    }

    if (!pageStatus.valid) return;

    const mode = getSelectedMode();
    const whitelistUsers = whitelist.value
      .split('\n')
      .map(u => u.trim().toLowerCase().replace('@', ''))
      .filter(u => u.length > 0 && USERNAME_REGEX.test(u));

    const speed = parseFloat(speedSelect.value) || 1;
    const limit = parseInt(limitInput.value) || 0;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      await chrome.tabs.sendMessage(tab.id, {
        action: 'start',
        mode: mode,
        whitelist: whitelistUsers,
        speed: speed,
        limit: limit
      });

      showRunningState();
      addLog(t('logStarted'), 'success');
      addLog(mode === 'non-followers' ? t('logModeNonFollowers') : t('logModeAll'), 'info');
      addLog(t('logWhitelist', { count: whitelistUsers.length }), 'info');

    } catch (e) {
      showStatus('error', '\u274C', t('statusStartError'));
      addLog(t('logError', { message: e.message }), 'error');
    }
  });

  // Pause/Resume button
  pauseBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (currentlyPaused) {
        await chrome.tabs.sendMessage(tab.id, { action: 'resume' });
        showRunningState();
      } else {
        await chrome.tabs.sendMessage(tab.id, { action: 'pause' });
        showPausedState();
      }
    } catch (e) {
      addLog(t('logError', { message: e.message }), 'error');
    }
  });

  // Stop button
  stopBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.tabs.sendMessage(tab.id, { action: 'stop' });

      showStatus('warning', '\u23F9\uFE0F', t('statusStopped'));
      updateStartButton(t('btnStart'), false);
      addLog(t('logStopped'), 'warning');
      currentlyPaused = false;
      updateBadge(0);

    } catch (e) {
      addLog(t('logStopError', { message: e.message }), 'error');
    }
  });

  // Listen for updates from content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'log') {
      addLog(message.text, message.logType || 'info');
    }
    if (message.type === 'unfollowed') {
      addToHistory(message.username);
    }
    if (message.type === 'stats') {
      updateStats(message.stats);
    }
    if (message.type === 'stopped') {
      showStatus('success', '\u2705', t('statusCompleted'));
      updateStartButton(t('btnStart'), false);
      addLog(t('logCompleted'), 'success');
      currentlyPaused = false;
      updateBadge(0);
    }
    if (message.type === 'error') {
      showStatus('error', '\u274C', message.text);
      addLog(message.text, 'error');
      updateStartButton(t('btnStart'), false);
      currentlyPaused = false;
    }
    if (message.type === 'badgeUpdate') {
      updateBadge(message.count);
    }
  });

  // Initial checks
  validateWhitelist();
  await checkPage();
  await checkRunningState();
});
