// Localization - X Unfollow Tool
// Detects Chrome language and provides translations

const translations = {
    tr: {
        // Popup UI
        title: 'Unfollow Tool',
        subtitle: 'Takip listenizi kolayca yönetin.',
        modeTitle: 'Mod Seçimi',
        modeNonFollowers: 'Takip Etmeyenler',
        modeNonFollowersDesc: 'Sadece sizi takip etmeyenleri çıkar',
        modeAll: 'Herkesi Çıkar',
        modeAllDesc: 'Tüm takip ettiklerini çıkar',
        modeInactive: 'Pasif Hesaplar',
        modeInactiveDesc: 'Uzun süredir tweet atmayanları çıkar',
        modeGhost: 'Hayalet Hesaplar',
        modeGhostDesc: 'Varsayılan avatar ve 0 tweet olanları çıkar',
        whitelistTitle: 'Whitelist',
        whitelistPlaceholder: 'Korunacak kullanıcı adları (her satıra bir tane)\n\nÖrnek:\nelonmusk\ntwitter',
        whitelistHint: 'Bu kullanıcılar takipten çıkarılmayacak',
        statUnfollowed: 'Çıkarılan',
        statSkipped: 'Atlanan',
        statScanned: 'Taranan',
        btnStart: 'Başlat',
        btnStop: 'Durdur',
        btnPause: 'Durakla',
        btnResume: 'Devam Et',
        logTitle: 'İşlem Logları',

        // Menu
        menuTitle: 'Ayarlar',
        menuWhitelist: 'Whitelist',
        menuLogs: 'İşlem Logları',
        menuLanguage: 'Dil',
        menuAbout: 'Hakkında',
        menuHistory: 'Unfollow Geçmişi',
        menuSpeed: 'Hız Ayarı',
        menuExport: 'Dışa Aktar',
        menuImport: 'İçe Aktar',
        menuTheme: 'Tema',
        themeDark: 'Koyu',
        themeLight: 'Açık',

        // Speed
        speedSlow: 'Yavaş',
        speedNormal: 'Normal',
        speedFast: 'Hızlı',

        // Inactive threshold
        inactiveThresholdLabel: 'Pasiflik Süresi',
        inactive30: '30 gün',
        inactive90: '90 gün',
        inactive180: '180 gün',
        inactive365: '1 yıl',

        // Limit
        limitLabel: 'Unfollow Limiti',
        limitPlaceholder: '0 = limitsiz',
        limitHint: 'Maksimum unfollow sayısı (0 = limitsiz)',

        // History
        historyTitle: 'Unfollow Geçmişi',
        historyEmpty: 'Henüz geçmiş yok',
        historyClear: 'Geçmişi Temizle',

        // Export/Import
        exportSuccess: 'Veriler kopyalandı!',
        importSuccess: 'Veriler içeri aktarıldı!',
        importError: 'Geçersiz veri formatı',
        exportTitle: 'Dışa / İçe Aktar',

        // Status messages
        statusGoToFollowing: 'X.com\'da takip edilenlere gidin',
        statusGoingToFollowing: 'Following sayfasına gidiliyor',
        statusGoToProfile: 'Bir profil sayfasına gidin',
        statusPageError: 'Sayfa kontrol edilemedi',
        statusRunning: 'İşlem devam ediyor...',
        statusPaused: 'Duraklatıldı',
        statusStarted: 'İşlem başlatıldı',
        statusStopped: 'Durduruldu',
        statusCompleted: 'Tamamlandı',
        statusStartError: 'Başlatılamadı. Sayfayı yenileyin.',
        warningSlowMode: 'Bu mod her profili tek tek kontrol eder, daha uzun sürebilir.',

        // Button texts
        btnOpenX: 'X.com\'u Aç',
        btnGoToProfile: 'Profilime Git',

        // Log messages
        logStarted: 'İşlem başlatıldı',
        logModeNonFollowers: 'Mod: Takip Etmeyenler',
        logModeAll: 'Mod: Herkes',
        logWhitelist: 'Whitelist: {count} kullanıcı',
        logGoingToFollowing: '@{username}/following sayfasına gidiliyor...',
        logGoingToHome: 'X.com ana sayfasına gidiliyor...',
        logModeInactive: 'Mod: Pasif Hesaplar',
        logModeGhost: 'Mod: Hayalet Hesaplar',
        logStopped: 'İşlem durduruldu',
        logCompleted: 'İşlem tamamlandı',
        logError: 'Hata: {message}',
        logStopError: 'Durdurma hatası: {message}',

        // Whitelist validation
        whitelistInvalid: 'Geçersiz kullanıcı adı: {username}',
        whitelistValidCount: '{valid} geçerli, {invalid} geçersiz kullanıcı'
    },

    en: {
        // Popup UI
        title: 'Unfollow Tool',
        subtitle: 'Easily manage your following list.',
        modeTitle: 'Mode Selection',
        modeNonFollowers: 'Non-Followers',
        modeNonFollowersDesc: 'Only unfollow those who don\'t follow you',
        modeAll: 'Unfollow All',
        modeAllDesc: 'Unfollow everyone you follow',
        modeInactive: 'Inactive Accounts',
        modeInactiveDesc: 'Unfollow accounts with no recent tweets',
        modeGhost: 'Ghost Accounts',
        modeGhostDesc: 'Unfollow default avatar and 0 tweets',
        whitelistTitle: 'Whitelist',
        whitelistPlaceholder: 'Usernames to protect (one per line)\n\nExample:\nelonmusk\ntwitter',
        whitelistHint: 'These users will not be unfollowed',
        statUnfollowed: 'Unfollowed',
        statSkipped: 'Skipped',
        statScanned: 'Scanned',
        btnStart: 'Start',
        btnStop: 'Stop',
        btnPause: 'Pause',
        btnResume: 'Resume',
        logTitle: 'Activity Log',

        // Menu
        menuTitle: 'Settings',
        menuWhitelist: 'Whitelist',
        menuLogs: 'Activity Log',
        menuLanguage: 'Language',
        menuAbout: 'About',
        menuHistory: 'Unfollow History',
        menuSpeed: 'Speed',
        menuExport: 'Export',
        menuImport: 'Import',
        menuTheme: 'Theme',
        themeDark: 'Dark',
        themeLight: 'Light',

        // Speed
        speedSlow: 'Slow',
        speedNormal: 'Normal',
        speedFast: 'Fast',

        // Inactive threshold
        inactiveThresholdLabel: 'Inactive Period',
        inactive30: '30 days',
        inactive90: '90 days',
        inactive180: '180 days',
        inactive365: '1 year',

        // Limit
        limitLabel: 'Unfollow Limit',
        limitPlaceholder: '0 = unlimited',
        limitHint: 'Max unfollows (0 = unlimited)',

        // History
        historyTitle: 'Unfollow History',
        historyEmpty: 'No history yet',
        historyClear: 'Clear History',

        // Export/Import
        exportSuccess: 'Data copied to clipboard!',
        importSuccess: 'Data imported successfully!',
        importError: 'Invalid data format',
        exportTitle: 'Export / Import',

        // Status messages
        statusGoToFollowing: 'Go to X.com following page',
        statusGoingToFollowing: 'Going to following page',
        statusGoToProfile: 'Go to a profile page',
        statusPageError: 'Could not check page',
        statusRunning: 'Running...',
        statusPaused: 'Paused',
        statusStarted: 'Started',
        statusStopped: 'Stopped',
        statusCompleted: 'Completed',
        statusStartError: 'Could not start. Refresh the page.',
        warningSlowMode: 'This mode checks each profile individually. It may take longer.',

        // Button texts
        btnOpenX: 'Open X.com',
        btnGoToProfile: 'Go to Profile',

        // Log messages
        logStarted: 'Process started',
        logModeNonFollowers: 'Mode: Non-Followers',
        logModeAll: 'Mode: Everyone',
        logWhitelist: 'Whitelist: {count} users',
        logGoingToFollowing: 'Going to @{username}/following...',
        logGoingToHome: 'Going to X.com home page...',
        logModeInactive: 'Mode: Inactive Accounts',
        logModeGhost: 'Mode: Ghost Accounts',
        logStopped: 'Process stopped',
        logCompleted: 'Process completed',
        logError: 'Error: {message}',
        logStopError: 'Stop error: {message}',

        // Whitelist validation
        whitelistInvalid: 'Invalid username: {username}',
        whitelistValidCount: '{valid} valid, {invalid} invalid users'
    },

    ja: {
        // Popup UI
        title: 'Unfollow Tool',
        subtitle: 'フォローリストを簡単に管理。',
        modeTitle: 'モード選択',
        modeNonFollowers: 'フォローバックなし',
        modeNonFollowersDesc: 'フォローバックしていないユーザーのみ解除',
        modeAll: '全員解除',
        modeAllDesc: 'フォロー中の全ユーザーを解除',
        modeInactive: '非アクティブ',
        modeInactiveDesc: '最近ツイートがないアカウントを解除',
        modeGhost: 'ゴースト',
        modeGhostDesc: 'デフォルトアバター＆0ツイートを解除',
        whitelistTitle: 'ホワイトリスト',
        whitelistPlaceholder: '保護するユーザー名（1行に1つ）\n\n例:\nelonmusk\ntwitter',
        whitelistHint: 'これらのユーザーはフォロー解除されません',
        statUnfollowed: '解除済み',
        statSkipped: 'スキップ',
        statScanned: 'スキャン済み',
        btnStart: '開始',
        btnStop: '停止',
        btnPause: '一時停止',
        btnResume: '再開',
        logTitle: 'アクティビティログ',

        // Menu
        menuTitle: '設定',
        menuWhitelist: 'ホワイトリスト',
        menuLogs: 'アクティビティログ',
        menuLanguage: '言語',
        menuAbout: 'について',
        menuHistory: 'フォロー解除履歴',
        menuSpeed: '速度',
        menuExport: 'エクスポート',
        menuImport: 'インポート',
        menuTheme: 'テーマ',
        themeDark: 'ダーク',
        themeLight: 'ライト',

        // Speed
        speedSlow: '低速',
        speedNormal: '通常',
        speedFast: '高速',

        // Inactive threshold
        inactiveThresholdLabel: '非アクティブ期間',
        inactive30: '30日',
        inactive90: '90日',
        inactive180: '180日',
        inactive365: '1年',

        // Limit
        limitLabel: 'フォロー解除制限',
        limitPlaceholder: '0 = 無制限',
        limitHint: '最大フォロー解除数（0 = 無制限）',

        // History
        historyTitle: 'フォロー解除履歴',
        historyEmpty: '履歴がありません',
        historyClear: '履歴をクリア',

        // Export/Import
        exportSuccess: 'データをクリップボードにコピーしました！',
        importSuccess: 'データのインポートに成功しました！',
        importError: '無効なデータ形式です',
        exportTitle: 'エクスポート / インポート',

        // Status messages
        statusGoToFollowing: 'X.comのフォロー中ページに移動してください',
        statusGoingToFollowing: 'フォロー中ページに移動中',
        statusGoToProfile: 'プロフィールページに移動してください',
        statusPageError: 'ページを確認できませんでした',
        statusRunning: '実行中...',
        statusPaused: '一時停止中',
        statusStarted: '開始しました',
        statusStopped: '停止しました',
        statusCompleted: '完了しました',
        statusStartError: '開始できませんでした。ページを更新してください。',
        warningSlowMode: 'このモードは各プロフィールを個別に確認するため、時間がかかる場合があります。',

        // Button texts
        btnOpenX: 'X.comを開く',
        btnGoToProfile: 'プロフィールへ',

        // Log messages
        logStarted: 'プロセスを開始しました',
        logModeNonFollowers: 'モード: フォローバックなし',
        logModeAll: 'モード: 全員',
        logWhitelist: 'ホワイトリスト: {count}ユーザー',
        logGoingToFollowing: '@{username}/followingに移動中...',
        logGoingToHome: 'X.comホームページに移動中...',
        logModeInactive: 'モード: 非アクティブ',
        logModeGhost: 'モード: ゴースト',
        logStopped: 'プロセスを停止しました',
        logCompleted: 'プロセスが完了しました',
        logError: 'エラー: {message}',
        logStopError: '停止エラー: {message}',

        // Whitelist validation
        whitelistInvalid: '無効なユーザー名: {username}',
        whitelistValidCount: '{valid}件有効、{invalid}件無効'
    },

    pt: {
        // Popup UI
        title: 'Unfollow Tool',
        subtitle: 'Gerencie facilmente sua lista de seguindo.',
        modeTitle: 'Seleção de Modo',
        modeNonFollowers: 'Não Seguidores',
        modeNonFollowersDesc: 'Deixar de seguir apenas quem não te segue',
        modeAll: 'Deixar de Seguir Todos',
        modeAllDesc: 'Deixar de seguir todos que você segue',
        modeInactive: 'Contas Inativas',
        modeInactiveDesc: 'Deixar de seguir contas sem tweets recentes',
        modeGhost: 'Contas Fantasma',
        modeGhostDesc: 'Deixar de seguir avatar padrão e 0 tweets',
        whitelistTitle: 'Lista Branca',
        whitelistPlaceholder: 'Nomes de usuário a proteger (um por linha)\n\nExemplo:\nelonmusk\ntwitter',
        whitelistHint: 'Estes usuários não serão removidos',
        statUnfollowed: 'Removidos',
        statSkipped: 'Pulados',
        statScanned: 'Verificados',
        btnStart: 'Iniciar',
        btnStop: 'Parar',
        btnPause: 'Pausar',
        btnResume: 'Continuar',
        logTitle: 'Log de Atividades',

        // Menu
        menuTitle: 'Configurações',
        menuWhitelist: 'Lista Branca',
        menuLogs: 'Log de Atividades',
        menuLanguage: 'Idioma',
        menuAbout: 'Sobre',
        menuHistory: 'Histórico de Unfollow',
        menuSpeed: 'Velocidade',
        menuExport: 'Exportar',
        menuImport: 'Importar',
        menuTheme: 'Tema',
        themeDark: 'Escuro',
        themeLight: 'Claro',

        // Speed
        speedSlow: 'Lento',
        speedNormal: 'Normal',
        speedFast: 'Rápido',

        // Inactive threshold
        inactiveThresholdLabel: 'Período de Inatividade',
        inactive30: '30 dias',
        inactive90: '90 dias',
        inactive180: '180 dias',
        inactive365: '1 ano',

        // Limit
        limitLabel: 'Limite de Unfollow',
        limitPlaceholder: '0 = ilimitado',
        limitHint: 'Máximo de unfollows (0 = ilimitado)',

        // History
        historyTitle: 'Histórico de Unfollow',
        historyEmpty: 'Nenhum histórico ainda',
        historyClear: 'Limpar Histórico',

        // Export/Import
        exportSuccess: 'Dados copiados para a área de transferência!',
        importSuccess: 'Dados importados com sucesso!',
        importError: 'Formato de dados inválido',
        exportTitle: 'Exportar / Importar',

        // Status messages
        statusGoToFollowing: 'Vá para a página de seguindo no X.com',
        statusGoingToFollowing: 'Indo para a página de seguindo',
        statusGoToProfile: 'Vá para uma página de perfil',
        statusPageError: 'Não foi possível verificar a página',
        statusRunning: 'Executando...',
        statusPaused: 'Pausado',
        statusStarted: 'Iniciado',
        statusStopped: 'Parado',
        statusCompleted: 'Concluído',
        statusStartError: 'Não foi possível iniciar. Atualize a página.',
        warningSlowMode: 'Este modo verifica cada perfil individualmente. Pode demorar mais.',

        // Button texts
        btnOpenX: 'Abrir X.com',
        btnGoToProfile: 'Ir para Perfil',

        // Log messages
        logStarted: 'Processo iniciado',
        logModeNonFollowers: 'Modo: Não Seguidores',
        logModeAll: 'Modo: Todos',
        logWhitelist: 'Lista Branca: {count} usuários',
        logGoingToFollowing: 'Indo para @{username}/following...',
        logGoingToHome: 'Indo para a página inicial do X.com...',
        logModeInactive: 'Modo: Contas Inativas',
        logModeGhost: 'Modo: Contas Fantasma',
        logStopped: 'Processo parado',
        logCompleted: 'Processo concluído',
        logError: 'Erro: {message}',
        logStopError: 'Erro ao parar: {message}',

        // Whitelist validation
        whitelistInvalid: 'Nome de usuário inválido: {username}',
        whitelistValidCount: '{valid} válidos, {invalid} inválidos'
    },

    es: {
        // Popup UI
        title: 'Unfollow Tool',
        subtitle: 'Gestiona fácilmente tu lista de seguidos.',
        modeTitle: 'Selección de Modo',
        modeNonFollowers: 'No Seguidores',
        modeNonFollowersDesc: 'Solo dejar de seguir a quienes no te siguen',
        modeAll: 'Dejar de Seguir a Todos',
        modeAllDesc: 'Dejar de seguir a todos los que sigues',
        modeInactive: 'Cuentas Inactivas',
        modeInactiveDesc: 'Dejar de seguir cuentas sin tweets recientes',
        modeGhost: 'Cuentas Fantasma',
        modeGhostDesc: 'Dejar de seguir avatar predeterminado y 0 tweets',
        whitelistTitle: 'Lista Blanca',
        whitelistPlaceholder: 'Nombres de usuario a proteger (uno por línea)\n\nEjemplo:\nelonmusk\ntwitter',
        whitelistHint: 'Estos usuarios no serán eliminados',
        statUnfollowed: 'Eliminados',
        statSkipped: 'Omitidos',
        statScanned: 'Escaneados',
        btnStart: 'Iniciar',
        btnStop: 'Detener',
        btnPause: 'Pausar',
        btnResume: 'Reanudar',
        logTitle: 'Registro de Actividad',

        // Menu
        menuTitle: 'Configuración',
        menuWhitelist: 'Lista Blanca',
        menuLogs: 'Registro de Actividad',
        menuLanguage: 'Idioma',
        menuAbout: 'Acerca de',
        menuHistory: 'Historial de Unfollow',
        menuSpeed: 'Velocidad',
        menuExport: 'Exportar',
        menuImport: 'Importar',
        menuTheme: 'Tema',
        themeDark: 'Oscuro',
        themeLight: 'Claro',

        // Speed
        speedSlow: 'Lento',
        speedNormal: 'Normal',
        speedFast: 'Rápido',

        // Inactive threshold
        inactiveThresholdLabel: 'Periodo de Inactividad',
        inactive30: '30 días',
        inactive90: '90 días',
        inactive180: '180 días',
        inactive365: '1 año',

        // Limit
        limitLabel: 'Límite de Unfollow',
        limitPlaceholder: '0 = ilimitado',
        limitHint: 'Máximo de unfollows (0 = ilimitado)',

        // History
        historyTitle: 'Historial de Unfollow',
        historyEmpty: 'Sin historial aún',
        historyClear: 'Borrar Historial',

        // Export/Import
        exportSuccess: '¡Datos copiados al portapapeles!',
        importSuccess: '¡Datos importados exitosamente!',
        importError: 'Formato de datos inválido',
        exportTitle: 'Exportar / Importar',

        // Status messages
        statusGoToFollowing: 'Ve a la página de seguidos en X.com',
        statusGoingToFollowing: 'Yendo a la página de seguidos',
        statusGoToProfile: 'Ve a una página de perfil',
        statusPageError: 'No se pudo verificar la página',
        statusRunning: 'Ejecutando...',
        statusPaused: 'Pausado',
        statusStarted: 'Iniciado',
        statusStopped: 'Detenido',
        statusCompleted: 'Completado',
        statusStartError: 'No se pudo iniciar. Actualiza la página.',
        warningSlowMode: 'Este modo verifica cada perfil individualmente. Puede tardar más.',

        // Button texts
        btnOpenX: 'Abrir X.com',
        btnGoToProfile: 'Ir al Perfil',

        // Log messages
        logStarted: 'Proceso iniciado',
        logModeNonFollowers: 'Modo: No Seguidores',
        logModeAll: 'Modo: Todos',
        logWhitelist: 'Lista Blanca: {count} usuarios',
        logGoingToFollowing: 'Yendo a @{username}/following...',
        logGoingToHome: 'Yendo a la página principal de X.com...',
        logModeInactive: 'Modo: Cuentas Inactivas',
        logModeGhost: 'Modo: Cuentas Fantasma',
        logStopped: 'Proceso detenido',
        logCompleted: 'Proceso completado',
        logError: 'Error: {message}',
        logStopError: 'Error al detener: {message}',

        // Whitelist validation
        whitelistInvalid: 'Nombre de usuario inválido: {username}',
        whitelistValidCount: '{valid} válidos, {invalid} inválidos'
    }
};

// i18n object
window.i18n = {
    forcedLang: null,

    getLanguage() {
        if (this.forcedLang) return this.forcedLang;
        const lang = chrome.i18n?.getUILanguage?.() || navigator.language || 'en';
        if (lang.startsWith('tr')) return 'tr';
        if (lang.startsWith('ja')) return 'ja';
        if (lang.startsWith('pt')) return 'pt';
        if (lang.startsWith('es')) return 'es';
        return 'en';
    },

    translations
};

// Get translation helper
function t(key, params = {}) {
    const lang = window.i18n.getLanguage();
    let text = translations[lang]?.[key] || translations.en[key] || key;

    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });

    return text;
}
