// Content Script - X Unfollow Tool
// This script runs on x.com and twitter.com pages

(function () {
    'use strict';

    // === SELECTORS (centralized for easy maintenance) ===
    const SELECTORS = {
        userCell: '[data-testid="UserCell"]',
        followIndicator: '[data-testid="userFollowIndicator"]',
        unfollowButton: '[data-testid$="-unfollow"]',
        confirmButton: '[data-testid="confirmationSheetConfirm"]',
        userLink: 'a[href^="/"]'
    };

    // Inline translations for content script
    const translations = {
        tr: {
            loaded: 'X Unfollow Tool yüklendi!',
            started: 'İşlem başlatıldı...',
            modeNonFollowers: 'Takip Etmeyenler',
            modeAll: 'Herkes',
            modeInactive: 'Pasif Hesaplar',
            modeGhost: 'Hayalet Hesaplar',
            mode: 'Mod: {mode}',
            whitelist: 'Whitelist: {count} kullanıcı',
            whitelisted: '@{username} whitelist\'te, atlanıyor',
            followsBack: '@{username} sizi takip ediyor, atlanıyor',
            unfollowed: '@{username} takipten çıkarıldı',
            fetchingProfile: '@{username} profili kontrol ediliyor...',
            inactiveSkip: '@{username} aktif, atlanıyor',
            ghostSkip: '@{username} hayalet hesap değil, atlanıyor',
            loading: 'Yeni kullanıcılar yükleniyor...',
            listEnd: 'Liste sonuna ulaşıldı',
            tabHidden: 'Sekme arka planda, bekleniyor...',
            tabActive: 'Sekme tekrar aktif',
            completed: 'İşlem tamamlandı! Çıkarılan: {unfollowed}, Atlanan: {skipped}',
            stopRequest: 'Durdurma isteği alındı...',
            paused: 'İşlem duraklatıldı',
            resumed: 'İşlem devam ediyor',
            limitReached: 'Limite ulaşıldı ({limit} kullanıcı)',
            confirmFailed: '@{username} onay butonu bulunamadı, atlanıyor',
            noUnfollowBtn: '@{username} unfollow butonu bulunamadı, atlanıyor',
            selectorError: 'DOM elementi bulunamadı: {selector}'
        },
        en: {
            loaded: 'X Unfollow Tool loaded!',
            started: 'Process started...',
            modeNonFollowers: 'Non-Followers',
            modeAll: 'Everyone',
            modeInactive: 'Inactive Accounts',
            modeGhost: 'Ghost Accounts',
            mode: 'Mode: {mode}',
            whitelist: 'Whitelist: {count} users',
            whitelisted: '@{username} is whitelisted, skipping',
            followsBack: '@{username} follows you, skipping',
            unfollowed: '@{username} unfollowed',
            fetchingProfile: 'Checking @{username} profile...',
            inactiveSkip: '@{username} is active, skipping',
            ghostSkip: '@{username} is not a ghost account, skipping',
            loading: 'Loading more users...',
            listEnd: 'Reached end of list',
            tabHidden: 'Tab in background, waiting...',
            tabActive: 'Tab active again',
            completed: 'Completed! Unfollowed: {unfollowed}, Skipped: {skipped}',
            stopRequest: 'Stop request received...',
            paused: 'Process paused',
            resumed: 'Process resumed',
            limitReached: 'Limit reached ({limit} users)',
            confirmFailed: '@{username} confirm button not found, skipping',
            noUnfollowBtn: '@{username} unfollow button not found, skipping',
            selectorError: 'DOM element not found: {selector}'
        },
        ja: {
            loaded: 'X Unfollow Tool loaded!',
            started: 'プロセスを開始しました...',
            modeNonFollowers: 'フォローバックなし',
            modeAll: '全員',
            modeInactive: '非アクティブ',
            modeGhost: 'ゴースト',
            mode: 'モード: {mode}',
            whitelist: 'ホワイトリスト: {count}ユーザー',
            whitelisted: '@{username} はホワイトリスト、スキップ',
            followsBack: '@{username} はフォローバック中、スキップ',
            unfollowed: '@{username} を解除しました',
            fetchingProfile: '@{username} のプロフィールを確認中...',
            inactiveSkip: '@{username} はアクティブ、スキップ',
            ghostSkip: '@{username} はゴーストではありません、スキップ',
            loading: 'ユーザーを読み込み中...',
            listEnd: 'リストの終端に到達',
            tabHidden: 'タブが非表示、待機中...',
            tabActive: 'タブが再びアクティブ',
            completed: '完了しました！解除: {unfollowed}、スキップ: {skipped}',
            stopRequest: '停止リクエストを受信...',
            paused: '一時停止しました',
            resumed: '再開しました',
            limitReached: '制限に達しました ({limit}ユーザー)',
            confirmFailed: '@{username} の確認ボタンが見つかりません、スキップ',
            noUnfollowBtn: '@{username} の解除ボタンが見つかりません、スキップ',
            selectorError: 'DOM要素が見つかりません: {selector}'
        },
        pt: {
            loaded: 'X Unfollow Tool carregado!',
            started: 'Processo iniciado...',
            modeNonFollowers: 'Não Seguidores',
            modeAll: 'Todos',
            modeInactive: 'Contas Inativas',
            modeGhost: 'Contas Fantasma',
            mode: 'Modo: {mode}',
            whitelist: 'Lista branca: {count} usuários',
            whitelisted: '@{username} está na lista branca, pulando',
            followsBack: '@{username} te segue, pulando',
            unfollowed: '@{username} removido',
            fetchingProfile: 'Verificando perfil de @{username}...',
            inactiveSkip: '@{username} está ativo, pulando',
            ghostSkip: '@{username} não é uma conta fantasma, pulando',
            loading: 'Carregando mais usuários...',
            listEnd: 'Fim da lista',
            tabHidden: 'Aba em segundo plano, aguardando...',
            tabActive: 'Aba ativa novamente',
            completed: 'Concluído! Removidos: {unfollowed}, Pulados: {skipped}',
            stopRequest: 'Pedido de parada recebido...',
            paused: 'Processo pausado',
            resumed: 'Processo retomado',
            limitReached: 'Limite atingido ({limit} usuários)',
            confirmFailed: '@{username} botão de confirmação não encontrado, pulando',
            noUnfollowBtn: '@{username} botão de unfollow não encontrado, pulando',
            selectorError: 'Elemento DOM não encontrado: {selector}'
        },
        es: {
            loaded: 'X Unfollow Tool cargado!',
            started: 'Proceso iniciado...',
            modeNonFollowers: 'No Seguidores',
            modeAll: 'Todos',
            modeInactive: 'Cuentas Inactivas',
            modeGhost: 'Cuentas Fantasma',
            mode: 'Modo: {mode}',
            whitelist: 'Lista blanca: {count} usuarios',
            whitelisted: '@{username} está en la lista blanca, omitiendo',
            followsBack: '@{username} te sigue, omitiendo',
            unfollowed: '@{username} eliminado',
            fetchingProfile: 'Revisando perfil de @{username}...',
            inactiveSkip: '@{username} está activo, omitiendo',
            ghostSkip: '@{username} no es cuenta fantasma, omitiendo',
            loading: 'Cargando más usuarios...',
            listEnd: 'Fin de la lista',
            tabHidden: 'Pestaña en segundo plano, esperando...',
            tabActive: 'Pestaña activa de nuevo',
            completed: 'Completado. Eliminados: {unfollowed}, Omitidos: {skipped}',
            stopRequest: 'Solicitud de detención recibida...',
            paused: 'Proceso en pausa',
            resumed: 'Proceso reanudado',
            limitReached: 'Límite alcanzado ({limit} usuarios)',
            confirmFailed: 'No se encontró el botón de confirmación de @{username}, omitiendo',
            noUnfollowBtn: 'No se encontró el botón de unfollow de @{username}, omitiendo',
            selectorError: 'Elemento DOM no encontrado: {selector}'
        }
    };

    // Detect language
    function getLanguage() {
        const lang = navigator.language || 'en';
        if (lang.startsWith('tr')) return 'tr';
        if (lang.startsWith('ja')) return 'ja';
        if (lang.startsWith('pt')) return 'pt';
        if (lang.startsWith('es')) return 'es';
        return 'en';
    }

    // Get translation
    function t(key, params = {}) {
        const lang = getLanguage();
        let text = translations[lang][key] || translations.en[key] || key;
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        return text;
    }

    // === STATE ===
    let isRunning = false;
    let shouldStop = false;
    let isPaused = false;
    let stats = {
        unfollowed: 0,
        skipped: 0,
        scanned: 0
    };
    let currentMode = 'non-followers';
    let whitelist = [];
    let unfollowLimit = 0; // 0 = unlimited
    let speedMultiplier = 1; // 0.5 = fast, 1 = normal, 2 = slow
    let inactiveThresholdDays = 90;

    // === CONSTANTS ===
    const BASE_DELAY_BETWEEN_ACTIONS = 1500;
    const BASE_DELAY_AFTER_CONFIRM = 1000;
    const BASE_SCROLL_DELAY = 2000;
    const MAX_CONFIRM_RETRIES = 3;
    const CONFIRM_RETRY_DELAY = 500;
    const STATS_SAVE_INTERVAL = 5; // save every N unfollows
    const MAX_LOOP_ITERATIONS = 10000; // absolute safety limit
    const PROFILE_FETCH_DELAY = 1200;
    const PROFILE_FETCH_TIMEOUT = 8000;

    // Computed delays based on speed
    function getDelay(base) {
        return Math.round(base * speedMultiplier);
    }

    // === UTILITIES ===
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function parseTwitterDate(dateStr) {
        if (!dateStr) return null;
        const parsed = Date.parse(dateStr);
        if (Number.isNaN(parsed)) return null;
        return new Date(parsed);
    }

    function extractJsonObject(text, startIndex) {
        if (startIndex < 0 || startIndex >= text.length || text[startIndex] !== '{') return null;
        let depth = 0;
        let inString = false;
        let escaped = false;

        for (let i = startIndex; i < text.length; i++) {
            const char = text[i];
            if (escaped) {
                escaped = false;
                continue;
            }
            if (char === '\\') {
                escaped = true;
                continue;
            }
            if (char === '"') {
                inString = !inString;
                continue;
            }
            if (inString) continue;
            if (char === '{') depth++;
            if (char === '}') {
                depth--;
                if (depth === 0) {
                    return text.slice(startIndex, i + 1);
                }
            }
        }
        return null;
    }

    function extractNextDataJson(html) {
        const marker = '<script id="__NEXT_DATA__" type="application/json">';
        const start = html.indexOf(marker);
        if (start === -1) return null;
        const jsonStart = start + marker.length;
        const end = html.indexOf('</script>', jsonStart);
        if (end === -1) return null;
        const jsonText = html.slice(jsonStart, end).trim();
        if (!jsonText) return null;
        try {
            return JSON.parse(jsonText);
        } catch (e) {
            return null;
        }
    }

    function findLegacyInObject(obj, lowerUsername, limit) {
        if (!obj || typeof obj !== 'object' || limit.count <= 0) return null;
        limit.count--;

        if (obj.legacy && typeof obj.legacy.screen_name === 'string') {
            if (obj.legacy.screen_name.toLowerCase() === lowerUsername) {
                return obj.legacy;
            }
        }

        if (Array.isArray(obj)) {
            for (const item of obj) {
                const found = findLegacyInObject(item, lowerUsername, limit);
                if (found) return found;
            }
            return null;
        }

        for (const key of Object.keys(obj)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                const found = findLegacyInObject(value, lowerUsername, limit);
                if (found) return found;
            }
        }

        return null;
    }

    function extractLegacyFromHtml(html, username) {
        if (!html || !username) return null;
        const lowerHtml = html.toLowerCase();
        const lowerUsername = username.toLowerCase();

        // Fast path: screen_name appears before legacy block.
        const screenNameToken = `"screen_name":"${lowerUsername}"`;
        let index = lowerHtml.indexOf(screenNameToken);
        if (index !== -1) {
            const legacyToken = '"legacy":{';
            const legacyIndex = lowerHtml.indexOf(legacyToken, index);
            if (legacyIndex !== -1) {
                const jsonStart = legacyIndex + legacyToken.length - 1;
                const jsonText = extractJsonObject(html, jsonStart);
                if (jsonText) {
                    try {
                        return JSON.parse(jsonText);
                    } catch (e) {
                        // fall through to slower scan
                    }
                }
            }
        }

        // Fallback: scan all legacy blocks and match screen_name inside.
        const legacyToken = '"legacy":{';
        let cursor = 0;
        let attempts = 0;
        while (attempts < 25) {
            const legacyIndex = lowerHtml.indexOf(legacyToken, cursor);
            if (legacyIndex === -1) break;
            const jsonStart = legacyIndex + legacyToken.length - 1;
            const jsonText = extractJsonObject(html, jsonStart);
            if (jsonText) {
                try {
                    const legacy = JSON.parse(jsonText);
                    if (typeof legacy?.screen_name === 'string' && legacy.screen_name.toLowerCase() === lowerUsername) {
                        return legacy;
                    }
                } catch (e) {
                    // ignore parse errors
                }
            }
            cursor = legacyIndex + legacyToken.length;
            attempts++;
        }

        // Fallback 2: __NEXT_DATA__ search
        const nextData = extractNextDataJson(html);
        if (nextData) {
            const found = findLegacyInObject(nextData, lowerUsername, { count: 6000 });
            if (found) return found;
        }

        return null;
    }

    const DEBUG_PROFILE = false;

    async function fetchUserProfile(username) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), PROFILE_FETCH_TIMEOUT);
            const url = `https://x.com/${username}`;
            const resp = await fetch(url, {
                credentials: 'include',
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!resp.ok) {
                if (DEBUG_PROFILE) {
                    log(`Profile fetch failed (${resp.status}) for @${username}`, 'warning');
                }
                return null;
            }
            const html = await resp.text();
            const legacy = extractLegacyFromHtml(html, username);
            if (!legacy) {
                if (DEBUG_PROFILE) {
                    log(`Profile parse failed for @${username}`, 'warning');
                }
                return null;
            }

            const tweetsCount = typeof legacy.statuses_count === 'number' ? legacy.statuses_count : 0;
            const defaultAvatar = !!legacy.default_profile_image;
            const followersCount = typeof legacy.followers_count === 'number' ? legacy.followers_count : null;
            const friendsCount = typeof legacy.friends_count === 'number' ? legacy.friends_count : null;
            const createdAt = legacy.created_at || null;
            const lastTweetDate = parseTwitterDate(legacy.status?.created_at);

            if (DEBUG_PROFILE) {
                log(`Profile data @${username}: tweets=${tweetsCount}, defaultAvatar=${defaultAvatar}, lastTweet=${lastTweetDate ? lastTweetDate.toISOString() : 'none'}`, 'info');
            }

            return {
                tweetsCount,
                defaultAvatar,
                followersCount,
                friendsCount,
                createdAt,
                lastTweetDate
            };
        } catch (e) {
            return null;
        }
    }

    // Debounced stat sender
    let statsSendTimer = null;
    function sendStatsDebounced() {
        if (statsSendTimer) clearTimeout(statsSendTimer);
        statsSendTimer = setTimeout(() => {
            chrome.runtime.sendMessage({
                type: 'stats',
                stats: { ...stats }
            }).catch(() => { });
        }, 300);
    }

    function log(message, type = 'info') {
        const emoji = {
            info: '\u{1F4DD}',
            success: '\u2705',
            warning: '\u26A0\uFE0F',
            error: '\u274C'
        };
        console.log(`${emoji[type] || ''} [X Unfollow] ${message}`);

        chrome.runtime.sendMessage({
            type: 'log',
            text: message,
            logType: type
        }).catch(() => { });
    }

    function sendStats() {
        sendStatsDebounced();
    }

    function sendStopped() {
        // Flush pending stats immediately
        if (statsSendTimer) {
            clearTimeout(statsSendTimer);
            statsSendTimer = null;
        }
        chrome.runtime.sendMessage({
            type: 'stats',
            stats: { ...stats }
        }).catch(() => { });
        chrome.runtime.sendMessage({
            type: 'stopped'
        }).catch(() => { });
    }

    function sendError(text) {
        chrome.runtime.sendMessage({
            type: 'error',
            text: text
        }).catch(() => { });
    }

    // Persist stats to storage periodically for crash recovery
    function persistStats() {
        chrome.storage.local.set({
            stats: { ...stats },
            _lastRunState: {
                isRunning,
                isPaused,
                mode: currentMode,
                timestamp: Date.now()
            }
        }).catch(() => { });
    }

    // Update badge count
    function updateBadge() {
        chrome.runtime.sendMessage({
            type: 'badgeUpdate',
            count: stats.unfollowed
        }).catch(() => { });
    }

    // === CORE LOGIC ===

    function isWhitelisted(username) {
        if (!username) return false;
        const cleanUsername = username.toLowerCase().replace('@', '');
        return whitelist.includes(cleanUsername);
    }

    function userFollowsBack(userCell) {
        const followIndicator = userCell.querySelector(SELECTORS.followIndicator);
        return followIndicator !== null;
    }

    function getUsername(userCell) {
        const link = userCell.querySelector(SELECTORS.userLink);
        if (!link) return null;
        const href = link.getAttribute('href');
        if (!href) return null;
        const username = href.substring(1).split('/')[0];
        // Validate username format
        if (!username || !/^[a-zA-Z0-9_]{1,15}$/.test(username)) return null;
        return username;
    }

    async function clickUnfollow(userCell, username) {
        const unfollowBtn = userCell.querySelector(SELECTORS.unfollowButton);
        if (!unfollowBtn) {
            log(t('noUnfollowBtn', { username: username || '?' }), 'warning');
            return false;
        }
        unfollowBtn.click();
        return true;
    }

    async function clickConfirm(username) {
        // Retry mechanism for confirm button
        for (let attempt = 0; attempt < MAX_CONFIRM_RETRIES; attempt++) {
            await sleep(CONFIRM_RETRY_DELAY);
            const confirmButton = document.querySelector(SELECTORS.confirmButton);
            if (confirmButton) {
                confirmButton.click();
                return true;
            }
        }
        log(t('confirmFailed', { username: username || '?' }), 'warning');
        return false;
    }

    async function processUser(userCell) {
        const username = getUsername(userCell);

        if (!username) {
            return { action: 'skip', reason: 'no-username' };
        }

        if (isWhitelisted(username)) {
            log(t('whitelisted', { username }), 'info');
            return { action: 'skip', reason: 'whitelist' };
        }

        if (currentMode === 'non-followers') {
            if (userFollowsBack(userCell)) {
                log(t('followsBack', { username }), 'info');
                return { action: 'skip', reason: 'follows-back' };
            }
        }

        if (currentMode === 'inactive' || currentMode === 'ghost') {
            log(t('fetchingProfile', { username }), 'info');
            const profile = await fetchUserProfile(username);
            await sleep(getDelay(PROFILE_FETCH_DELAY));

            if (!profile) {
                return { action: 'skip', reason: 'profile-unavailable' };
            }

            if (currentMode === 'inactive') {
                const thresholdMs = inactiveThresholdDays * 24 * 60 * 60 * 1000;
                let isInactive = false;
                if (profile.lastTweetDate) {
                    isInactive = (Date.now() - profile.lastTweetDate.getTime()) >= thresholdMs;
                } else if (profile.tweetsCount === 0) {
                    isInactive = true;
                }

                if (!isInactive) {
                    log(t('inactiveSkip', { username }), 'info');
                    return { action: 'skip', reason: 'active' };
                }
            }

            if (currentMode === 'ghost') {
                const isGhost = profile.defaultAvatar && profile.tweetsCount === 0;
                if (!isGhost) {
                    log(t('ghostSkip', { username }), 'info');
                    return { action: 'skip', reason: 'not-ghost' };
                }
            }
        }

        const clicked = await clickUnfollow(userCell, username);
        if (!clicked) {
            return { action: 'skip', reason: 'no-button' };
        }

        await sleep(getDelay(BASE_DELAY_AFTER_CONFIRM));

        const confirmed = await clickConfirm(username);
        if (confirmed) {
            log(t('unfollowed', { username }), 'success');
            // Send dedicated unfollowed message for history tracking
            chrome.runtime.sendMessage({
                type: 'unfollowed',
                username: username
            }).catch(() => { });
            return { action: 'unfollowed', username: username };
        }

        return { action: 'skip', reason: 'confirm-failed' };
    }

    async function scrollDown() {
        const previousHeight = document.documentElement.scrollHeight;
        window.scrollTo(0, document.documentElement.scrollHeight);
        await sleep(getDelay(BASE_SCROLL_DELAY));

        const newHeight = document.documentElement.scrollHeight;
        return newHeight > previousHeight;
    }

    // Wait while paused
    async function waitWhilePaused() {
        while (isPaused && isRunning && !shouldStop) {
            await sleep(500);
        }
    }

    // === MAIN LOOP ===
    async function runUnfollowLoop() {
        log(t('started'), 'success');
        let modeName = t('modeAll');
        if (currentMode === 'non-followers') modeName = t('modeNonFollowers');
        if (currentMode === 'inactive') modeName = t('modeInactive');
        if (currentMode === 'ghost') modeName = t('modeGhost');
        log(t('mode', { mode: modeName }), 'info');
        log(t('whitelist', { count: whitelist.length }), 'info');

        const processedUsers = new Set();
        let noNewUsersCount = 0;
        const MAX_NO_NEW_USERS = 5;
        let totalIterations = 0;

        while (isRunning && !shouldStop && totalIterations < MAX_LOOP_ITERATIONS) {
            totalIterations++;

            // Check pause state
            if (isPaused) {
                await waitWhilePaused();
                if (shouldStop || !isRunning) break;
            }

            // Check limit
            if (unfollowLimit > 0 && stats.unfollowed >= unfollowLimit) {
                log(t('limitReached', { limit: unfollowLimit }), 'success');
                break;
            }

            // Check if page is visible
            if (document.hidden) {
                log(t('tabHidden'), 'warning');
                await sleep(3000);
                continue;
            }

            const userCells = document.querySelectorAll(SELECTORS.userCell);
            let foundNewUser = false;

            for (const userCell of userCells) {
                if (shouldStop || !isRunning) break;

                // Check pause inside inner loop too
                if (isPaused) {
                    await waitWhilePaused();
                    if (shouldStop || !isRunning) break;
                }

                // Check limit inside inner loop
                if (unfollowLimit > 0 && stats.unfollowed >= unfollowLimit) break;

                const username = getUsername(userCell);
                if (!username || processedUsers.has(username)) {
                    continue;
                }

                foundNewUser = true;
                processedUsers.add(username);
                stats.scanned++;
                sendStats();

                const result = await processUser(userCell);

                if (result.action === 'unfollowed') {
                    stats.unfollowed++;
                    sendStats();
                    updateBadge();

                    // Periodic crash recovery save
                    if (stats.unfollowed % STATS_SAVE_INTERVAL === 0) {
                        persistStats();
                    }

                    await sleep(getDelay(BASE_DELAY_BETWEEN_ACTIONS));
                } else if (result.action === 'skip') {
                    stats.skipped++;
                    sendStats();
                }

                await sleep(500);
            }

            if (!foundNewUser) {
                log(t('loading'), 'info');
                const scrolled = await scrollDown();

                if (!scrolled) {
                    noNewUsersCount++;
                    if (noNewUsersCount >= MAX_NO_NEW_USERS) {
                        log(t('listEnd'), 'success');
                        break;
                    }
                } else {
                    noNewUsersCount = 0;
                }
            }
        }

        // Finish
        isRunning = false;
        shouldStop = false;
        isPaused = false;
        log(t('completed', { unfollowed: stats.unfollowed, skipped: stats.skipped }), 'success');
        persistStats();
        sendStopped();
    }

    // === MESSAGE LISTENER ===
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'start') {
            if (isRunning) {
                sendResponse({ success: false, error: 'Already running' });
                return true;
            }

            stats = { unfollowed: 0, skipped: 0, scanned: 0 };
            currentMode = message.mode || 'non-followers';
            whitelist = message.whitelist || [];
            unfollowLimit = message.limit || 0;
            speedMultiplier = message.speed || 1;
            inactiveThresholdDays = parseInt(message.inactiveDays, 10) || 90;
            isRunning = true;
            shouldStop = false;
            isPaused = false;

            runUnfollowLoop();
            sendResponse({ success: true });
        }

        if (message.action === 'stop') {
            log(t('stopRequest'), 'warning');
            shouldStop = true;
            isRunning = false;
            isPaused = false;
            sendResponse({ success: true });
        }

        if (message.action === 'pause') {
            isPaused = true;
            log(t('paused'), 'warning');
            sendResponse({ success: true });
        }

        if (message.action === 'resume') {
            isPaused = false;
            log(t('resumed'), 'success');
            sendResponse({ success: true });
        }

        if (message.action === 'getState') {
            sendResponse({
                isRunning: isRunning,
                isPaused: isPaused,
                stats: stats
            });
        }

        if (message.action === 'updateSpeed') {
            speedMultiplier = message.speed || 1;
            sendResponse({ success: true });
        }

        return true;
    });

    // Visibility change handler
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isRunning) {
            log(t('tabHidden'), 'warning');
        } else if (!document.hidden && isRunning) {
            log(t('tabActive'), 'success');
        }
    });

    // Initial log
    console.log(`\u{1F426} ${t('loaded')}`);

})();
