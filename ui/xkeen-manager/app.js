const STORAGE_KEY = "xkeen-manager-state-v7";
const LANGUAGE_KEY = "xkeen-manager-lang-v1";
const STATE_URL = "./api/routing.cgi?kind=state";
const OUTBOUNDS_URL = "./api/routing.cgi?kind=outbounds";
const SINGBOX_URL = "./api/routing.cgi?kind=singbox";
const PROBE_URL = "./api/routing.cgi?kind=probe";
const REPAIR_URL = "./api/routing.cgi?kind=repair-runtime";
const LOGIN_URL = "./api/routing.cgi?kind=login";
const LOGOUT_URL = "./api/routing.cgi?kind=logout";
const LIVE_ROUTING_URL = "./api/routing.cgi";
const HEALTH_URL = "./api/routing.cgi?kind=health";
const LOGS_URL = "./api/routing.cgi?kind=logs";
const RESTART_SVC_URL = "./api/routing.cgi?kind=restart-svc";
const STACK_INFO_URL = "./api/routing.cgi?kind=stack-info";
const MUX_MODES = new Set(["off", "xudp"]);
const MUX_UDP443_MODES = new Set(["reject", "skip", "allow"]);

const LOCALES = {
  ru: {
    documentTitle: "AntiGoblin",
    authTitle: "\u0412\u0445\u043e\u0434 \u0432 \u043f\u0430\u043d\u0435\u043b\u044c",
    authLead: "\u0412\u043e\u0439\u0434\u0438 \u043b\u043e\u0433\u0438\u043d\u043e\u043c \u0438 \u043f\u0430\u0440\u043e\u043b\u0435\u043c \u043e\u0442 \u0432\u0435\u0431-\u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430 Keenetic.",
    authLoginLabel: "\u041b\u043e\u0433\u0438\u043d",
    authPasswordLabel: "\u041f\u0430\u0440\u043e\u043b\u044c",
    authSubmit: "\u0412\u043e\u0439\u0442\u0438",
    authSubmitting: "\u0412\u0445\u043e\u0434...",
    heroTitle: "\u041f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f XKeen/xray",
    heroLead: "\u0423\u043f\u0440\u0430\u0432\u043b\u044f\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044f\u043c\u0438, \u0433\u0440\u0443\u043f\u043f\u0430\u043c\u0438 \u0438 VLESS-\u043a\u043e\u043d\u0444\u0438\u0433\u043e\u043c \u0434\u043b\u044f XKeen/xray \u0432 \u043e\u0434\u043d\u043e\u0439 \u043f\u0430\u043d\u0435\u043b\u0438.",
    langLabel: "Language",
    profileKicker: "\u0411\u0430\u0437\u043e\u0432\u044b\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438",
    profileTitle: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u043f\u0440\u043e\u0444\u0438\u043b\u044f",
    activeProfileLabel: "\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c",
    profileNameLabel: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043d\u0430\u0431\u043e\u0440\u0430",
    domainStrategyLabel: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044f \u0434\u043e\u043c\u0435\u043d\u043e\u0432",
    fallbackLabel: "\u041c\u0430\u0440\u0448\u0440\u0443\u0442 \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e",
    trafficTypeLabel: "\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435",
    trafficTypeVpn: "\u0427\u0435\u0440\u0435\u0437 VPN",
    trafficTypeBypass: "\u041c\u0438\u043c\u043e VPN",
    proxyTitle: "\u041a\u043e\u043d\u0444\u0438\u0433 \u043f\u0440\u043e\u043a\u0441\u0438",
    proxyUrlLabel: "VLESS URL",
    proxyAddressLabel: "\u0421\u0435\u0440\u0432\u0435\u0440",
    proxyPortLabel: "\u041f\u043e\u0440\u0442",
    muxKicker: "Mux / XUDP",
    muxTitle: "Mux режим",
    muxModeLabel: "Режим",
    muxUdp443Label: "UDP/443",
    muxXudpConcurrencyLabel: "XUDP concurrency",
    muxModeOff: "Off",
    muxModeXudp: "XUDP only",
    previewKicker: "\u041f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440",
    previewTitle: "\u0418\u0442\u043e\u0433\u043e\u0432\u044b\u0439 routing.json",
    groupsKicker: "\u0413\u0440\u0443\u043f\u043f\u044b",
    groupsTitle: "\u041f\u0440\u0430\u0432\u0438\u043b\u0430 \u0442\u0440\u0430\u0444\u0438\u043a\u0430",
    importBtn: "\u0418\u043c\u043f\u043e\u0440\u0442",
    exportBtn: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c",
    repairBtn: "\u0420\u0435\u0441\u0442\u0430\u0440\u0442",
    saveApplyBtn: "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438 \u043f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c",
    logoutBtn: "\u0412\u044b\u0439\u0442\u0438",
    addProfileBtn: "\u041d\u043e\u0432\u044b\u0439",
    duplicateProfileBtn: "\u0414\u0443\u0431\u043b\u0438\u0440\u043e\u0432\u0430\u0442\u044c",
    removeProfileBtn: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
    saveStateBtn: "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",
    importProxyBtn: "\u0418\u043c\u043f\u043e\u0440\u0442 vless://",
    probeProxyBtn: "\u041f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c",
    addGroupBtn: "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0433\u0440\u0443\u043f\u043f\u0443",
    profileName: "\u041f\u0440\u043e\u0444\u0438\u043b\u044c 1",
    defaultProfileName: "\u041f\u0440\u043e\u0444\u0438\u043b\u044c",
    fallbackNote: "\u0420\u0435\u0437\u0435\u0440\u0432\u043d\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435, \u0435\u0441\u043b\u0438 state \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043b\u0441\u044f",
    copied: "\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e",
    imported: "\u0418\u043c\u043f\u043e\u0440\u0442 \u0438\u0437 xray routing",
    noGroups: "\u041d\u0435\u0442 \u0433\u0440\u0443\u043f\u043f. \u041d\u0430\u0436\u043c\u0438 \"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0433\u0440\u0443\u043f\u043f\u0443\".",
    newGroup: "\u041d\u043e\u0432\u0430\u044f \u0433\u0440\u0443\u043f\u043f\u0430",
    active: "\u0410\u043a\u0442\u0438\u0432\u043d\u0430",
    remove: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
    comment: "\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",
    commentPlaceholder: "\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440: Copilot / Telegram / AI",
    domains: "\u0414\u043e\u043c\u0435\u043d\u044b",
    cidr: "CIDR / IP \u0441\u0435\u0442\u0438",
    currentState: "\u0422\u0435\u043a\u0443\u0449\u0438\u0439 state \u0441 \u0440\u043e\u0443\u0442\u0435\u0440\u0430",
    groups: "\u0413\u0440\u0443\u043f\u043f",
    activeGroups: "\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0445",
    vpnDomains: "VPN-\u0434\u043e\u043c\u0435\u043d\u043e\u0432",
    bypassDomains: "\u041c\u0438\u043c\u043e VPN",
    cidrShort: "CIDR",
    bypassGroupName: "\u041c\u0438\u043c\u043e VPN",
    profileAdded: "\u041d\u043e\u0432\u044b\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c",
    profileCopySuffix: " \u043a\u043e\u043f\u0438\u044f",
    saveApplyDone: "\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043e \u0438 \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u043e",
    saveStateDone: "\u041f\u0440\u043e\u0444\u0438\u043b\u044c \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d",
    repairDone: "\u0420\u0435\u0441\u0442\u0430\u0440\u0442 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d",
    importStateTitle: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442 state-\u0444\u0430\u0439\u043b \u0441 \u043f\u0440\u043e\u0444\u0438\u043b\u044f\u043c\u0438 \u0438 \u0433\u0440\u0443\u043f\u043f\u0430\u043c\u0438.",
    exportStateTitle: "\u0421\u043a\u0430\u0447\u0438\u0432\u0430\u0435\u0442 state-\u0444\u0430\u0439\u043b \u0441 \u0442\u0435\u043a\u0443\u0449\u0438\u043c\u0438 \u043f\u0440\u043e\u0444\u0438\u043b\u044f\u043c\u0438 \u0438 \u0433\u0440\u0443\u043f\u043f\u0430\u043c\u0438.",
    saveStateTitle: "\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u0442 state \u043d\u0430 \u0440\u043e\u0443\u0442\u0435\u0440\u0435 \u0431\u0435\u0437 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f xray \u0438 \u0431\u0435\u0437 \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043c\u0430\u0440\u0448\u0440\u0443\u0442\u0438\u0437\u0430\u0446\u0438\u0438.",
    saveApplyTitle: "\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u0442 state \u043d\u0430 \u0440\u043e\u0443\u0442\u0435\u0440\u0435, \u0433\u0435\u043d\u0435\u0440\u0438\u0440\u0443\u0435\u0442 05_routing.json, \u0434\u0435\u043b\u0430\u0435\u0442 backup \u0438 \u043f\u0435\u0440\u0435\u0437\u0430\u043f\u0443\u0441\u043a\u0430\u0435\u0442 xray.",
    repairTitle: "\u041f\u0435\u0440\u0435\u0441\u043e\u0431\u0438\u0440\u0430\u0435\u0442 runtime XKeen/xray: \u0446\u0435\u043f\u043e\u0447\u043a\u0443 xkeen \u0438 \u043f\u0440\u043e\u0446\u0435\u0441\u0441 xray.",
    importProxyTitle: "\u0412\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u043f\u043e\u043b\u044f \u043f\u0440\u043e\u043a\u0441\u0438 \u0438\u0437 \u0441\u0441\u044b\u043b\u043a\u0438 vless://",
    probeProxyTitle: "\u041f\u0440\u043e\u0432\u0435\u0440\u044f\u0435\u0442 \u0441 \u0440\u043e\u0443\u0442\u0435\u0440\u0430, \u0440\u0435\u0437\u043e\u043b\u0432\u0438\u0442\u0441\u044f \u043b\u0438 \u0445\u043e\u0441\u0442 \u0438 \u043e\u0442\u043a\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u043b\u0438 TCP-\u043f\u043e\u0440\u0442.",
    authRequiredMessage: "\u041d\u0443\u0436\u043d\u0430 \u0430\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u0441\u0435\u0441\u0441\u0438\u044f \u0432 \u0432\u0435\u0431-\u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0435 Keenetic. \u0412\u043e\u0439\u0434\u0438 \u0432 \u0432\u0435\u0431-\u043c\u043e\u0440\u0434\u0443 \u0440\u043e\u0443\u0442\u0435\u0440\u0430 \u0438 \u043e\u0431\u043d\u043e\u0432\u0438 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443.",
    authLoginHint: "\u041c\u043e\u0436\u043d\u043e \u0432\u043e\u0439\u0442\u0438 \u043a\u0430\u043a \u0447\u0435\u0440\u0435\u0437 \u0443\u0436\u0435 \u043e\u0442\u043a\u0440\u044b\u0442\u0443\u044e \u0441\u0435\u0441\u0441\u0438\u044e Keenetic, \u0442\u0430\u043a \u0438 \u043d\u0430\u043f\u0440\u044f\u043c\u0443\u044e \u043b\u043e\u0433\u0438\u043d\u043e\u043c \u0438 \u043f\u0430\u0440\u043e\u043b\u0435\u043c \u043e\u0442 \u0432\u0435\u0431-\u043c\u043e\u0440\u0434\u044b.",
    loginImported: "VLESS URL \u0438\u043c\u043f\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u043d",
    importError: "\u041e\u0448\u0438\u0431\u043a\u0430 \u0438\u043c\u043f\u043e\u0440\u0442\u0430",
    probeAvailable: "TCP {address}:{port} \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d{ipPart}",
    probeFailed: "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043d\u0435 \u043f\u0440\u043e\u0448\u043b\u0430",
    probeError: "\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438",
    invalidLogin: "\u041e\u0448\u0438\u0431\u043a\u0430 \u0432\u0445\u043e\u0434\u0430",
    logoutDone: "\u0421\u0435\u0441\u0441\u0438\u044f \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0430. \u0412\u043e\u0439\u0434\u0438 \u0441\u043d\u043e\u0432\u0430 \u043b\u043e\u0433\u0438\u043d\u043e\u043c \u0438 \u043f\u0430\u0440\u043e\u043b\u0435\u043c Keenetic.",
    logoutTitle: "\u0417\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u0442 \u0441\u0435\u0441\u0441\u0438\u044e UI \u0438 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u044d\u043a\u0440\u0430\u043d \u0432\u0445\u043e\u0434\u0430.",
    loginRequired: "\u0417\u0430\u043f\u043e\u043b\u043d\u0438 \u043b\u043e\u0433\u0438\u043d \u0438 \u043f\u0430\u0440\u043e\u043b\u044c",
    invalidVlessUrl: "\u041d\u0443\u0436\u043d\u0430 \u0441\u0441\u044b\u043b\u043a\u0430 \u0432\u0438\u0434\u0430 vless://...",
    invalidRealitySecurity: "\u041e\u0436\u0438\u0434\u0430\u043b\u0441\u044f security=reality",
    needOneProfile: "Need at least one profile",
    repairFailed: "Restart failed",
    saveStateFailed: "Save profile failed",
    saveApplyFailed: "Save/apply failed",
    stateFetchFailed: "state fetch failed",
    outboundsFetchFailed: "outbounds fetch failed",
    routerSessionRequired: "router ui authorization required",
    healthKicker: "Состояние",
    healthTitle: "Здоровье и логи",
    healthRefreshBtn: "Обновить",
    healthRunning: "работает",
    healthStopped: "остановлен",
    healthCheckTproxy: "Правило TPROXY в конце mangle PREROUTING",
    healthCheckIpRule: "ip rule с маской 0x111/0x111",
    healthCheckUdpIpset: "ipset xkeen_udp_route существует",
    healthCheckBypassIpset: "ipset xkeen_bypass существует",
    healthCheckPass: "ок",
    healthCheckFail: "сбой",
    healthFetchFailed: "Не удалось загрузить статус",
    restartXrayBtn: "↻ xray",
    restartSingboxBtn: "↻ sing-box",
    restartSelfhealBtn: "↻ self-heal",
    restartSvcDone: "Перезапуск выполнен",
    restartSvcFailed: "Ошибка перезапуска",
    logsSelectLabel: "Лог",
    logsLinesLabel: "Строк",
    loadLogsBtn: "Загрузить",
    logsLoadFailed: "Не удалось загрузить лог",
    logsEmpty: "(лог пуст)",
    logsCopyBtn: "Скопировать",
    logsCopiedDone: "Скопировано",
    dedupDomainsRemoved: "Убрано лишних доменов: {n} (покрыты родительским)",
    dedupCidrsRemoved: "Убрано лишних IP/CIDR: {n} (покрыты более широкой сетью)",
    stackInfoFetchFailed: "Не удалось загрузить параметры стека",
    stackVersions: "Версии",
    stackXrayVer: "xray", stackSingboxVer: "sing-box", stackKernel: "ядро", stackUptime: "uptime",
    stackVpnSection: "VPN",
    stackVpnHost: "сервер", stackVpnExitIp: "exit IP", stackVpnSni: "Reality SNI",
    stackNetSection: "Сеть",
    stackWanIface: "WAN-интерфейс", stackWanIp: "WAN IP", stackGw: "default gateway", stackLan: "LAN сеть",
    stackXkeenSection: "xkeen",
    stackPolicy: "Keenetic policy", stackMark: "mark", stackTproxyPort: "TPROXY UDP", stackRedirectPort: "REDIRECT TCP", stackSsRelay: "SS-relay",
    stackRuntimeSection: "Runtime",
    stackSelfhealInterval: "интервал self-heal", stackLogRotate: "ротация логов", stackLogRotateValue: "раз в сутки", stackBackupRetention: "хранение бэкапов", stackBackupRetentionValue: "{n} последних копий", stackFdThresh: "FD warn / critical",
    stackResourcesSection: "Ресурсы",
    stackMem: "память", stackDisk: "диск", stackConntrack: "conntrack", stackXrayFd: "xray FD",
    stackCopyHint: "Кликни — скопировать",
    toastSvcRestarting: "Перезапуск {svc}…",
    toastSvcRestarted: "{svc} перезапущен",
    toastSvcRestartFailed: "Ошибка перезапуска {svc}: {error}",
    toastRepairing: "Перестройка runtime…",
    toastSavingState: "Сохранение профиля…",
    toastSavingApplying: "Сохранение и применение…",
    toastProbing: "Проверка {addr}:{port}…",
    toastInvalidDomains: "Удалены не-домены: {list}",
    toastInvalidCidrs: "Удалены не-IP/CIDR: {list}",
    ipsetUdpLabel: "UDP route ipset",
    ipsetBypassLabel: "Bypass ipset"
  },
  en: {
    documentTitle: "AntiGoblin",
    authTitle: "Sign In",
    authLead: "Use your Keenetic web UI username and password to access the panel.",
    authLoginLabel: "Username",
    authPasswordLabel: "Password",
    authSubmit: "Sign in",
    authSubmitting: "Signing in...",
    heroTitle: "XKeen/xray Control Panel",
    heroLead: "Manage profiles, groups, and VLESS config for XKeen/xray in one panel.",
    langLabel: "Language",
    profileKicker: "Profile setup",
    profileTitle: "Profile settings",
    activeProfileLabel: "Active profile",
    profileNameLabel: "Profile name",
    domainStrategyLabel: "Domain strategy",
    fallbackLabel: "Default route",
    trafficTypeLabel: "Direction",
    trafficTypeVpn: "Through VPN",
    trafficTypeBypass: "Outside VPN",
    proxyTitle: "Proxy config",
    proxyUrlLabel: "VLESS URL",
    proxyAddressLabel: "Server",
    proxyPortLabel: "Port",
    muxKicker: "Mux / XUDP",
    muxTitle: "Mux mode",
    muxModeLabel: "Mode",
    muxUdp443Label: "UDP/443",
    muxXudpConcurrencyLabel: "XUDP concurrency",
    muxModeOff: "Off",
    muxModeXudp: "XUDP only",
    previewKicker: "Preview",
    previewTitle: "Generated routing.json",
    groupsKicker: "Groups",
    groupsTitle: "Traffic rules",
    importBtn: "Import",
    exportBtn: "Download",
    repairBtn: "Restart",
    saveApplyBtn: "Save and apply",
    logoutBtn: "Log out",
    addProfileBtn: "New",
    duplicateProfileBtn: "Duplicate",
    removeProfileBtn: "Delete",
    saveStateBtn: "Save",
    importProxyBtn: "Import vless://",
    probeProxyBtn: "Probe",
    addGroupBtn: "Add group",
    profileName: "Profile 1",
    defaultProfileName: "Profile",
    fallbackNote: "Fallback state when live state could not be loaded",
    copied: "Copied",
    imported: "Imported from xray routing",
    noGroups: "No groups yet. Click \"Add group\".",
    newGroup: "New group",
    active: "Active",
    remove: "Delete",
    comment: "Comment",
    commentPlaceholder: "For example: Copilot / Telegram / AI",
    domains: "Domains",
    cidr: "CIDR / IP ranges",
    currentState: "Current router state",
    groups: "Groups",
    activeGroups: "Active",
    vpnDomains: "VPN domains",
    bypassDomains: "Outside VPN",
    cidrShort: "CIDR",
    bypassGroupName: "Outside VPN",
    profileAdded: "New profile",
    profileCopySuffix: " copy",
    saveApplyDone: "Saved and applied",
    saveStateDone: "Profile saved",
    repairDone: "Restart completed",
    importStateTitle: "Load a saved state file with profiles and groups.",
    exportStateTitle: "Download the current state file with profiles and groups.",
    saveStateTitle: "Save state on the router without applying xray changes.",
    saveApplyTitle: "Save state, generate 05_routing.json, back up files, and restart xray.",
    repairTitle: "Rebuild XKeen/xray runtime: xkeen chain and xray process.",
    importProxyTitle: "Fill proxy fields from a vless:// link.",
    probeProxyTitle: "Check from the router whether the host resolves and the TCP port opens.",
    authRequiredMessage: "An active Keenetic web session is required. Sign in to the router web UI and refresh the page.",
    authLoginHint: "You can use either an existing Keenetic web session or sign in here with the same router UI credentials.",
    loginImported: "VLESS URL imported",
    importError: "Import error",
    probeAvailable: "TCP {address}:{port} is reachable{ipPart}",
    probeFailed: "Probe failed",
    probeError: "Probe error",
    invalidLogin: "Sign-in failed",
    logoutDone: "Session ended. Sign in again with your Keenetic credentials.",
    logoutTitle: "Ends the UI session and returns to the sign-in screen.",
    loginRequired: "Enter both username and password",
    invalidVlessUrl: "Expected a vless:// link",
    invalidRealitySecurity: "Expected security=reality",
    needOneProfile: "Need at least one profile",
    repairFailed: "Restart failed",
    saveStateFailed: "Save profile failed",
    saveApplyFailed: "Save/apply failed",
    stateFetchFailed: "state fetch failed",
    outboundsFetchFailed: "outbounds fetch failed",
    routerSessionRequired: "router ui authorization required",
    healthKicker: "Status",
    healthTitle: "Health and logs",
    healthRefreshBtn: "Refresh",
    healthRunning: "running",
    healthStopped: "stopped",
    healthCheckTproxy: "TPROXY rule at end of mangle PREROUTING",
    healthCheckIpRule: "ip rule with mask 0x111/0x111",
    healthCheckUdpIpset: "xkeen_udp_route ipset present",
    healthCheckBypassIpset: "xkeen_bypass ipset present",
    healthCheckPass: "ok",
    healthCheckFail: "fail",
    healthFetchFailed: "Failed to load health status",
    restartXrayBtn: "↻ xray",
    restartSingboxBtn: "↻ sing-box",
    restartSelfhealBtn: "↻ self-heal",
    restartSvcDone: "Restart done",
    restartSvcFailed: "Restart failed",
    logsSelectLabel: "Log",
    logsLinesLabel: "Lines",
    loadLogsBtn: "Load",
    logsLoadFailed: "Failed to load log",
    logsEmpty: "(log file is empty)",
    logsCopyBtn: "Copy",
    logsCopiedDone: "Copied",
    dedupDomainsRemoved: "Removed redundant domains: {n} (covered by a parent domain)",
    dedupCidrsRemoved: "Removed redundant IP/CIDR: {n} (covered by a broader network)",
    stackInfoFetchFailed: "Failed to load stack info",
    stackVersions: "Versions",
    stackXrayVer: "xray", stackSingboxVer: "sing-box", stackKernel: "kernel", stackUptime: "uptime",
    stackVpnSection: "VPN",
    stackVpnHost: "server", stackVpnExitIp: "exit IP", stackVpnSni: "Reality SNI",
    stackNetSection: "Network",
    stackWanIface: "WAN interface", stackWanIp: "WAN IP", stackGw: "default gateway", stackLan: "LAN net",
    stackXkeenSection: "xkeen",
    stackPolicy: "Keenetic policy", stackMark: "mark", stackTproxyPort: "TPROXY UDP", stackRedirectPort: "REDIRECT TCP", stackSsRelay: "SS-relay",
    stackRuntimeSection: "Runtime",
    stackSelfhealInterval: "self-heal interval", stackLogRotate: "log rotation", stackLogRotateValue: "once a day", stackBackupRetention: "backup retention", stackBackupRetentionValue: "last {n} files", stackFdThresh: "FD warn / critical",
    stackResourcesSection: "Resources",
    stackMem: "memory", stackDisk: "disk", stackConntrack: "conntrack", stackXrayFd: "xray FD",
    stackCopyHint: "Click to copy",
    toastSvcRestarting: "Restarting {svc}…",
    toastSvcRestarted: "{svc} restarted",
    toastSvcRestartFailed: "Failed to restart {svc}: {error}",
    toastRepairing: "Rebuilding runtime…",
    toastSavingState: "Saving profile…",
    toastSavingApplying: "Saving and applying…",
    toastProbing: "Probing {addr}:{port}…",
    toastInvalidDomains: "Removed non-domain entries: {list}",
    toastInvalidCidrs: "Removed non-IP/CIDR entries: {list}",
    ipsetUdpLabel: "UDP route ipset",
    ipsetBypassLabel: "Bypass ipset"
  }
};

let currentLang = localStorage.getItem(LANGUAGE_KEY) || "ru";
if (!LOCALES[currentLang]) currentLang = "ru";
let T = LOCALES[currentLang];
let AUTH_REQUIRED_MESSAGE = T.authRequiredMessage;
let AUTH_LOGIN_HINT = T.authLoginHint;

const debugState = { messages: [] };

const fallbackState = {
  activeProfileId: "profile-main",
  profiles: [
    {
      id: "profile-main",
      name: T.profileName,
      domainStrategy: "IPIfNonMatch",
      fallbackOutbound: "direct",
      proxyConfig: createDefaultProxyConfig(),
      muxConfig: createDefaultMuxConfig(),
      groups: [
        {
          id: "fallback-vpn",
          name: "VPN",
          note: T.fallbackNote,
          enabled: true,
          outboundTag: "vless-reality",
          domains: [],
          cidrs: []
        },
        {
          id: "fallback-bypass",
          name: T.bypassGroupName,
          note: "",
          enabled: true,
          outboundTag: "bypass",
          domains: [],
          cidrs: []
        }
      ]
    }
  ]
};

let state = null;
const SUBSCRIPTION_AUTO_REFRESH_DEFAULT_MIN = 360;
const SUBSCRIPTION_AUTO_REFRESH_MIN_MINUTES = 15;
const SUBSCRIPTION_AUTO_REFRESH_LOG_LIMIT = 60;
let subscriptionAutoRefreshTimer = null;
let subscriptionAutoRefreshInFlight = false;

const els = {
  authOverlay: document.getElementById("authOverlay"),
  authTitle: document.getElementById("authTitle"),
  authLead: document.getElementById("authLead"),
  authLoginLabel: document.getElementById("authLoginLabel"),
  authPasswordLabel: document.getElementById("authPasswordLabel"),
  authLogin: document.getElementById("authLogin"),
  authPassword: document.getElementById("authPassword"),
  authStatus: document.getElementById("authStatus"),
  authSubmitBtn: document.getElementById("authSubmitBtn"),
  langLabel: document.getElementById("langLabel"),
  langSelect: document.getElementById("langSelect"),
  heroTitle: document.getElementById("heroTitle"),
  heroLead: document.getElementById("heroLead"),
  profileKicker: document.getElementById("profileKicker"),
  profileTitle: document.getElementById("profileTitle"),
  activeProfileLabel: document.getElementById("activeProfileLabel"),
  profileNameLabel: document.getElementById("profileNameLabel"),
  activeProfile: document.getElementById("activeProfile"),
  profileName: document.getElementById("profileName"),
  domainStrategyLabel: document.getElementById("domainStrategyLabel"),
  domainStrategy: document.getElementById("domainStrategy"),
  fallbackLabel: document.getElementById("fallbackLabel"),
  fallbackOutbound: document.getElementById("fallbackOutbound"),
  proxyTitle: document.getElementById("proxyTitle"),
  proxyUrlLabel: document.getElementById("proxyUrlLabel"),
  proxyAddressLabel: document.getElementById("proxyAddressLabel"),
  proxyPortLabel: document.getElementById("proxyPortLabel"),
  proxyAddress: document.getElementById("proxyAddress"),
  proxyPort: document.getElementById("proxyPort"),
  proxyUuid: document.getElementById("proxyUuid"),
  proxyFlow: document.getElementById("proxyFlow"),
  proxyPublicKey: document.getElementById("proxyPublicKey"),
  proxyServerName: document.getElementById("proxyServerName"),
  proxyShortId: document.getElementById("proxyShortId"),
  proxyFingerprint: document.getElementById("proxyFingerprint"),
  muxKicker: document.getElementById("muxKicker"),
  muxTitle: document.getElementById("muxTitle"),
  muxSummary: document.getElementById("muxSummary"),
  muxModeLabel: document.getElementById("muxModeLabel"),
  muxMode: document.getElementById("muxMode"),
  muxUdp443Label: document.getElementById("muxUdp443Label"),
  muxUdp443: document.getElementById("muxUdp443"),
  muxXudpConcurrencyLabel: document.getElementById("muxXudpConcurrencyLabel"),
  muxXudpConcurrency: document.getElementById("muxXudpConcurrency"),
  proxyImportUrl: document.getElementById("proxyImportUrl"),
  importProxyBtn: document.getElementById("importProxyBtn"),
  probeProxyBtn: document.getElementById("probeProxyBtn"),
  proxyProbeStatus: document.getElementById("proxyProbeStatus"),
  addManualKeyBtn: document.getElementById("addManualKeyBtn"),
  addSubscriptionBtn: document.getElementById("addSubscriptionBtn"),
  subscriptionsList: document.getElementById("subscriptionsList"),
  subAutoRefreshEnabled: document.getElementById("subAutoRefreshEnabled"),
  subAutoRefreshInterval: document.getElementById("subAutoRefreshInterval"),
  subAutoRefreshLastRun: document.getElementById("subAutoRefreshLastRun"),
  subAutoRefreshLastSuccess: document.getElementById("subAutoRefreshLastSuccess"),
  subAutoRefreshLastError: document.getElementById("subAutoRefreshLastError"),
  subAutoRefreshLog: document.getElementById("subAutoRefreshLog"),
  manualKeysList: document.getElementById("manualKeysList"),
  activeProxyList: document.getElementById("activeProxyList"),
  manualKeyForm: document.getElementById("manualKeyForm"),
  manualKeyFormTitle: document.getElementById("manualKeyFormTitle"),
  manualKeyName: document.getElementById("manualKeyName"),
  saveManualKeyBtn: document.getElementById("saveManualKeyBtn"),
  cancelManualKeyBtn: document.getElementById("cancelManualKeyBtn"),
  subscriptionForm: document.getElementById("subscriptionForm"),
  newSubscriptionName: document.getElementById("newSubscriptionName"),
  newSubscriptionUrl: document.getElementById("newSubscriptionUrl"),
  subscriptionFormStatus: document.getElementById("subscriptionFormStatus"),
  saveSubscriptionBtn: document.getElementById("saveSubscriptionBtn"),
  cancelSubscriptionBtn: document.getElementById("cancelSubscriptionBtn"),
  previewKicker: document.getElementById("previewKicker"),
  previewTitle: document.getElementById("previewTitle"),
  groups: document.getElementById("groups"),
  stats: document.getElementById("stats"),
  preview: document.getElementById("routingPreview"),
  groupsKicker: document.getElementById("groupsKicker"),
  groupsTitle: document.getElementById("groupsTitle"),
  addGroupBtn: document.getElementById("addGroupBtn"),
  addProfileBtn: document.getElementById("addProfileBtn"),
  duplicateProfileBtn: document.getElementById("duplicateProfileBtn"),
  removeProfileBtn: document.getElementById("removeProfileBtn"),
  exportStateBtn: document.getElementById("exportStateBtn"),
  repairRuntimeBtn: document.getElementById("repairRuntimeBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  importStateBtn: document.getElementById("importStateBtn"),
  importStateInput: document.getElementById("importStateInput"),
  saveStateBtn: document.getElementById("saveStateBtn"),
  saveApplyBtn: document.getElementById("saveApplyBtn"),
  healthKicker: document.getElementById("healthKicker"),
  healthTitle: document.getElementById("healthTitle"),
  refreshHealthBtn: document.getElementById("refreshHealthBtn"),
  healthBadges: document.getElementById("healthBadges"),
  exitIpRow: document.getElementById("exitIpRow"),
  healthChecks: document.getElementById("healthChecks"),
  stackInfo: document.getElementById("stackInfo"),
  restartXrayBtn: document.getElementById("restartXrayBtn"),
  restartSingboxBtn: document.getElementById("restartSingboxBtn"),
  restartSelfhealBtn: document.getElementById("restartSelfhealBtn"),
  logsSelectLabel: document.getElementById("logsSelectLabel"),
  logsSelect: document.getElementById("logsSelect"),
  logsLinesLabel: document.getElementById("logsLinesLabel"),
  logsLinesSelect: document.getElementById("logsLinesSelect"),
  loadLogsBtn: document.getElementById("loadLogsBtn"),
  logsPreview: document.getElementById("logsPreview"),
  logsPreviewWrap: document.getElementById("logsPreviewWrap"),
  logsCopyBtn: document.getElementById("logsCopyBtn")
};

window.addEventListener("error", (event) => {
  pushDebug(`window.error: ${event.message}`);
});

window.addEventListener("unhandledrejection", (event) => {
  pushDebug(`unhandledrejection: ${String(event.reason)}`);
});

bindTopLevel();
setupPanelCollapse();
bootstrap();

function setupPanelCollapse() {
  const panels = document.querySelectorAll(".panel");
  panels.forEach((panel, idx) => {
    const header = panel.querySelector(".panel-header");
    if (!header) return;
    if (header.querySelector(".panel-collapse-toggle")) return;
    const id = panel.dataset.panelId || `panel-${idx}`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "panel-collapse-toggle";
    btn.setAttribute("aria-expanded", "true");
    header.insertBefore(btn, header.firstChild);
    const saved = localStorage.getItem(`panel-collapsed-${id}`);
    btn.setAttribute("aria-label", "Свернуть/развернуть");
    const apply = (collapsed) => {
      panel.classList.toggle("collapsed", collapsed);
      btn.setAttribute("aria-expanded", String(!collapsed));
    };
    apply(saved === "1");
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const next = !panel.classList.contains("collapsed");
      apply(next);
      localStorage.setItem(`panel-collapsed-${id}`, next ? "1" : "0");
    });
  });
}

async function bootstrap() {
  try {
    state = await loadRemoteState();
    ensureAutoRefreshState();
    await hydrateProxyConfigFromRemote();
    pushDebug(`loaded live state: profiles=${state.profiles.length}, activeGroups=${getActiveProfile()?.groups?.length ?? 0}`);
    hideAuthOverlay();
    persistAndRender();
    renderHealth().catch(() => {});
    renderStackInfo().catch(() => {});
    startExitIpCheck();
    runSubscriptionAutoRefreshCycle("bootstrap").catch((error) => {
      appendAutoRefreshLog("error", `bootstrap cycle failed: ${error.message || error}`);
      persistState();
      scheduleSubscriptionAutoRefresh();
    });
  } catch (error) {
    pushDebug(`bootstrap failed: ${error.message}`);
    if (isAuthError(error)) {
      state = cloneFallback();
      render();
      showAuthOverlay(T.authLoginHint);
      return;
    }
    const saved = loadState();
    if (saved) {
      const savedProfile = (saved.profiles || []).find((profile) => profile.id === saved.activeProfileId) || saved.profiles?.[0];
      pushDebug(`loaded from localStorage after live failure: profiles=${saved.profiles?.length ?? 0}, activeGroups=${savedProfile?.groups?.length ?? 0}`);
      state = saved;
      render();
      return;
    }

    state = cloneFallback();
    persistAndRender();
  }
}

function bindTopLevel() {
  if (els.langSelect) {
    els.langSelect.value = currentLang;
    els.langSelect.addEventListener("change", () => {
      currentLang = LOCALES[els.langSelect.value] ? els.langSelect.value : "ru";
      localStorage.setItem(LANGUAGE_KEY, currentLang);
      T = LOCALES[currentLang];
      AUTH_REQUIRED_MESSAGE = T.authRequiredMessage;
      AUTH_LOGIN_HINT = T.authLoginHint;
      render();
    });
  }

  els.authSubmitBtn.addEventListener("click", async () => {
    const previous = els.authSubmitBtn.textContent;
    els.authSubmitBtn.disabled = true;
    els.authSubmitBtn.textContent = T.authSubmitting;
    els.authSubmitBtn.textContent = "Вход...";
    els.authSubmitBtn.textContent = T.authSubmitting;
    setAuthStatus("info", "");
    try {
      await loginToRouter(els.authLogin.value, els.authPassword.value);
      els.authPassword.value = "";
      await bootstrap();
    } catch (error) {
      showAuthOverlay(error.message || T.invalidLogin);
      setAuthStatus("error", error.message || T.invalidLogin);
    } finally {
      els.authSubmitBtn.disabled = false;
      els.authSubmitBtn.textContent = previous;
    }
  });

  els.authPassword.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      els.authSubmitBtn.click();
    }
  });

  els.authLogin.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      els.authSubmitBtn.click();
    }
  });

  els.importStateBtn.title = T.importStateTitle;
  els.exportStateBtn.title = T.exportStateTitle;
  els.saveStateBtn.title = T.saveStateTitle;
  els.saveApplyBtn.title = T.saveApplyTitle;
  els.repairRuntimeBtn.title = T.repairTitle;
  els.importProxyBtn.title = T.importProxyTitle;
  els.probeProxyBtn.title = T.probeProxyTitle;
  els.logoutBtn.title = T.logoutTitle;

  els.logoutBtn.addEventListener("click", async () => {
    try {
      await logoutFromRouter();
    } catch (error) {
      pushDebug(`logout failed: ${error.message}`);
    }
    state = cloneFallback();
    render();
    showAuthOverlay(T.logoutDone);
  });

  els.activeProfile.addEventListener("change", () => {
    state.activeProfileId = els.activeProfile.value;
    persistAndRender();
    scheduleSubscriptionAutoRefresh();
    runSubscriptionAutoRefreshCycle("profile-switch").catch((error) => {
      appendAutoRefreshLog("error", `profile-switch cycle failed: ${error.message || error}`);
      persistState();
      scheduleSubscriptionAutoRefresh();
    });
  });

  els.profileName.addEventListener("input", () => {
    const profile = getActiveProfile();
    if (!profile) return;
    profile.name = els.profileName.value;
    persistState();
    renderProfiles();
    els.activeProfile.value = state.activeProfileId || "";
  });

  els.domainStrategy.addEventListener("change", () => {
    const profile = getActiveProfile();
    if (!profile) return;
    profile.domainStrategy = els.domainStrategy.value;
    persistState();
    renderPreview();
  });

  els.fallbackOutbound.addEventListener("change", () => {
    const profile = getActiveProfile();
    if (!profile) return;
    profile.fallbackOutbound = els.fallbackOutbound.value;
    persistState();
    renderPreview();
  });

  bindProxyField(els.proxyAddress, "address");
  bindProxyField(els.proxyPort, "port", (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : "";
  });
  bindProxyField(els.proxyUuid, "uuid");
  bindProxyField(els.proxyFlow, "flow");
  bindProxyField(els.proxyPublicKey, "publicKey");
  bindProxyField(els.proxyServerName, "serverName");
  bindProxyField(els.proxyShortId, "shortId");
  bindProxyField(els.proxyFingerprint, "fingerprint");
  bindMuxField(els.muxMode, "mode");
  bindMuxField(els.muxUdp443, "xudpProxyUDP443");
  bindMuxField(els.muxXudpConcurrency, "xudpConcurrency", (value) => clampInt(value, 8, 1, 1024));

  els.importProxyBtn.addEventListener("click", () => {
    const raw = (els.proxyImportUrl.value || "").trim();
    const profile = getActiveProfile();
    if (!profile) return;

    // Multi-protocol: vmess and hysteria2 don't fit the legacy "fill form
    // fields" flow (their schemas differ), so we add them directly as a
    // proxy entry and close the form.
    let parsed = null;
    if (/^(hysteria2|hy2):\/\//i.test(raw)) parsed = parseHysteria2Uri(raw);
    else if (/^vmess:\/\//i.test(raw)) parsed = parseVmessUri(raw);

    if (parsed) {
      if (!parsed.ok) {
        setProbeStatus("error", `Ошибка импорта: ${parsed.error}`);
        return;
      }
      const newProxy = {
        id: `proxy-${newId()}`,
        name: (els.manualKeyName?.value || "").trim() || parsed.config.name || parsed.config.address,
        source: "manual",
        config: parsed.config
      };
      profile.proxies = profile.proxies || [];
      profile.proxies.push(newProxy);
      if (!profile.activeProxyId) profile.activeProxyId = newProxy.id;
      closeManualKeyForm();
      persistState();
      renderProxiesPanel(profile);
      return;
    }

    // Legacy vless flow: populate the form fields so the user can review.
    try {
      const fromForm = parseVlessUrl(raw);
      profile.proxyConfig = {
        ...normalizeProxyConfig(profile.proxyConfig),
        ...fromForm
      };
      persistState();
      renderProxyConfig(profile);
      queueMicrotask(() => setProbeStatus("success", T.loginImported));
      setProbeStatus("success", "VLESS URL импортирован");
    } catch (error) {
      setProbeStatus("error", `Ошибка импорта: ${error.message}`);
    }
  });

  els.probeProxyBtn.addEventListener("click", async () => {
    const profile = getActiveProfile();
    if (!profile) return;
    const config = getActiveProxyConfig(profile);
    const toast = showToast(formatMessage(T.toastProbing || "Проверка {addr}:{port}...", { addr: config.address, port: config.port }), { kind: "progress" });
    try {
      const probe = await probeProxy(config);
      if (probe.ok) {
        const ipPart = probe.resolvedIp ? `, IP ${probe.resolvedIp}` : "";
        toast.update(formatMessage(T.probeAvailable, { address: probe.address, port: probe.port, ipPart }), "success");
      } else {
        toast.update(probe.error || T.probeFailed, "error");
      }
    } catch (error) {
      toast.update(`${T.probeError}: ${error.message}`, "error");
    }
  });

  // --- Multi-key UI wiring ---

  if (els.addManualKeyBtn) {
    els.addManualKeyBtn.addEventListener("click", () => openManualKeyForm(null));
  }
  if (els.addSubscriptionBtn) {
    els.addSubscriptionBtn.addEventListener("click", () => openSubscriptionForm());
  }
  if (els.cancelManualKeyBtn) {
    els.cancelManualKeyBtn.addEventListener("click", () => closeManualKeyForm());
  }
  if (els.saveManualKeyBtn) {
    els.saveManualKeyBtn.addEventListener("click", () => saveManualKey());
  }
  if (els.cancelSubscriptionBtn) {
    els.cancelSubscriptionBtn.addEventListener("click", () => closeSubscriptionForm());
  }
  if (els.saveSubscriptionBtn) {
    els.saveSubscriptionBtn.addEventListener("click", () => saveSubscription());
  }

  if (els.subAutoRefreshEnabled) {
    els.subAutoRefreshEnabled.addEventListener("change", () => {
      ensureAutoRefreshState();
      state.subscriptionAutoRefresh.enabled = !!els.subAutoRefreshEnabled.checked;
      appendAutoRefreshLog("info", `auto-refresh ${state.subscriptionAutoRefresh.enabled ? "enabled" : "disabled"} from UI`);
      persistState();
      scheduleSubscriptionAutoRefresh();
      renderAutoRefreshPanel();
    });
  }

  if (els.subAutoRefreshInterval) {
    const applyInterval = () => {
      ensureAutoRefreshState();
      const intervalMin = clampInt(
        Number(els.subAutoRefreshInterval.value),
        state.subscriptionAutoRefresh.intervalMin,
        SUBSCRIPTION_AUTO_REFRESH_MIN_MINUTES,
        24 * 60
      );
      state.subscriptionAutoRefresh.intervalMin = intervalMin;
      els.subAutoRefreshInterval.value = String(intervalMin);
      appendAutoRefreshLog("info", `interval updated from UI: ${intervalMin} min`);
      persistState();
      scheduleSubscriptionAutoRefresh();
      renderAutoRefreshPanel();
    };
    els.subAutoRefreshInterval.addEventListener("change", applyInterval);
    els.subAutoRefreshInterval.addEventListener("blur", applyInterval);
  }

  if (els.subscriptionsList) {
    els.subscriptionsList.addEventListener("click", (event) => {
      const btn = event.target.closest("button[data-act]");
      if (!btn) return;
      const id = btn.dataset.id;
      switch (btn.dataset.act) {
        case "refresh-sub": refreshSubscription(id); break;
        case "delete-sub":  deleteSubscription(id); break;
        case "reveal-sub":  toggleRevealSub(id); break;
        case "copy-sub":    copySubUrl(id); break;
      }
    });
  }

  if (els.manualKeysList) {
    els.manualKeysList.addEventListener("click", (event) => {
      const btn = event.target.closest("button[data-act]");
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.dataset.act === "edit-proxy") openManualKeyForm(id);
      else if (btn.dataset.act === "delete-proxy") deleteProxy(id);
    });
  }

  if (els.activeProxyList) {
    els.activeProxyList.addEventListener("click", (event) => {
      const row = event.target.closest(".active-row");
      if (!row) return;
      const proxyId = row.dataset.proxyId;
      if (proxyId) setActiveProxy(proxyId);
    });
  }

  els.addGroupBtn.addEventListener("click", () => {
    const profile = getActiveProfile();
    if (!profile) return;
    profile.groups.unshift(createEmptyGroup());
    persistAndRender();
  });

  els.addProfileBtn.addEventListener("click", () => {
    const profile = createEmptyProfile(T.profileAdded);
    state.profiles.push(profile);
    state.activeProfileId = profile.id;
    persistAndRender();
  });

  els.duplicateProfileBtn.addEventListener("click", () => {
    const profile = getActiveProfile();
    if (!profile) return;
    const copy = cloneProfile(profile);
    copy.id = newId();
    copy.name = `${profile.name || T.defaultProfileName}${T.profileCopySuffix}`;
    copy.groups = copy.groups.map((group) => ({ ...group, id: newId() }));
    state.profiles.push(copy);
    state.activeProfileId = copy.id;
    persistAndRender();
  });

  els.removeProfileBtn.addEventListener("click", () => {
    if ((state.profiles || []).length <= 1) {
      alert(T.needOneProfile);
      return;
    }
    state.profiles = state.profiles.filter((profile) => profile.id !== state.activeProfileId);
    state.activeProfileId = state.profiles[0].id;
    persistAndRender();
  });

  els.exportStateBtn.addEventListener("click", () => {
    const profile = getActiveProfile();
    downloadJson(`${slugify(profile?.name || "xkeen")}-state.json`, state);
  });

  if (els.refreshHealthBtn) {
    els.refreshHealthBtn.addEventListener("click", () => {
      renderHealth().catch(() => {});
      renderStackInfo().catch(() => {});
    });
  }
  for (const [btn, svc, label] of [
    [els.restartXrayBtn, "xray", "xray"],
    [els.restartSingboxBtn, "singbox", "sing-box"],
    [els.restartSelfhealBtn, "selfheal", "self-heal"]
  ]) {
    if (!btn) continue;
    btn.title = formatMessage(T.toastSvcRestarting || "Restart {svc}", { svc: label });
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      const toast = showToast(formatMessage(T.toastSvcRestarting || "Перезапуск {svc}...", { svc: label }), { kind: "progress" });
      try {
        await restartService(svc);
        toast.update(formatMessage(T.toastSvcRestarted || "{svc} перезапущен", { svc: label }), "success");
        await renderHealth().catch(() => {});
        await renderStackInfo().catch(() => {});
      } catch (error) {
        toast.update(formatMessage(T.toastSvcRestartFailed || "Ошибка перезапуска {svc}: {error}", { svc: label, error: error.message }), "error");
      } finally {
        btn.disabled = false;
      }
    });
  }
  if (els.logsCopyBtn) {
    els.logsCopyBtn.addEventListener("click", async () => {
      const text = els.logsPreview ? (els.logsPreview.textContent || "") : "";
      if (!text.trim()) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        const previous = els.logsCopyBtn.textContent;
        els.logsCopyBtn.classList.add("copied");
        els.logsCopyBtn.textContent = T.logsCopiedDone || "Скопировано";
        setTimeout(() => {
          els.logsCopyBtn.classList.remove("copied");
          els.logsCopyBtn.textContent = previous;
        }, 1500);
      } catch (_e) {
        /* noop */
      }
    });
  }
  if (els.loadLogsBtn) {
    els.loadLogsBtn.addEventListener("click", async () => {
      const svc = els.logsSelect ? els.logsSelect.value : "selfheal";
      const lines = els.logsLinesSelect ? els.logsLinesSelect.value : "100";
      els.loadLogsBtn.disabled = true;
      const previous = els.loadLogsBtn.textContent;
      els.loadLogsBtn.textContent = `${previous}...`;
      try {
        const text = await fetchLogs(svc, lines);
        els.logsPreview.textContent = text && text.trim() ? text : T.logsEmpty;
        if (els.logsPreviewWrap) els.logsPreviewWrap.hidden = false;
      } catch (error) {
        els.logsPreview.textContent = `${T.logsLoadFailed}: ${error.message}`;
        if (els.logsPreviewWrap) els.logsPreviewWrap.hidden = false;
      } finally {
        els.loadLogsBtn.textContent = previous;
        els.loadLogsBtn.disabled = false;
      }
    });
  }

  els.repairRuntimeBtn.addEventListener("click", async () => {
    els.repairRuntimeBtn.disabled = true;
    const toast = showToast(T.toastRepairing || "Перестройка runtime...", { kind: "progress" });
    try {
      await repairRemoteRuntime();
      toast.update(T.repairDone, "success");
      await renderHealth().catch(() => {});
      await renderStackInfo().catch(() => {});
    } catch (error) {
      if (isAuthError(error)) showAuthOverlay(AUTH_LOGIN_HINT);
      toast.update(`${T.repairFailed}: ${error.message}`, "error");
    } finally {
      els.repairRuntimeBtn.disabled = false;
    }
  });

  els.importStateBtn.addEventListener("click", () => els.importStateInput.click());

  els.importStateInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    state = normalizeState(JSON.parse(text));
    pushDebug(`imported state: profiles=${state.profiles.length}, activeGroups=${getActiveProfile()?.groups?.length ?? 0}`);
    persistAndRender();
    event.target.value = "";
  });

  els.saveStateBtn.addEventListener("click", async () => {
    els.saveStateBtn.disabled = true;
    const toast = showToast(T.toastSavingState || "Сохранение профиля...", { kind: "progress" });
    try {
      await saveRemoteState();
      persistState();
      toast.update(T.saveStateDone, "success");
    } catch (error) {
      if (isAuthError(error)) showAuthOverlay(AUTH_LOGIN_HINT);
      toast.update(`${T.saveStateFailed}: ${error.message}`, "error");
    } finally {
      els.saveStateBtn.disabled = false;
    }
  });

  els.saveApplyBtn.addEventListener("click", async () => {
    els.saveApplyBtn.disabled = true;
    const toast = showToast(T.toastSavingApplying || "Сохранение и применение...", { kind: "progress" });
    try {
      await saveRemoteState();
      await saveRemoteOutbounds();
      await saveRemoteSingbox();
      const routingResponse = await fetch(LIVE_ROUTING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(buildRoutingDocument(getActiveProfile()))
      });
      const routingPayload = await routingResponse.json();
      if (!routingResponse.ok || routingPayload.ok === false) {
        throw new Error(routingResponse.status === 401 ? AUTH_REQUIRED_MESSAGE : (routingPayload.error || `HTTP ${routingResponse.status}`));
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      toast.update(T.saveApplyDone, "success");
      await renderHealth().catch(() => {});
      await renderStackInfo().catch(() => {});
    } catch (error) {
      if (isAuthError(error)) showAuthOverlay(AUTH_LOGIN_HINT);
      toast.update(`${T.saveApplyFailed}: ${error.message}`, "error");
    } finally {
      els.saveApplyBtn.disabled = false;
    }
  });
}

async function saveRemoteState() {
  const stateResponse = await fetch(STATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(state)
  });
  const statePayload = await stateResponse.json();
  if (!stateResponse.ok || statePayload.ok === false) {
    throw new Error(stateResponse.status === 401 ? AUTH_REQUIRED_MESSAGE : (statePayload.error || `HTTP ${stateResponse.status}`));
  }
}

async function saveRemoteOutbounds() {
  const profile = getActiveProfile();
  if (!profile) throw new Error("active profile missing");
  const outboundsResponse = await fetch(OUTBOUNDS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(buildOutboundsDocument(profile))
  });
  const outboundsPayload = await outboundsResponse.json();
  if (!outboundsResponse.ok || outboundsPayload.ok === false) {
    throw new Error(outboundsResponse.status === 401 ? AUTH_REQUIRED_MESSAGE : (outboundsPayload.error || `HTTP ${outboundsResponse.status}`));
  }
}

async function saveRemoteSingbox() {
  const profile = getActiveProfile();
  if (!profile) throw new Error("active profile missing");
  const response = await fetch(SINGBOX_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(buildSingboxDocument(profile))
  });
  const payload = await response.json();
  if (!response.ok || payload.ok === false) {
    throw new Error(response.status === 401 ? AUTH_REQUIRED_MESSAGE : (payload.error || `HTTP ${response.status}`));
  }
}

async function repairRemoteRuntime() {
  const response = await fetch(REPAIR_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: "{}"
  });
  const payload = await response.json();
  if (!response.ok || payload.ok === false) {
    throw new Error(response.status === 401 ? AUTH_REQUIRED_MESSAGE : (payload.error || `HTTP ${response.status}`));
  }
}

function healthSeverity(status) {
  if (!status || status === "ok") return "ok";
  if (status.endsWith("_critical") || status === "xray_down") return "critical";
  if (status.endsWith("_warn")) return "warn";
  return "ok";
}

function fdSeverity(fd, limit) {
  if (!fd || !limit) return "ok";
  if (fd >= 600) return "critical";
  if (fd >= 400) return "warn";
  return "ok";
}

function ctSeverity(count, max) {
  if (!max) return "ok";
  const pct = (count / max) * 100;
  if (pct >= 95) return "critical";
  if (pct >= 85) return "warn";
  return "ok";
}

function vpnSeverity(established, finWait, orphanFin) {
  if (orphanFin >= 30 || finWait >= 50) return "critical";
  if (orphanFin >= 20 || finWait >= 20) return "warn";
  if (established === 0) return "warn";
  return "ok";
}

function severityClass(sev) {
  if (sev === "critical") return "health-bad";
  if (sev === "warn") return "health-warn";
  return "health-ok";
}

async function renderHealth() {
  if (!els.healthBadges || !els.healthChecks) return;
  els.healthBadges.innerHTML = '<div class="health-loading">…</div>';
  els.healthChecks.innerHTML = "";
  let payload;
  try {
    payload = await fetchHealth();
  } catch (error) {
    els.healthBadges.innerHTML = `<div class="health-error">${escapeHtml(T.healthFetchFailed)}: ${escapeHtml(error.message)}</div>`;
    return;
  }
  const services = payload.services || {};
  const checks = payload.checks || {};
  const sizes = payload.ipsetSize || {};
  const fd = payload.xrayFd || {};
  const ct = payload.conntrack || {};
  const vpn = payload.vpnTunnel || {};
  const overallStatus = payload.healthStatus || "ok";
  const overallSev = healthSeverity(overallStatus);

  // Overall status banner (only shown when not ok)
  let bannerHtml = "";
  if (overallSev !== "ok") {
    const bannerClass = overallSev === "critical" ? "health-banner-critical" : "health-banner-warn";
    bannerHtml = `<div class="health-banner ${bannerClass}"><span class="health-banner-icon">${overallSev === "critical" ? "✗" : "!"}</span> ${escapeHtml(overallStatus)}</div>`;
  }

  // Service badges
  const fdSev = fdSeverity(fd.count, fd.limit);
  const fdLabel = fd.limit ? `FD ${fd.count}/${fd.limit}` : "";

  const badges = [
    { name: "xray", svc: services.xray, sev: services.xray?.running ? (fdSev !== "ok" ? fdSev : "ok") : "critical", extras: [
      services.xray?.listenTcp ? "tcp 61219" : null,
      services.xray?.listenRelayUdp ? "relay 62640" : null,
      fdLabel || null
    ] },
    { name: "sing-box", svc: services.singbox, sev: services.singbox?.running ? "ok" : "critical", extras: [
      services.singbox?.listenUdp ? "udp 61221" : null
    ] },
    { name: "self-heal", svc: services.selfheal, sev: services.selfheal?.running ? "ok" : "critical", extras: [] }
  ];

  const badgesHtml = badges.map((item) => {
    if (!item.svc) {
      return `<div class="health-badge health-bad"><span class="health-dot" aria-hidden="true"></span><span class="health-text"><span class="health-name">${escapeHtml(item.name)}</span><span class="health-status">?</span></span></div>`;
    }
    const cls = severityClass(item.sev);
    const status = item.svc.running ? T.healthRunning : T.healthStopped;
    const pid = item.svc.pid ? `<span class="health-pid">pid ${escapeHtml(String(item.svc.pid))}</span>` : "";
    const extras = item.extras.filter(Boolean).map((x) => `<span class="health-extra">${escapeHtml(x)}</span>`).join("");
    return `<div class="health-badge ${cls}">
      <span class="health-dot" aria-hidden="true"></span>
      <span class="health-text">
        <span class="health-name">${escapeHtml(item.name)}</span>
        <span class="health-status">${escapeHtml(status)}</span>
      </span>
      ${pid}
      ${extras ? `<span class="health-extra">${extras}</span>` : ""}
    </div>`;
  }).join("");

  // VPN tunnel block
  const vpnSev = vpnSeverity(vpn.established || 0, vpn.finWait || 0, vpn.orphanFin || 0);
  const vpnCls = severityClass(vpnSev);
  const vpnHtml = `<div class="health-badge ${vpnCls}">
    <span class="health-dot" aria-hidden="true"></span>
    <span class="health-text">
      <span class="health-name">VPN tunnel</span>
      <span class="health-status">${escapeHtml(vpn.host || "—")}</span>
    </span>
    <span class="health-extra health-metric ${vpn.established > 0 ? "" : "metric-warn"}">upstream TCP: ${vpn.established || 0}</span>
    ${(vpn.finWait || 0) > 0 ? `<span class="health-extra health-metric ${(vpn.finWait || 0) >= 20 ? "metric-warn" : ""}">FIN_WAIT: ${vpn.finWait}</span>` : ""}
    ${(vpn.orphanFin || 0) > 0 ? `<span class="health-extra health-metric ${(vpn.orphanFin || 0) >= 20 ? "metric-crit" : ""}">orphan FIN: ${vpn.orphanFin}</span>` : ""}
  </div>`;

  // Conntrack block
  const ctSev = ctSeverity(ct.count || 0, ct.max || 0);
  const ctCls = severityClass(ctSev);
  const ctPct = ct.max ? Math.round((ct.count / ct.max) * 100) : null;
  const ctHtml = `<div class="health-badge ${ctCls}">
    <span class="health-dot" aria-hidden="true"></span>
    <span class="health-text">
      <span class="health-name">conntrack</span>
      <span class="health-status">${ct.count || 0}${ct.max ? ` / ${ct.max}` : ""}</span>
    </span>
    ${ctPct !== null ? `<span class="health-extra">${ctPct}%</span>` : ""}
  </div>`;

  els.healthBadges.innerHTML = bannerHtml + badgesHtml + vpnHtml + ctHtml;

  const checkRows = [
    { label: T.healthCheckTproxy, ok: checks.tproxyRuleAtEnd },
    { label: T.healthCheckIpRule, ok: checks.ipRuleMasked },
    { label: T.healthCheckUdpIpset, ok: checks.udpIpsetExists, extra: sizes.udpRoute != null ? `${sizes.udpRoute} ${T.cidrShort}` : null },
    { label: T.healthCheckBypassIpset, ok: checks.bypassIpsetExists, extra: sizes.bypass != null ? `${sizes.bypass} ${T.cidrShort}` : null }
  ];
  els.healthChecks.innerHTML = checkRows.map((row) => {
    const okClass = row.ok ? "check-ok" : "check-bad";
    const okText = row.ok ? T.healthCheckPass : T.healthCheckFail;
    const extra = row.extra ? escapeHtml(row.extra) : "";
    return `<div class="check-row ${okClass}"><span class="check-mark">${row.ok ? "✓" : "✗"}</span><span class="check-label">${escapeHtml(row.label)}</span><span class="check-extra">${extra}</span><span class="check-status">${escapeHtml(okText)}</span></div>`;
  }).join("");
}

// Exit IP check — runs every 60s, logs last 20 results
const EXIT_IP_LOG = [];
const EXIT_IP_MAX_LOG = 20;
let exitIpTimer = null;
let lastKnownVpnIp = null;

async function checkExitIp() {
  if (!els.exitIpRow) return;
  const ts = new Date().toLocaleTimeString();
  let ip = null;
  let err = null;
  try {
    const res = await fetch("https://api.ipify.org?format=json", { cache: "no-cache", signal: AbortSignal.timeout(8000) });
    const json = await res.json();
    ip = json.ip || null;
  } catch (e) {
    err = e.message || "timeout";
  }

  // Resolve VPN server IP from stack-info cache if available
  if (!lastKnownVpnIp) {
    try {
      const si = await fetch(STACK_INFO_URL, { cache: "no-store" }).then(r => r.json());
      lastKnownVpnIp = si?.vpn?.exitIp || null;
    } catch (_) {}
  }

  const entry = { ts, ip, err };
  EXIT_IP_LOG.unshift(entry);
  if (EXIT_IP_LOG.length > EXIT_IP_MAX_LOG) EXIT_IP_LOG.pop();

  renderExitIpRow();
}

function renderExitIpRow() {
  if (!els.exitIpRow) return;
  const latest = EXIT_IP_LOG[0];
  if (!latest) { els.exitIpRow.innerHTML = ""; return; }

  const isVpn = lastKnownVpnIp && latest.ip && latest.ip === lastKnownVpnIp;
  const isErr = !!latest.err;
  const isDirect = !isErr && !isVpn && lastKnownVpnIp;

  const statusCls = isErr ? "exit-ip-err" : isVpn ? "exit-ip-vpn" : isDirect ? "exit-ip-direct" : "exit-ip-unknown";
  const statusIcon = isErr ? "✗" : isVpn ? "✓" : isDirect ? "!" : "?";
  const statusText = isErr ? `ошибка: ${latest.err}` : isVpn ? `VPN (${latest.ip})` : isDirect ? `прямой (${latest.ip}) — добавь api.ipify.org в VPN-группу` : (latest.ip || "—");

  const logRows = EXIT_IP_LOG.map((e, i) => {
    const cls = e.err ? "exit-log-err" : (lastKnownVpnIp && e.ip === lastKnownVpnIp) ? "exit-log-vpn" : (lastKnownVpnIp && e.ip) ? "exit-log-direct" : "";
    const dot = e.err ? "✗" : (lastKnownVpnIp && e.ip === lastKnownVpnIp) ? "✓" : "!";
    return `<div class="exit-log-row ${cls}"><span class="exit-log-dot">${dot}</span><span class="exit-log-ts">${escapeHtml(e.ts)}</span><span class="exit-log-ip">${escapeHtml(e.ip || e.err || "—")}</span></div>`;
  }).join("");

  els.exitIpRow.innerHTML = `
    <div class="exit-ip-header">
      <div class="exit-ip-current ${statusCls}">
        <span class="exit-ip-icon">${statusIcon}</span>
        <span class="exit-ip-label">exit IP</span>
        <span class="exit-ip-value">${escapeHtml(statusText)}</span>
        <span class="exit-ip-time">${escapeHtml(latest.ts)}</span>
      </div>
      ${lastKnownVpnIp ? `<span class="exit-ip-expected">VPN: ${escapeHtml(lastKnownVpnIp)}</span>` : ""}
    </div>
    ${EXIT_IP_LOG.length > 1 ? `<div class="exit-ip-log">${logRows}</div>` : ""}
  `;
}

function startExitIpCheck() {
  checkExitIp();
  exitIpTimer = setInterval(checkExitIp, 60000);
}

async function fetchStackInfo() {
  const response = await fetch(STACK_INFO_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(response.status === 401 ? AUTH_REQUIRED_MESSAGE : `HTTP ${response.status}`);
  }
  return response.json();
}

const toastState = { container: null, nextId: 0, items: new Map() };

function ensureToastContainer() {
  if (toastState.container && document.body.contains(toastState.container)) return toastState.container;
  const el = document.createElement("div");
  el.className = "toast-container";
  document.body.appendChild(el);
  toastState.container = el;
  return el;
}

function showToast(text, opts) {
  opts = opts || {};
  const kind = opts.kind || "info";
  const id = ++toastState.nextId;
  const persistent = kind === "progress" || opts.persistent === true;
  const ttl = opts.ttl != null ? opts.ttl : 3200;

  const container = ensureToastContainer();
  const node = document.createElement("div");
  node.className = `toast toast-${kind}`;
  node.innerHTML = `<span class="toast-icon" aria-hidden="true"></span><span class="toast-text"></span>`;
  node.querySelector(".toast-text").textContent = text;
  container.appendChild(node);

  let timer;
  let currentKind = kind;
  const dismiss = () => {
    if (timer) clearTimeout(timer);
    node.classList.add("toast-dismissing");
    setTimeout(() => { node.remove(); toastState.items.delete(id); }, 220);
  };
  const handle = {
    id,
    update(newText, newKind) {
      if (newText != null) node.querySelector(".toast-text").textContent = newText;
      if (newKind && newKind !== currentKind) {
        node.classList.remove(`toast-${currentKind}`);
        node.classList.add(`toast-${newKind}`);
        currentKind = newKind;
        if (newKind !== "progress") {
          if (timer) clearTimeout(timer);
          timer = setTimeout(dismiss, ttl);
        }
      }
    },
    dismiss
  };
  toastState.items.set(id, handle);
  if (!persistent) timer = setTimeout(dismiss, ttl);
  node.addEventListener("click", dismiss);
  return handle;
}

function fmtUptime(sec) {
  if (!sec || sec < 0) return "—";
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function fmtBytesKb(kb) {
  if (!kb || kb <= 0) return "—";
  if (kb >= 1024 * 1024) return `${(kb / 1024 / 1024).toFixed(1)} GB`;
  if (kb >= 1024) return `${(kb / 1024).toFixed(0)} MB`;
  return `${kb} KB`;
}
function fmtKbPair(used, total) {
  if (!total || total <= 0) return "—";
  if (total >= 1024 * 1024) return `${(used / 1024 / 1024).toFixed(1)} / ${(total / 1024 / 1024).toFixed(1)} GB`;
  if (total >= 1024) return `${Math.round(used / 1024)} / ${Math.round(total / 1024)} MB`;
  return `${used} / ${total} KB`;
}

async function renderStackInfo() {
  if (!els.stackInfo) return;
  let payload;
  try {
    payload = await fetchStackInfo();
  } catch (error) {
    els.stackInfo.innerHTML = `<div class="health-error">${escapeHtml(T.stackInfoFetchFailed || "Failed to load stack info")}: ${escapeHtml(error.message)}</div>`;
    return;
  }
  const v = payload.versions || {};
  const vpn = payload.vpn || {};
  const net = payload.network || {};
  const xk = payload.xkeen || {};
  const rt = payload.runtime || {};
  const r = payload.resources || {};

  const policyLabel = xk.policyDescription
    ? `${xk.policyName || "?"} · ${xk.policyDescription}`
    : (xk.policyName || "—");
  const memTxt = (r.memAvailKb && r.memTotalKb)
    ? fmtKbPair(r.memTotalKb - r.memAvailKb, r.memTotalKb)
    : "—";
  const diskTxt = (r.diskAvailKb && r.diskTotalKb)
    ? fmtKbPair(r.diskUsedKb || 0, r.diskTotalKb)
    : "—";
  const ctTxt = r.conntrackMax ? `${r.conntrackCount} / ${r.conntrackMax}` : "—";
  const fdTxt = r.xrayFdLimit ? `${r.xrayFd} / ${r.xrayFdLimit}` : "—";

  const sections = [
    {
      title: T.stackVersions || "Версии",
      rows: [
        [T.stackXrayVer || "xray", v.xray || "—"],
        [T.stackSingboxVer || "sing-box", v.singbox || "—"],
        [T.stackKernel || "ядро", `${v.kernel || ""} (${v.hostname || ""})`.trim()],
        [T.stackUptime || "uptime", fmtUptime(v.uptimeSec)]
      ]
    },
    {
      title: T.stackVpnSection || "VPN",
      rows: [
        [T.stackVpnHost || "сервер", vpn.host ? `${vpn.host}:${vpn.port}` : "—"],
        [T.stackVpnExitIp || "exit IP", vpn.exitIp || "—"],
        [T.stackVpnSni || "Reality SNI", vpn.sni || "—"]
      ]
    },
    {
      title: T.stackNetSection || "Сеть",
      rows: [
        [T.stackWanIface || "WAN-интерфейс", net.wanIface || "—"],
        [T.stackWanIp || "WAN IP", net.wanIp || "—"],
        [T.stackGw || "Default gateway", net.gateway || "—"],
        [T.stackLan || "LAN сеть", net.lanNet || "—"]
      ]
    },
    {
      title: T.stackXkeenSection || "xkeen",
      rows: [
        [T.stackPolicy || "policy", policyLabel],
        [T.stackMark || "mark", xk.mark ? `0x${xk.mark}` : "—"],
        [T.stackTproxyPort || "TPROXY UDP", String(xk.tproxyUdp || "—")],
        [T.stackRedirectPort || "REDIRECT TCP", String(xk.redirectTcp || "—")],
        [T.stackSsRelay || "SS-relay", xk.ssRelay || "—"]
      ]
    },
    {
      title: T.stackRuntimeSection || "Runtime",
      rows: [
        [T.stackSelfhealInterval || "self-heal интервал", `${rt.selfhealIntervalSec || 0} сек`],
        [T.stackLogRotate || "ротация логов", T.stackLogRotateValue || "раз в сутки"],
        [T.stackBackupRetention || "хранение бэкапов", formatMessage(T.stackBackupRetentionValue || "{n} последних копий", { n: rt.backupRetention || 0 })],
        [T.stackFdThresh || "FD warn / critical", `${rt.fdWarn || 0} / ${rt.fdCritical || 0}`]
      ]
    },
    {
      title: T.stackResourcesSection || "Ресурсы",
      rows: [
        [T.stackMem || "память", memTxt],
        [T.stackDisk || "диск", diskTxt, r.diskMount || null],
        [T.stackConntrack || "conntrack", ctTxt],
        [T.stackXrayFd || "xray FD", fdTxt]
      ]
    }
  ];

  els.stackInfo.innerHTML = sections.map((section) => `
    <div class="stack-section">
      <div class="stack-section-title">${escapeHtml(section.title)}</div>
      <dl class="stack-dl">
        ${section.rows.map((row) => {
          const k = row[0];
          const v = row[1];
          const note = row[2];
          const noteHtml = note ? `<small>${escapeHtml(String(note))}</small>` : "";
          return `<dt>${escapeHtml(k)}</dt><dd><span class="stack-value" title="${escapeHtml(T.stackCopyHint || "Кликни — скопировать")}">${escapeHtml(String(v))}</span>${noteHtml}</dd>`;
        }).join("")}
      </dl>
    </div>
  `).join("");

  els.stackInfo.querySelectorAll(".stack-value").forEach((node) => {
    node.addEventListener("click", async () => {
      const text = node.textContent || "";
      if (!text || text === "—") return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        }
        const original = node.textContent;
        node.classList.add("stack-value-copied");
        node.textContent = T.logsCopiedDone || "Скопировано";
        setTimeout(() => {
          node.classList.remove("stack-value-copied");
          node.textContent = original;
        }, 1100);
      } catch (_e) { /* noop */ }
    });
  });
}

async function fetchHealth() {
  const response = await fetch(HEALTH_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(response.status === 401 ? AUTH_REQUIRED_MESSAGE : `HTTP ${response.status}`);
  }
  return response.json();
}

async function fetchLogs(svc, lines) {
  const url = `${LOGS_URL}&svc=${encodeURIComponent(svc)}&n=${encodeURIComponent(lines)}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(response.status === 401 ? AUTH_REQUIRED_MESSAGE : `HTTP ${response.status}`);
  }
  return response.text();
}

async function restartService(svc) {
  const response = await fetch(RESTART_SVC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ svc })
  });
  const payload = await response.json();
  if (!response.ok || payload.ok === false) {
    throw new Error(response.status === 401 ? AUTH_REQUIRED_MESSAGE : (payload.error || `HTTP ${response.status}`));
  }
  return payload;
}

async function probeProxy(config) {
  const response = await fetch(PROBE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      address: config.address,
      port: Number(config.port)
    })
  });
  const payload = await response.json();
  if (!response.ok || payload.ok === false) {
    throw new Error(response.status === 401 ? AUTH_REQUIRED_MESSAGE : (payload.error || `HTTP ${response.status}`));
  }
  return payload;
}

async function loginToRouter(login, password) {
  const safeLogin = String(login || "").trim();
  const safePassword = String(password || "");
  if (!safeLogin || !safePassword) {
    throw new Error("Заполни логин и пароль");
  }

  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      loginB64: encodeBase64Unicode(safeLogin),
      passwordB64: encodeBase64Unicode(safePassword)
    })
  });

  const payload = await response.json();
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.error || `HTTP ${response.status}`);
  }
  return payload;
}

async function logoutFromRouter() {
  const response = await fetch(LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: "{}"
  });

  const payload = await response.json();
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.error || `HTTP ${response.status}`);
  }
  return payload;
}

function render() {
  if (!state) return;
  applyTranslations();
  renderProfiles();
  const profile = getActiveProfile();
  if (!profile) return;
  els.profileName.value = profile.name;
  els.domainStrategy.value = profile.domainStrategy;
  els.fallbackOutbound.value = profile.fallbackOutbound;
  renderProxyConfig(profile);
  renderProxiesPanel(profile);

  renderGroups();
  renderPreview();
}

function renderProfiles() {
  const profiles = state.profiles || [];
  els.activeProfile.innerHTML = "";
  for (const profile of profiles) {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.name;
    els.activeProfile.appendChild(option);
  }

  if (!profiles.some((profile) => profile.id === state.activeProfileId) && profiles[0]) {
    state.activeProfileId = profiles[0].id;
  }
  els.activeProfile.value = state.activeProfileId || "";
}

function renderGroups() {
  const profile = getActiveProfile();
  els.groups.innerHTML = "";

  if (!profile || !Array.isArray(profile.groups) || !profile.groups.length) {
    els.groups.innerHTML = `<div class="empty-box">${escapeHtml(T.noGroups)}</div>`;
    pushDebug("renderGroups: empty");
    return;
  }

  for (const group of profile.groups) {
    const card = document.createElement("article");
    card.className = "group-card";
    card.innerHTML = `
      <div class="group-head">
        <div class="group-head-main">
          <button class="collapse-toggle" type="button" aria-expanded="true">▾</button>
          <input class="group-name" type="text" placeholder="${escapeHtml(T.newGroup)}">
        </div>
        <div class="group-head-actions">
          <label class="toggle">
            <input class="group-enabled" type="checkbox">
            <span>${escapeHtml(T.active)}</span>
          </label>
          <button class="danger remove-group" type="button">${escapeHtml(T.remove)}</button>
        </div>
      </div>
      <div class="group-body">
        <div class="grid two">
          <label>
            <span>${escapeHtml(T.trafficTypeLabel)}</span>
            <select class="group-outbound">
              <option value="vless-reality">${escapeHtml(T.trafficTypeVpn)}</option>
              <option value="bypass">${escapeHtml(T.trafficTypeBypass)}</option>
            </select>
          </label>
          <label>
            <span>${escapeHtml(T.comment)}</span>
            <input class="group-note" type="text" placeholder="${escapeHtml(T.commentPlaceholder)}">
          </label>
        </div>
        <div class="grid two">
          <label>
            <span>${escapeHtml(T.domains)}</span>
            <textarea class="group-domains" rows="9" placeholder="chatgpt.com&#10;openai.com"></textarea>
          </label>
          <label>
            <span>${escapeHtml(T.cidr)}</span>
            <textarea class="group-cidrs" rows="9" placeholder="140.82.112.0/20&#10;20.199.39.0/24"></textarea>
          </label>
        </div>
      </div>
    `;

    const collapseBtn = card.querySelector(".collapse-toggle");
    const bodyEl = card.querySelector(".group-body");
    const nameEl = card.querySelector(".group-name");
    const noteEl = card.querySelector(".group-note");
    const enabledEl = card.querySelector(".group-enabled");
    const outboundEl = card.querySelector(".group-outbound");
    const domainsEl = card.querySelector(".group-domains");
    const cidrsEl = card.querySelector(".group-cidrs");
    const removeBtn = card.querySelector(".remove-group");

    let collapsed = true;
    const setCollapsed = (value) => {
      collapsed = value;
      card.classList.toggle("collapsed", collapsed);
      bodyEl.hidden = collapsed;
      collapseBtn.textContent = collapsed ? "▸" : "▾";
      collapseBtn.setAttribute("aria-expanded", String(!collapsed));
    };

    nameEl.value = group.name;
    noteEl.value = group.note || "";
    enabledEl.checked = group.enabled;
    outboundEl.value = group.outboundTag;
    domainsEl.value = group.domains.join("\n");
    cidrsEl.value = group.cidrs.join("\n");

    collapseBtn.addEventListener("click", () => setCollapsed(!collapsed));
    nameEl.addEventListener("input", () => updateGroup(group.id, { name: nameEl.value }));
    noteEl.addEventListener("input", () => updateGroup(group.id, { note: noteEl.value }));
    enabledEl.addEventListener("change", () => updateGroup(group.id, { enabled: enabledEl.checked }));
    outboundEl.addEventListener("change", () => updateGroup(group.id, { outboundTag: outboundEl.value }));
    domainsEl.addEventListener("input", () => updateGroup(group.id, { domains: splitLinesOrCsv(domainsEl.value) }));
    cidrsEl.addEventListener("input", () => updateGroup(group.id, { cidrs: splitLinesOrCsv(cidrsEl.value) }));
    domainsEl.addEventListener("blur", () => {
      const raw = splitLinesOrCsv(domainsEl.value);
      const part = partitionList(raw, looksLikeDomain);
      const after = dedupeDomainsList(part.valid);
      const dedupRemoved = part.valid.length - after.length;
      const changed = (after.length !== raw.length) || part.invalid.length > 0;
      if (changed) {
        domainsEl.value = after.join("\n");
        updateGroup(group.id, { domains: after });
        if (part.invalid.length > 0) {
          showToast(
            formatMessage(T.toastInvalidDomains || "Удалены не-домены: {list}", { list: part.invalid.slice(0, 3).join(", ") + (part.invalid.length > 3 ? "…" : "") }),
            { kind: "error", ttl: 4500 }
          );
        }
        if (dedupRemoved > 0) {
          showFieldFlash(domainsEl, formatMessage(T.dedupDomainsRemoved, { n: dedupRemoved }));
        }
      }
    });
    cidrsEl.addEventListener("blur", () => {
      const raw = splitLinesOrCsv(cidrsEl.value);
      const part = partitionList(raw, looksLikeIpOrCidr);
      const after = dedupeCidrsList(part.valid);
      const dedupRemoved = part.valid.length - after.length;
      const changed = (after.length !== raw.length) || part.invalid.length > 0;
      if (changed) {
        cidrsEl.value = after.join("\n");
        updateGroup(group.id, { cidrs: after });
        if (part.invalid.length > 0) {
          showToast(
            formatMessage(T.toastInvalidCidrs || "Удалены не-IP/CIDR: {list}", { list: part.invalid.slice(0, 3).join(", ") + (part.invalid.length > 3 ? "…" : "") }),
            { kind: "error", ttl: 4500 }
          );
        }
        if (dedupRemoved > 0) {
          showFieldFlash(cidrsEl, formatMessage(T.dedupCidrsRemoved, { n: dedupRemoved }));
        }
      }
    });
    removeBtn.addEventListener("click", () => {
      profile.groups = profile.groups.filter((item) => item.id !== group.id);
      persistAndRender();
    });

    setCollapsed(true);

    els.groups.appendChild(card);
  }
}

function renderPreview() {
  const profile = getActiveProfile();
  if (!profile) return;
  const routing = buildRoutingDocument(profile);
  els.preview.textContent = JSON.stringify(routing, null, 2);

  const activeGroups = profile.groups.filter((group) => group.enabled);
  const bypassGroups = activeGroups.filter((group) => group.outboundTag === "bypass" || group.outboundTag === "direct");
  const vpnGroups = activeGroups.filter((group) => group.outboundTag !== "bypass" && group.outboundTag !== "direct");

  const bypassDomainCount = uniq(bypassGroups.flatMap((group) => group.domains)).length;
  const vpnDomainCount = uniq(vpnGroups.flatMap((group) => group.domains)).length;
  const cidrCount = uniq(activeGroups.flatMap((group) => group.cidrs)).length;

  els.stats.innerHTML = [
    statPill(`${T.groups}: ${profile.groups.length}`),
    statPill(`${T.activeGroups}: ${activeGroups.length}`),
    statPill(`${T.vpnDomains}: ${vpnDomainCount}`),
    statPill(`${T.bypassDomains}: ${bypassDomainCount}`),
    statPill(`${T.cidrShort}: ${cidrCount}`)
  ].join("");
}

function buildRoutingDocument(inputState) {
  const inboundTags = ["redirect"];
  const rules = [];
  rules.push({
    type: "field",
    inboundTag: ["proxy-relay-ss"],
    outboundTag: "vless-reality"
  });

  for (const group of inputState.groups.filter((item) => item.enabled && item.outboundTag !== "direct" && item.outboundTag !== "bypass")) {
    const domains = uniq(group.domains);
    const cidrs = uniq(group.cidrs);

    if (domains.length) {
      rules.push({
        type: "field",
        inboundTag: inboundTags,
        domain: domains,
        outboundTag: group.outboundTag
      });
    }

    if (cidrs.length) {
      rules.push({
        type: "field",
        inboundTag: inboundTags,
        ip: cidrs,
        outboundTag: group.outboundTag
      });
    }
  }

  rules.push({
    type: "field",
    inboundTag: inboundTags,
    outboundTag: inputState.fallbackOutbound || "direct"
  });

  return {
    routing: {
      domainStrategy: inputState.domainStrategy || "IPIfNonMatch",
      rules
    }
  };
}

function importFromRouting(doc) {
  const rules = doc?.routing?.rules || [];
  const inboundTags = uniq(rules.flatMap((rule) => Array.isArray(rule.inboundTag) ? rule.inboundTag : []));
  const grouped = new Map();
  const fallbackRule = rules.find((rule) => rule.outboundTag && !rule.domain && !rule.ip && !rule.network);

  for (const rule of rules) {
    if (!rule.outboundTag || (!rule.domain && !rule.ip)) continue;

    const tag = rule.outboundTag === "direct" ? "bypass" : rule.outboundTag;
    const key = `${tag}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: newId(),
        name: tag === "vless-reality" ? "VPN" : (tag === "bypass" ? T.bypassGroupName : tag),
        note: T.imported,
        enabled: true,
        outboundTag: tag,
        domains: [],
        cidrs: []
      });
    }

    const target = grouped.get(key);
    if (Array.isArray(rule.domain)) target.domains.push(...rule.domain);
    if (Array.isArray(rule.ip)) target.cidrs.push(...rule.ip);
  }

  const imported = {
    profileName: T.currentState,
    domainStrategy: doc?.routing?.domainStrategy || "IPIfNonMatch",
    fallbackOutbound: fallbackRule?.outboundTag || "direct",
    groups: Array.from(grouped.values()).map((group) => ({
      ...group,
      domains: uniq(group.domains),
      cidrs: uniq(group.cidrs)
    }))
  };

  if (!imported.groups.length) {
    imported.groups = [createEmptyGroup()];
  }

  return normalizeState(imported);
}

function updateGroup(id, patch) {
  const profile = getActiveProfile();
  if (!profile) return;
  profile.groups = profile.groups.map((group) => group.id === id ? { ...group, ...patch } : group);
  persistState();
  renderPreview();
}

function persistAndRender() {
  persistState();
  render();
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    pushDebug(`loadState failed: ${error.message}`);
    return null;
  }
}

async function loadRemoteState(force = false) {
  const response = await fetch(STATE_URL, { cache: force ? "reload" : "no-store" });
  if (!response.ok) {
    throw new Error(response.status === 401 ? AUTH_REQUIRED_MESSAGE : `state fetch failed: ${response.status}`);
  }
  return normalizeState(parseJsonText(await response.text()));
}

async function loadRemoteOutbounds(force = false) {
  const response = await fetch(OUTBOUNDS_URL, { cache: force ? "reload" : "no-store" });
  if (!response.ok) {
    throw new Error(response.status === 401 ? AUTH_REQUIRED_MESSAGE : `outbounds fetch failed: ${response.status}`);
  }
  return parseJsonText(await response.text());
}

function isAuthError(error) {
  const message = String(error?.message || "");
  return /\b401\b/.test(message) || message.includes("router ui authorization required") || message.includes(AUTH_REQUIRED_MESSAGE);
}

function announceAuthRequired() {
  els.preview.textContent = AUTH_REQUIRED_MESSAGE;
  els.stats.textContent = AUTH_REQUIRED_MESSAGE;
  setProbeStatus("error", AUTH_REQUIRED_MESSAGE);
}

function showAuthOverlay(message = AUTH_LOGIN_HINT) {
  if (!els.authOverlay) return;
  els.authOverlay.hidden = false;
  els.authLead.textContent = message || AUTH_LOGIN_HINT;
  if (!els.authLogin.value) {
    els.authLogin.value = "admin";
  }
  setAuthStatus("info", "");
  setTimeout(() => els.authLogin.focus(), 0);
}

function hideAuthOverlay() {
  if (!els.authOverlay) return;
  els.authOverlay.hidden = true;
  setAuthStatus("info", "");
}

function setAuthStatus(kind, message) {
  if (!els.authStatus) return;
  if (!message) {
    els.authStatus.hidden = true;
    els.authStatus.textContent = "";
    els.authStatus.className = "probe-status";
    return;
  }
  els.authStatus.hidden = false;
  els.authStatus.className = `probe-status ${kind === "error" ? "error" : kind === "success" ? "success" : ""}`.trim();
  els.authStatus.textContent = message;
}

async function hydrateProxyConfigFromRemote() {
  try {
    const remoteOutbounds = await loadRemoteOutbounds();
    const remoteConfig = extractProxyConfig(remoteOutbounds);
    const remoteMuxConfig = extractMuxConfig(remoteOutbounds);
    if (!remoteConfig && !remoteMuxConfig) return;
    for (const profile of state.profiles || []) {
      const current = normalizeProxyConfig(profile.proxyConfig);
      if (remoteConfig && isProxyConfigEmpty(current)) {
        profile.proxyConfig = { ...remoteConfig };
      }
      if (remoteMuxConfig && profile.id === state.activeProfileId) {
        profile.muxConfig = { ...remoteMuxConfig };
      }
    }
  } catch (error) {
    pushDebug(`hydrateProxyConfigFromRemote failed: ${error.message}`);
  }
}

function parseJsonText(text) {
  return JSON.parse(String(text).replace(/^\uFEFF/, ""));
}

function parseVlessUrl(input) {
  const value = String(input || "").trim();
  if (!value.startsWith("vless://")) {
    throw new Error("нужна ссылка вида vless://...");
  }

  const url = new URL(value);
  const params = url.searchParams;
  if ((params.get("security") || "").toLowerCase() !== "reality") {
    throw new Error("ожидался security=reality");
  }

  return normalizeProxyConfig({
    address: url.hostname,
    port: Number(url.port || 0) || "",
    uuid: decodeURIComponent(url.username || ""),
    flow: params.get("flow") || "xtls-rprx-vision",
    publicKey: params.get("pbk") || "",
    serverName: params.get("sni") || "",
    shortId: params.get("sid") || "",
    fingerprint: params.get("fp") || "random"
  });
}

function bindProxyField(element, key, transform = (value) => value) {
  element.addEventListener("input", () => {
    const profile = getActiveProfile();
    if (!profile) return;
    profile.proxyConfig = {
      ...normalizeProxyConfig(profile.proxyConfig),
      [key]: transform(element.value)
    };
    persistState();
  });
}

function bindMuxField(element, key, transform = (value) => value) {
  if (!element) return;
  const eventName = element.tagName === "SELECT" ? "change" : "input";
  element.addEventListener(eventName, () => {
    const profile = getActiveProfile();
    if (!profile) return;
    profile.muxConfig = normalizeMuxConfig({
      ...profile.muxConfig,
      [key]: transform(element.value)
    });
    persistState();
    renderMuxConfig(profile);
  });
}

function renderProxyConfig(profile) {
  const config = normalizeProxyConfig(profile.proxyConfig);
  els.proxyAddress.value = config.address;
  els.proxyPort.value = config.port || "";
  els.proxyUuid.value = config.uuid;
  els.proxyFlow.value = config.flow;
  els.proxyPublicKey.value = config.publicKey;
  els.proxyServerName.value = config.serverName;
  els.proxyShortId.value = config.shortId;
  els.proxyFingerprint.value = config.fingerprint;
  renderMuxConfig(profile);
}

function renderMuxConfig(profile) {
  const config = normalizeMuxConfig(profile.muxConfig);
  if (els.muxMode) els.muxMode.value = config.mode;
  if (els.muxUdp443) els.muxUdp443.value = config.xudpProxyUDP443;
  if (els.muxXudpConcurrency) els.muxXudpConcurrency.value = config.xudpConcurrency;

  const numbersHidden = config.mode === "off";
  const numberGrid = els.muxXudpConcurrency?.closest(".mux-number-grid");
  if (numberGrid) numberGrid.hidden = numbersHidden;
  if (els.muxXudpConcurrency) els.muxXudpConcurrency.disabled = config.mode === "off";
  if (els.muxUdp443) els.muxUdp443.disabled = config.mode === "off";
  if (els.muxSummary) els.muxSummary.textContent = muxModeLabel(config.mode);
}

function muxModeLabel(mode) {
  if (mode === "xudp") return T.muxModeXudp || "XUDP only";
  return T.muxModeOff || "Off";
}

function setProbeStatus(kind, message) {
  els.proxyProbeStatus.hidden = false;
  els.proxyProbeStatus.className = `probe-status ${kind}`;
  els.proxyProbeStatus.textContent = message;
}

// --- Multi-key UI: render + CRUD ---

// Tracks which proxy id the manual-key form is currently editing (null = new).
let editingProxyId = null;

function maskUrl(url) {
  // Hide the secret token portion of subscription URLs in the list view.
  // Keeps host + first path segment visible, masks the rest.
  if (!url) return "";
  try {
    const u = new URL(url);
    const segs = u.pathname.split("/").filter(Boolean);
    if (segs.length === 0) return `${u.host}/`;
    const tailMasked = segs.length > 1 ? `…***` : "***";
    return `${u.host}/${segs[0]}/${tailMasked}`;
  } catch {
    return url.slice(0, 24) + "…";
  }
}

function formatLastFetched(ts) {
  if (!ts) return "не загружалась";
  const diffMs = Date.now() - ts;
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return "только что";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} мин назад`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} ч назад`;
  const days = Math.floor(hr / 24);
  return `${days} д назад`;
}

function securityBadge(config) {
  const sec = (config.security || "none").toLowerCase();
  const net = (config.network || "tcp").toLowerCase();
  const proto = (config.protocol || "vless").toLowerCase();
  if (proto === "hysteria2") return "hy2+tls+quic";
  return `${proto}+${sec}+${net}`;
}

// All parsed protocols are now activatable. Kept as a function so future
// "preview only" transports can opt out without touching every call site.
function isProxyActivatable(_config) {
  return true;
}

function renderProxiesPanel(profile) {
  if (!profile) return;
  renderSubscriptionsList(profile);
  renderAutoRefreshPanel();
  renderManualKeysList(profile);
  renderActiveProxyList(profile);
}

function formatAutoRefreshTs(ts) {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleString("ru-RU");
  } catch {
    return "—";
  }
}

function renderAutoRefreshPanel() {
  if (!els.subAutoRefreshEnabled || !els.subAutoRefreshInterval || !els.subAutoRefreshLog) return;
  ensureAutoRefreshState();
  const cfg = state?.subscriptionAutoRefresh;
  if (!cfg) return;

  els.subAutoRefreshEnabled.checked = cfg.enabled !== false;
  els.subAutoRefreshInterval.value = String(clampInt(
    cfg.intervalMin,
    SUBSCRIPTION_AUTO_REFRESH_DEFAULT_MIN,
    SUBSCRIPTION_AUTO_REFRESH_MIN_MINUTES,
    24 * 60
  ));

  if (els.subAutoRefreshLastRun) {
    els.subAutoRefreshLastRun.textContent = formatAutoRefreshTs(cfg.lastRunAt);
  }
  if (els.subAutoRefreshLastSuccess) {
    els.subAutoRefreshLastSuccess.textContent = formatAutoRefreshTs(cfg.lastSuccessAt);
  }
  if (els.subAutoRefreshLastError) {
    els.subAutoRefreshLastError.textContent = cfg.lastError || "—";
  }

  els.subAutoRefreshLog.innerHTML = "";
  const items = (cfg.log || []).slice(-15).reverse();
  if (!items.length) {
    const li = document.createElement("li");
    li.className = "card-empty";
    li.textContent = "Лог пока пуст.";
    els.subAutoRefreshLog.appendChild(li);
    return;
  }
  for (const entry of items) {
    const li = document.createElement("li");
    li.className = `auto-refresh-log-item level-${escapeHtml(entry.level || "info")}`;
    const ts = formatAutoRefreshTs(entry.ts);
    const msg = String(entry.message || "");
    li.innerHTML = `<span class="auto-refresh-log-ts">${escapeHtml(ts)}</span><span class="auto-refresh-log-msg">${escapeHtml(msg)}</span>`;
    els.subAutoRefreshLog.appendChild(li);
  }
}

function renderSubscriptionsList(profile) {
  if (!els.subscriptionsList) return;
  els.subscriptionsList.innerHTML = "";
  const subs = profile.subscriptions || [];
  if (subs.length === 0) {
    // Hide the empty hint entirely if user already has any keys in the
    // other section — keeps the UI quiet once setup is done.
    const hasAnyProxies = (profile.proxies || []).length > 0;
    if (hasAnyProxies) return;
    const li = document.createElement("li");
    li.className = "card-empty";
    li.textContent = "Нет подписок. Жми «+ Подписка» чтобы добавить.";
    els.subscriptionsList.appendChild(li);
    return;
  }
  for (const sub of subs) {
    const keysCount = (profile.proxies || []).filter((p) => p.source === sub.id).length;
    const li = document.createElement("li");
    li.className = "key-card";
    li.dataset.subId = sub.id;
    const errorBlock = sub.lastError
      ? `<div class="card-error">⚠ ${escapeHtml(sub.lastError)}</div>`
      : "";
    const isRevealed = revealedSubs.has(sub.id);
    const isBusy = refreshingSubs.has(sub.id);
    const urlDisplay = isRevealed ? sub.url : maskUrl(sub.url);
    li.innerHTML = `
      <div class="card-main">
        <div class="card-title">${escapeHtml(sub.name)}</div>
        <div class="card-meta">
          <span>${keysCount} ${keysCount === 1 ? "ключ" : keysCount < 5 ? "ключа" : "ключей"}</span>
          <span>·</span>
          <span>${formatLastFetched(sub.lastFetched)}</span>
        </div>
        <div class="card-url${isRevealed ? " revealed" : ""}" title="${escapeHtml(isRevealed ? sub.url : "Показать URL — кнопка 👁")}">${escapeHtml(urlDisplay)}</div>
        ${errorBlock}
      </div>
      <div class="card-actions">
        <button type="button" data-act="reveal-sub" data-id="${sub.id}" title="${isRevealed ? "Скрыть URL" : "Показать URL"}">${isRevealed ? "🙈" : "👁"}</button>
        <button type="button" data-act="copy-sub" data-id="${sub.id}" title="Скопировать URL">📋</button>
        <button type="button" data-act="refresh-sub" data-id="${sub.id}"${isBusy ? " disabled" : ""}>${isBusy ? "⏳…" : "↻ Обновить"}</button>
        <button type="button" data-act="delete-sub" data-id="${sub.id}" class="danger">✕</button>
      </div>
    `;
    els.subscriptionsList.appendChild(li);
  }
}

// Tracks subs currently mid-refresh (used to disable the button and swap
// label to a spinner glyph) and subs whose full URL is temporarily revealed.
const refreshingSubs = new Set();
const revealedSubs = new Set();
const revealedTimers = new Map();

function ensureAutoRefreshState() {
  if (!state || typeof state !== "object") return;
  const raw = state.subscriptionAutoRefresh || {};
  const enabled = raw.enabled !== false;
  const intervalMin = clampInt(
    raw.intervalMin,
    SUBSCRIPTION_AUTO_REFRESH_DEFAULT_MIN,
    SUBSCRIPTION_AUTO_REFRESH_MIN_MINUTES,
    24 * 60
  );
  const log = Array.isArray(raw.log) ? raw.log.slice(-SUBSCRIPTION_AUTO_REFRESH_LOG_LIMIT) : [];
  state.subscriptionAutoRefresh = {
    enabled,
    intervalMin,
    lastRunAt: Number(raw.lastRunAt) || 0,
    lastSuccessAt: Number(raw.lastSuccessAt) || 0,
    lastError: raw.lastError ? String(raw.lastError).slice(0, 300) : "",
    log
  };
}

function appendAutoRefreshLog(level, message, extra = {}) {
  ensureAutoRefreshState();
  const cfg = state?.subscriptionAutoRefresh;
  if (!cfg) return;
  cfg.log.push({
    ts: Date.now(),
    level,
    message,
    ...extra
  });
  cfg.log = cfg.log.slice(-SUBSCRIPTION_AUTO_REFRESH_LOG_LIMIT);
  pushDebug(`[sub-auto-refresh][${level}] ${message}`);
}

function scheduleSubscriptionAutoRefresh() {
  if (subscriptionAutoRefreshTimer) {
    clearTimeout(subscriptionAutoRefreshTimer);
    subscriptionAutoRefreshTimer = null;
  }
  ensureAutoRefreshState();
  const profile = getActiveProfile();
  if (!profile) return;
  if (state.subscriptionAutoRefresh.enabled === false) {
    appendAutoRefreshLog("info", "scheduler disabled by settings", { profileId: profile.id });
    persistState();
    return;
  }
  const intervalMin = state.subscriptionAutoRefresh.intervalMin;
  const delayMs = Math.max(intervalMin * 60_000, SUBSCRIPTION_AUTO_REFRESH_MIN_MINUTES * 60_000);
  appendAutoRefreshLog("info", "scheduler initialized", {
    profileId: profile.id,
    intervalMin,
    subscriptions: (profile.subscriptions || []).length
  });
  persistState();
  subscriptionAutoRefreshTimer = setTimeout(() => {
    runSubscriptionAutoRefreshCycle("timer").catch((error) => {
      appendAutoRefreshLog("error", `cycle failed: ${error.message || error}`);
      persistState();
      scheduleSubscriptionAutoRefresh();
    });
  }, delayMs);
}

async function runSubscriptionAutoRefreshCycle(reason = "manual") {
  if (subscriptionAutoRefreshInFlight) {
    appendAutoRefreshLog("warn", "cycle skipped: already running", { reason });
    persistState();
    return;
  }
  ensureAutoRefreshState();
  const profile = getActiveProfile();
  if (!profile) return;
  if (state.subscriptionAutoRefresh.enabled === false) {
    appendAutoRefreshLog("info", "cycle skipped: disabled", { reason, profileId: profile.id });
    persistState();
    return;
  }
  const subscriptions = profile.subscriptions || [];
  if (!subscriptions.length) {
    appendAutoRefreshLog("info", "cycle skipped: no subscriptions", { reason, profileId: profile.id });
    persistState();
    scheduleSubscriptionAutoRefresh();
    return;
  }

  subscriptionAutoRefreshInFlight = true;
  state.subscriptionAutoRefresh.lastRunAt = Date.now();
  appendAutoRefreshLog("info", "cycle started", { reason, profileId: profile.id, count: subscriptions.length });
  persistState();

  let okCount = 0;
  let failedCount = 0;
  try {
    for (const sub of subscriptions) {
      const result = await refreshSubscription(sub.id, { silentToast: true, source: "auto" });
      if (result?.ok) {
        okCount++;
        appendAutoRefreshLog("info", `subscription updated: ${sub.name}`, {
          subId: sub.id,
          summary: result.summary || "ok"
        });
      } else {
        failedCount++;
        appendAutoRefreshLog("error", `subscription failed: ${sub.name}`, {
          subId: sub.id,
          error: result?.error || "unknown error"
        });
      }
      persistState();
    }

    if (failedCount === 0) {
      state.subscriptionAutoRefresh.lastSuccessAt = Date.now();
      state.subscriptionAutoRefresh.lastError = "";
      appendAutoRefreshLog("info", `cycle completed: success=${okCount}, failed=${failedCount}`, { reason });
    } else {
      state.subscriptionAutoRefresh.lastError = `Ошибок: ${failedCount}`;
      appendAutoRefreshLog("warn", `cycle completed with errors: success=${okCount}, failed=${failedCount}`, { reason });
    }
  } finally {
    subscriptionAutoRefreshInFlight = false;
    persistState();
    scheduleSubscriptionAutoRefresh();
  }
}

function toggleRevealSub(subId) {
  if (revealedSubs.has(subId)) {
    revealedSubs.delete(subId);
    const t = revealedTimers.get(subId);
    if (t) { clearTimeout(t); revealedTimers.delete(subId); }
  } else {
    revealedSubs.add(subId);
    // auto-hide after 10s so it doesn't stay open on shared screens
    const t = setTimeout(() => {
      revealedSubs.delete(subId);
      revealedTimers.delete(subId);
      const profile = getActiveProfile();
      if (profile) renderSubscriptionsList(profile);
    }, 10000);
    revealedTimers.set(subId, t);
  }
  const profile = getActiveProfile();
  if (profile) renderSubscriptionsList(profile);
}

async function copySubUrl(subId) {
  const profile = getActiveProfile();
  if (!profile) return;
  const sub = (profile.subscriptions || []).find((s) => s.id === subId);
  if (!sub) return;
  try {
    await navigator.clipboard.writeText(sub.url);
    showToast(`URL «${sub.name}» скопирован`, { kind: "success", ttl: 2000 });
  } catch (err) {
    // Fallback for non-secure contexts: present in a prompt() so user can copy
    window.prompt("Скопируй URL вручную:", sub.url);
  }
}

function renderManualKeysList(profile) {
  if (!els.manualKeysList) return;
  els.manualKeysList.innerHTML = "";
  const proxies = (profile.proxies || []).filter((p) => p.source === "manual");
  if (proxies.length === 0) {
    // Skip the empty hint if user already has a subscription with proxies.
    const hasSubProxies = (profile.proxies || []).some((p) => p.source !== "manual");
    const hasSubs = (profile.subscriptions || []).length > 0;
    if (hasSubProxies || hasSubs) return;
    const li = document.createElement("li");
    li.className = "card-empty";
    li.textContent = "Нет ручных ключей. Жми «+ Ручной ключ» чтобы добавить.";
    els.manualKeysList.appendChild(li);
    return;
  }
  for (const p of proxies) {
    const li = document.createElement("li");
    li.className = "key-card";
    li.dataset.proxyId = p.id;
    li.innerHTML = `
      <div class="card-main">
        <div class="card-title">${escapeHtml(p.name)}</div>
        <div class="card-meta">
          <span class="card-badge">${escapeHtml(securityBadge(p.config))}</span>
          <span>${escapeHtml(p.config.address)}:${p.config.port}</span>
        </div>
      </div>
      <div class="card-actions">
        <button type="button" data-act="edit-proxy" data-id="${p.id}">Изм.</button>
        <button type="button" data-act="delete-proxy" data-id="${p.id}" class="danger">✕</button>
      </div>
    `;
    els.manualKeysList.appendChild(li);
  }
}

function renderActiveProxyList(profile) {
  if (!els.activeProxyList) return;
  els.activeProxyList.innerHTML = "";
  const proxies = profile.proxies || [];
  if (proxies.length === 0) {
    const li = document.createElement("li");
    li.className = "card-empty";
    li.textContent = "Сначала добавь хотя бы один ключ.";
    els.activeProxyList.appendChild(li);
    return;
  }
  const activeId = profile.activeProxyId;
  for (const p of proxies) {
    const sub = (profile.subscriptions || []).find((s) => s.id === p.source);
    const srcLabel = sub ? sub.name : "ручной";
    const activatable = isProxyActivatable(p.config);
    const li = document.createElement("li");
    li.className = "active-row"
      + (p.id === activeId ? " selected" : "")
      + (activatable ? "" : " disabled");
    li.dataset.proxyId = p.id;
    if (!activatable) li.title = "Hysteria2 ещё не интегрирован — Phase B/C";
    li.innerHTML = `
      <input type="radio" name="activeProxy" value="${p.id}" ${p.id === activeId ? "checked" : ""} class="active-radio-input"${activatable ? "" : " disabled"}>
      <div class="active-info">
        <div class="active-name">${escapeHtml(p.name)}</div>
        <div class="active-meta">
          <span>${escapeHtml(srcLabel)}</span>
          <span>·</span>
          <span class="card-badge">${escapeHtml(securityBadge(p.config))}</span>
          <span>${escapeHtml(p.config.address)}:${p.config.port}</span>
        </div>
      </div>
    `;
    els.activeProxyList.appendChild(li);
  }
}

function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

// Form open/close

function openManualKeyForm(proxyId = null) {
  editingProxyId = proxyId;
  els.manualKeyFormTitle.textContent = proxyId ? "Редактировать ключ" : "Новый ключ";
  els.manualKeyForm.hidden = false;
  els.subscriptionForm.hidden = true;

  const profile = getActiveProfile();
  if (!profile) return;

  if (proxyId) {
    const p = (profile.proxies || []).find((x) => x.id === proxyId);
    if (p) {
      profile.proxyConfig = { ...p.config };
      els.manualKeyName.value = p.name;
    }
  } else {
    profile.proxyConfig = createDefaultProxyConfig();
    els.manualKeyName.value = "";
    els.proxyImportUrl.value = "";
  }
  renderProxyConfig(profile);
}

function closeManualKeyForm() {
  editingProxyId = null;
  els.manualKeyForm.hidden = true;
  els.proxyImportUrl.value = "";
}

function openSubscriptionForm() {
  els.subscriptionForm.hidden = false;
  els.manualKeyForm.hidden = true;
  els.newSubscriptionName.value = "";
  els.newSubscriptionUrl.value = "";
  setSubscriptionFormStatus("info", "");
}

function closeSubscriptionForm() {
  els.subscriptionForm.hidden = true;
}

function setSubscriptionFormStatus(kind, message) {
  if (!els.subscriptionFormStatus) return;
  if (!message) {
    els.subscriptionFormStatus.hidden = true;
    els.subscriptionFormStatus.textContent = "";
    return;
  }
  els.subscriptionFormStatus.hidden = false;
  els.subscriptionFormStatus.className = `probe-status ${kind}`;
  els.subscriptionFormStatus.textContent = message;
}

// CRUD handlers

function saveManualKey() {
  const profile = getActiveProfile();
  if (!profile) return;
  const config = normalizeProxyConfig(profile.proxyConfig);
  if (!config.address || !config.uuid) {
    setProbeStatus("error", "Не хватает адреса или UUID. Заполни поля или вставь vless:// URI.");
    return;
  }
  const name = els.manualKeyName.value.trim() || config.address;
  if (editingProxyId) {
    const existing = profile.proxies.find((p) => p.id === editingProxyId);
    if (existing) {
      existing.name = name;
      existing.config = config;
    }
  } else {
    profile.proxies.push({
      id: `proxy-${newId()}`,
      name,
      source: "manual",
      config
    });
    if (!profile.activeProxyId) {
      profile.activeProxyId = profile.proxies[profile.proxies.length - 1].id;
    }
  }
  closeManualKeyForm();
  persistState();
  renderProxiesPanel(profile);
}

function deleteProxy(proxyId) {
  const profile = getActiveProfile();
  if (!profile) return;
  if (!confirm("Удалить этот ключ?")) return;
  profile.proxies = (profile.proxies || []).filter((p) => p.id !== proxyId);
  if (profile.activeProxyId === proxyId) {
    profile.activeProxyId = profile.proxies.length ? profile.proxies[0].id : null;
  }
  persistState();
  renderProxiesPanel(profile);
}

function setActiveProxy(proxyId) {
  const profile = getActiveProfile();
  if (!profile) return;
  const proxy = (profile.proxies || []).find((p) => p.id === proxyId);
  if (!proxy) return;
  if (!isProxyActivatable(proxy.config)) {
    showToast(
      "Hysteria2 ещё не интегрирован с sing-box. Парсер работает, выбрать активным пока нельзя.",
      { variant: "warning", durationMs: 5000 }
    );
    renderActiveProxyList(profile); // restore visual selection
    return;
  }
  profile.activeProxyId = proxyId;
  persistState();
  renderActiveProxyList(profile);
}

async function fetchSubscriptionViaBackend(url) {
  const res = await fetch("/api/routing.cgi?kind=subscription-fetch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || `fetch failed (${res.status})`);
  // data.raw is base64 of the HTTP body. Body itself is typically base64 of URIs.
  const httpBody = atob(data.raw);
  let text;
  try {
    let inner = httpBody.replace(/-/g, "+").replace(/_/g, "/").trim();
    while (inner.length % 4) inner += "=";
    text = atob(inner);
  } catch {
    text = httpBody;
  }
  return parseSubscriptionText(text);
}

async function saveSubscription() {
  const profile = getActiveProfile();
  if (!profile) return;
  const name = els.newSubscriptionName.value.trim();
  const url = els.newSubscriptionUrl.value.trim();
  if (!url) {
    setSubscriptionFormStatus("error", "URL не заполнен");
    return;
  }
  if (!url.toLowerCase().startsWith("https://")) {
    setSubscriptionFormStatus("error", "URL должен начинаться с https://");
    return;
  }
  setSubscriptionFormStatus("info", "Загружаю…");
  els.saveSubscriptionBtn.disabled = true;
  try {
    const result = await fetchSubscriptionViaBackend(url);
    if (result.configs.length === 0) {
      setSubscriptionFormStatus("error", "Подписка не содержит распознанных ключей");
      return;
    }
    const subId = `sub-${newId()}`;
    const sub = {
      id: subId,
      name: name || (new URL(url).host),
      url,
      lastFetched: Date.now(),
      lastError: null
    };
    profile.subscriptions = profile.subscriptions || [];
    profile.subscriptions.push(sub);
    profile.proxies = profile.proxies || [];
    for (const cfg of result.configs) {
      profile.proxies.push({
        id: `proxy-${newId()}`,
        name: cfg.name,
        source: subId,
        config: cfg
      });
    }
    if (!profile.activeProxyId && profile.proxies.length) {
      profile.activeProxyId = profile.proxies.find((p) => p.source === subId).id;
    }
    closeSubscriptionForm();
    persistState();
    renderProxiesPanel(profile);
    const msg = `Загружено ${result.configs.length} ключ(ей)` + (result.errors.length ? `, ошибок: ${result.errors.length}` : "");
    setProbeStatus("success", msg);
  } catch (err) {
    setSubscriptionFormStatus("error", String(err.message || err).slice(0, 200));
  } finally {
    els.saveSubscriptionBtn.disabled = false;
  }
}

async function refreshSubscription(subId, options = {}) {
  const profile = getActiveProfile();
  if (!profile) return { ok: false, error: "profile not found" };
  const sub = (profile.subscriptions || []).find((s) => s.id === subId);
  if (!sub) return { ok: false, error: "subscription not found" };
  if (refreshingSubs.has(subId)) return { ok: false, error: "already running" };

  const silentToast = options.silentToast === true;

  refreshingSubs.add(subId);
  renderSubscriptionsList(profile); // show spinner state
  const toast = silentToast ? null : showToast(`Обновляю «${sub.name}»…`, { kind: "progress" });

  // Remember if the active proxy was from this sub — if the refresh removes
  // it we report that in the toast instead of silently falling back.
  const activeProxyBefore = profile.activeProxyId;
  const activeFromThisSub = (profile.proxies || []).find(
    (p) => p.id === activeProxyBefore && p.source === subId
  );
  const activeKeyBefore = activeFromThisSub
    ? activeFromThisSub.config.address + ":" + activeFromThisSub.config.port + "/" + activeFromThisSub.config.uuid
    : null;

  try {
    const result = await fetchSubscriptionViaBackend(sub.url);
    if (result.configs.length === 0) {
      sub.lastError = "пустая подписка";
      persistState();
      renderProxiesPanel(profile);
      if (toast) toast.update(`«${sub.name}»: подписка пуста`, "error");
      return { ok: false, error: sub.lastError };
    }

    // Diff by (address:port/uuid) — same key across refreshes means same server.
    const oldProxies = (profile.proxies || []).filter((p) => p.source === subId);
    const oldByKey = new Map(oldProxies.map((p) => [p.config.address + ":" + p.config.port + "/" + p.config.uuid, p]));
    const newProxies = [];
    const addedNames = [];
    let kept = 0;
    for (const cfg of result.configs) {
      const key = cfg.address + ":" + cfg.port + "/" + cfg.uuid;
      const existing = oldByKey.get(key);
      if (existing) {
        existing.config = cfg;
        existing.name = cfg.name;
        newProxies.push(existing);
        oldByKey.delete(key);
        kept++;
      } else {
        newProxies.push({
          id: `proxy-${newId()}`,
          name: cfg.name,
          source: subId,
          config: cfg
        });
        addedNames.push(cfg.name);
      }
    }
    const removedNames = Array.from(oldByKey.values()).map((p) => p.name);
    profile.proxies = [
      ...(profile.proxies || []).filter((p) => p.source !== subId),
      ...newProxies
    ];

    // If the active proxy was removed by this refresh, fall back and tell the
    // user via the toast so the change isn't invisible.
    let activeLostMessage = "";
    if (profile.activeProxyId && !profile.proxies.some((p) => p.id === profile.activeProxyId)) {
      profile.activeProxyId = newProxies[0]?.id || profile.proxies[0]?.id || null;
      const fallbackName = profile.proxies.find((p) => p.id === profile.activeProxyId)?.name;
      activeLostMessage = activeKeyBefore && fallbackName
        ? ` · активный сброшен на «${fallbackName}»`
        : " · активный сброшен";
    }

    sub.lastFetched = Date.now();
    sub.lastError = null;
    persistState();
    renderProxiesPanel(profile);

    // Build a compact summary: +N добавлено, ~N без изменений, -N удалено.
    const parts = [];
    if (addedNames.length) parts.push(`+${addedNames.length} новых`);
    if (kept) parts.push(`~${kept} без изменений`);
    if (removedNames.length) parts.push(`−${removedNames.length} удалён${removedNames.length === 1 ? "" : "о"}`);
    const summary = parts.length ? parts.join(", ") : "без изменений";
    if (toast) toast.update(`«${sub.name}»: ${summary}${activeLostMessage}`, "success");
    return { ok: true, summary, added: addedNames.length, kept, removed: removedNames.length };
  } catch (err) {
    sub.lastError = String(err.message || err).slice(0, 200);
    persistState();
    renderProxiesPanel(profile);
    if (toast) toast.update(`«${sub.name}»: ${sub.lastError}`, "error");
    return { ok: false, error: sub.lastError };
  } finally {
    refreshingSubs.delete(subId);
    renderSubscriptionsList(profile);
  }
}

function deleteSubscription(subId) {
  const profile = getActiveProfile();
  if (!profile) return;
  const sub = (profile.subscriptions || []).find((s) => s.id === subId);
  if (!sub) return;
  if (!confirm(`Удалить подписку «${sub.name}» и все её ${(profile.proxies || []).filter((p) => p.source === subId).length} ключ(ей)?`)) return;
  profile.subscriptions = profile.subscriptions.filter((s) => s.id !== subId);
  profile.proxies = (profile.proxies || []).filter((p) => p.source !== subId);
  if (profile.activeProxyId && !profile.proxies.some((p) => p.id === profile.activeProxyId)) {
    profile.activeProxyId = profile.proxies.length ? profile.proxies[0].id : null;
  }
  persistState();
  renderProxiesPanel(profile);
}

// Localhost port where sing-box exposes a mixed (SOCKS5) inbound for xray to
// forward TCP traffic into when the active proxy is hysteria2. xray treats
// the relay as a normal SOCKS5 upstream; sing-box does the real tunneling.
const SINGBOX_XRAY_RELAY_PORT = 61225;

function buildOutboundsDocument(profile) {
  const config = getActiveProxyConfig(profile);
  const mux = buildMuxObject(profile.muxConfig);
  const protocol = (config.protocol || "vless").toLowerCase();

  // Hysteria2 is not xray-native. We keep the "vless-reality" tag (routing
  // rules reference it everywhere) but route the outbound through sing-box
  // via SOCKS5. sing-box owns the real hysteria2 outbound.
  if (protocol === "hysteria2") {
    return {
      outbounds: [
        {
          tag: "vless-reality",
          protocol: "socks",
          settings: {
            servers: [
              { address: "127.0.0.1", port: SINGBOX_XRAY_RELAY_PORT }
            ]
          }
        },
        { protocol: "freedom", tag: "direct" }
      ]
    };
  }

  // user block differs by protocol; xray keeps the outbound tag "vless-reality"
  // for compatibility with existing routing.json rules even when we ship vmess.
  const userBlock = protocol === "vmess"
    ? { id: config.uuid, alterId: Number(config.alterId) || 0, security: "auto", level: 0 }
    : { id: config.uuid, encryption: "none", flow: config.flow || "", level: 0 };

  return {
    outbounds: [
      {
        tag: "vless-reality",
        protocol,
        settings: {
          vnext: [
            {
              address: config.address,
              port: Number(config.port),
              users: [userBlock]
            }
          ]
        },
        streamSettings: buildStreamSettings(config),
        mux
      },
      {
        protocol: "freedom",
        tag: "direct"
      }
    ]
  };
}

// Build the sing-box config that matches the currently selected proxy.
// - For vless/vmess (xray-native): keeps the existing shape (UDP TPROXY ->
//   shadowsocks-relay -> xray). xray does the real tunneling.
// - For hysteria2: adds a mixed inbound on 127.0.0.1:SINGBOX_XRAY_RELAY_PORT
//   (so xray can SOCKS into us) and a hysteria2 outbound to the server.
//   All routes terminate at hysteria2.
function buildSingboxDocument(profile) {
  const config = getActiveProxyConfig(profile);
  const protocol = (config.protocol || "vless").toLowerCase();

  const base = {
    log: { level: "warn", timestamp: true },
    inbounds: [
      {
        type: "tproxy",
        tag: "xkeen-udp-tproxy",
        listen: "0.0.0.0",
        listen_port: 61221,
        network: "udp"
      }
    ],
    outbounds: [],
    route: {
      rules: [{ ip_is_private: true, outbound: "direct" }],
      final: "proxy"
    }
  };

  if (protocol === "hysteria2") {
    base.inbounds.push({
      type: "mixed",
      tag: "xray-relay",
      listen: "127.0.0.1",
      listen_port: SINGBOX_XRAY_RELAY_PORT
    });
    const hy2 = {
      type: "hysteria2",
      tag: "proxy",
      server: config.address,
      server_port: Number(config.port),
      password: config.password || "",
      tls: {
        enabled: true,
        server_name: config.serverName || config.address,
        insecure: !!config.insecure
      }
    };
    if (Array.isArray(config.alpn) && config.alpn.length) {
      hy2.tls.alpn = config.alpn.slice();
    }
    if (config.obfs) {
      hy2.obfs = { type: config.obfs, password: config.obfsPassword || "" };
    }
    if (config.pinSHA256) {
      hy2.tls.certificate_pin_sha256 = [config.pinSHA256];
    }
    base.outbounds.push(hy2);
  } else {
    // Default: relay UDP into xray's shadowsocks listener so it can tunnel
    // via the active VLESS/VMess outbound (same path that worked for months).
    base.outbounds.push({
      type: "shadowsocks",
      tag: "proxy",
      server: "127.0.0.1",
      server_port: 62640,
      method: "none",
      password: "none"
    });
  }

  base.outbounds.push({ type: "direct", tag: "direct" });
  return base;
}

function extractProxyConfig(doc) {
  const outbound = (doc?.outbounds || []).find((item) => item.tag === "vless-reality");
  if (!outbound) return null;
  const vnext = outbound?.settings?.vnext?.[0] || {};
  const user = vnext?.users?.[0] || {};
  const reality = outbound?.streamSettings?.realitySettings || {};
  return normalizeProxyConfig({
    address: vnext.address,
    port: vnext.port,
    uuid: user.id,
    flow: user.flow,
    publicKey: reality.publicKey,
    serverName: reality.serverName,
    shortId: reality.shortId,
    fingerprint: reality.fingerprint
  });
}

function extractMuxConfig(doc) {
  const outbound = (doc?.outbounds || []).find((item) => item.tag === "vless-reality");
  if (!outbound) return null;
  return normalizeMuxConfig(outbound.mux || {});
}

function createDefaultProxyConfig() {
  return {
    protocol: "vless",
    address: "",
    port: "",
    uuid: "",
    flow: "xtls-rprx-vision",
    network: "tcp",
    security: "reality",
    serverName: "",
    fingerprint: "random",
    publicKey: "",
    shortId: "",
    spiderX: "/",
    alpn: [],
    path: "",
    host: "",
    alterId: 0,
    // gRPC-specific
    serviceName: "",
    mode: "",       // gRPC: "multi"|"gun"|"guna"  /  XHTTP: "auto"|"packet-up"|"stream-up"|"stream-one"
    authority: "",  // gRPC :authority pseudo-header
    // XHTTP-specific. xhttpExtra carries the full provider-supplied JSON
    // (scMaxEachPostBytes, scMaxConcurrentPosts, scMinPostsIntervalMs,
    // xPaddingBytes, noGRPCHeader, etc). xPaddingBytes stays as a top-level
    // shortcut so older keys still work, but the full extra wins when set.
    xPaddingBytes: "",
    xhttpExtra: null,
    // Hysteria2-specific (UDP/QUIC protocol, NOT xray-native)
    password: "",         // auth secret (vless/vmess use uuid, hy2 uses password)
    obfs: "",             // "salamander" or empty
    obfsPassword: "",
    insecure: false,      // skip TLS cert verify
    pinSHA256: ""         // pinned cert fingerprint
  };
}

function createDefaultMuxConfig() {
  return {
    mode: "off",
    tcpConcurrency: 8,
    xudpConcurrency: 8,
    xudpProxyUDP443: "reject"
  };
}

function normalizeProxyConfig(config) {
  return {
    ...createDefaultProxyConfig(),
    ...(config || {})
  };
}

// Parse a single vless:// URI per the standard URL shape
// vless://UUID@HOST:PORT?param=value&...#friendly-name
// Returns { ok: true, config } or { ok: false, error }
function parseVlessUri(uri) {
  if (typeof uri !== "string") return { ok: false, error: "not a string" };
  const trimmed = uri.trim();
  if (!/^vless:\/\//i.test(trimmed)) return { ok: false, error: "not vless://" };

  let body = trimmed.slice("vless://".length);
  let name = "";
  const hashIdx = body.indexOf("#");
  if (hashIdx >= 0) {
    try { name = decodeURIComponent(body.slice(hashIdx + 1)); }
    catch { name = body.slice(hashIdx + 1); }
    body = body.slice(0, hashIdx);
  }

  let queryStr = "";
  const queryIdx = body.indexOf("?");
  if (queryIdx >= 0) {
    queryStr = body.slice(queryIdx + 1);
    body = body.slice(0, queryIdx);
  }

  const atIdx = body.indexOf("@");
  if (atIdx < 0) return { ok: false, error: "missing @ in vless URI" };
  const uuid = body.slice(0, atIdx);
  const hostPort = body.slice(atIdx + 1);
  if (!uuid || !hostPort) return { ok: false, error: "empty uuid or host" };

  // rightmost colon — handles IPv6 in brackets
  const colonIdx = hostPort.lastIndexOf(":");
  if (colonIdx < 0) return { ok: false, error: "missing port" };
  const host = hostPort.slice(0, colonIdx).replace(/^\[|\]$/g, "");
  const port = parseInt(hostPort.slice(colonIdx + 1), 10);
  if (!host || !Number.isFinite(port) || port < 1 || port > 65535) {
    return { ok: false, error: "invalid host or port" };
  }

  const params = {};
  for (const pair of queryStr.split("&")) {
    if (!pair) continue;
    const eqIdx = pair.indexOf("=");
    const key = eqIdx < 0 ? pair : pair.slice(0, eqIdx);
    const val = eqIdx < 0 ? "" : pair.slice(eqIdx + 1);
    // application/x-www-form-urlencoded: `+` decodes to a space.
    // decodeURIComponent keeps `+` literal, so subscription providers that
    // pack JSON into extra=... (which has spaces) end up with invalid JSON.
    const decoded = val.replace(/\+/g, " ");
    try { params[key] = decodeURIComponent(decoded); }
    catch { params[key] = decoded; }
  }

  const security = (params.security || "").toLowerCase() || "none";
  const network = (params.type || "tcp").toLowerCase();
  const alpn = params.alpn
    ? params.alpn.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  return {
    ok: true,
    config: {
      protocol: "vless",
      name: name || `${host}:${port}`,
      address: host,
      port,
      uuid,
      flow: params.flow || "",
      network,
      security,
      serverName: params.sni || params.serverName || "",
      fingerprint: params.fp || "",
      publicKey: params.pbk || "",
      shortId: params.sid || "",
      spiderX: params.spx || "/",
      alpn,
      path: params.path || "",
      host: params.host || "",
      alterId: 0,
      // gRPC: prefer explicit serviceName=, fall back to path= which some
      // providers reuse for the gRPC service name.
      serviceName: params.serviceName || params.path || "",
      mode: params.mode || "",
      authority: params.authority || "",
      // XHTTP padding shortcut. Providers expose either
      //   1) `xPaddingBytes=100-1000` directly, or
      //   2) `extra={"xPaddingBytes":"100-1000",...}` JSON-encoded.
      xPaddingBytes: params.xPaddingBytes || (() => {
        if (!params.extra) return "";
        try { return JSON.parse(params.extra).xPaddingBytes || ""; }
        catch { return ""; }
      })(),
      // Full XHTTP extra blob — pass-through so all scMax* / noGRPCHeader /
      // future fields reach xray verbatim. Server-side configs are picky:
      // missing scMaxEachPostBytes etc. silently breaks stream-up handshake.
      xhttpExtra: (() => {
        if (!params.extra) return null;
        try { return JSON.parse(params.extra); }
        catch { return null; }
      })()
    }
  };
}

// Parse vmess:// — payload is base64-encoded JSON
function parseVmessUri(uri) {
  if (typeof uri !== "string") return { ok: false, error: "not a string" };
  const trimmed = uri.trim();
  if (!/^vmess:\/\//i.test(trimmed)) return { ok: false, error: "not vmess://" };

  const payload = trimmed.slice("vmess://".length);
  let json;
  try {
    let b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const decoded = atob(b64);
    json = JSON.parse(decoded);
  } catch (err) {
    return { ok: false, error: `vmess decode failed: ${err.message}` };
  }

  const port = parseInt(json.port, 10);
  if (!json.add || !Number.isFinite(port)) {
    return { ok: false, error: "vmess missing add or port" };
  }

  // vmess "tls" field: "tls" | "reality" | "" | "none"
  const tlsRaw = String(json.tls || "").toLowerCase();
  const security = tlsRaw === "tls" ? "tls" : tlsRaw === "reality" ? "reality" : "none";
  const network = String(json.net || "tcp").toLowerCase();
  const alpn = json.alpn
    ? String(json.alpn).split(",").map(s => s.trim()).filter(Boolean)
    : [];

  return {
    ok: true,
    config: {
      protocol: "vmess",
      name: json.ps || `${json.add}:${port}`,
      address: json.add,
      port,
      uuid: json.id || "",
      flow: "",
      network,
      security,
      serverName: json.sni || "",
      fingerprint: json.fp || "",
      publicKey: "",
      shortId: "",
      spiderX: "/",
      alpn,
      path: json.path || "",
      host: json.host || "",
      alterId: parseInt(json.aid, 10) || 0,
      // gRPC: vmess legacy reuses `path` as the gRPC service name.
      // `type` carries the mode for grpc (multi/gun).
      serviceName: network === "grpc" ? (json.path || "") : "",
      mode: network === "grpc" ? (json.type || "") : "",
      authority: ""
    }
  };
}

// Parse a hysteria2:// or hy2:// URI.
// Format: hysteria2://password@host:port?sni=...&obfs=salamander&obfs-password=...
//                                          &insecure=0|1&pinSHA256=...&alpn=h3#name
// Hysteria2 is UDP/QUIC, not xray-native — applying it requires sing-box.
// Phase A only parses + displays; activation is gated separately.
function parseHysteria2Uri(uri) {
  if (typeof uri !== "string") return { ok: false, error: "not a string" };
  const trimmed = uri.trim();
  if (!/^(hysteria2|hy2):\/\//i.test(trimmed)) return { ok: false, error: "not hysteria2://" };

  let body = trimmed.replace(/^(hysteria2|hy2):\/\//i, "");
  let name = "";
  const hashIdx = body.indexOf("#");
  if (hashIdx >= 0) {
    try { name = decodeURIComponent(body.slice(hashIdx + 1)); }
    catch { name = body.slice(hashIdx + 1); }
    body = body.slice(0, hashIdx);
  }

  let queryStr = "";
  const queryIdx = body.indexOf("?");
  if (queryIdx >= 0) {
    queryStr = body.slice(queryIdx + 1);
    body = body.slice(0, queryIdx);
  }

  const atIdx = body.indexOf("@");
  if (atIdx < 0) return { ok: false, error: "missing @ in hysteria2 URI" };
  let password = body.slice(0, atIdx);
  try { password = decodeURIComponent(password); } catch { /* keep raw */ }
  const hostPort = body.slice(atIdx + 1);
  if (!password || !hostPort) return { ok: false, error: "empty password or host" };

  const colonIdx = hostPort.lastIndexOf(":");
  if (colonIdx < 0) return { ok: false, error: "missing port" };
  const host = hostPort.slice(0, colonIdx).replace(/^\[|\]$/g, "");
  const port = parseInt(hostPort.slice(colonIdx + 1), 10);
  if (!host || !Number.isFinite(port) || port < 1 || port > 65535) {
    return { ok: false, error: "invalid host or port" };
  }

  const params = {};
  for (const pair of queryStr.split("&")) {
    if (!pair) continue;
    const eqIdx = pair.indexOf("=");
    const key = eqIdx < 0 ? pair : pair.slice(0, eqIdx);
    const val = eqIdx < 0 ? "" : pair.slice(eqIdx + 1);
    try { params[key] = decodeURIComponent(val); }
    catch { params[key] = val; }
  }

  const alpn = params.alpn
    ? params.alpn.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return {
    ok: true,
    config: {
      protocol: "hysteria2",
      name: name || `${host}:${port}`,
      address: host,
      port,
      uuid: "",                   // hy2 uses password, not uuid
      password,
      flow: "",
      network: "udp",             // QUIC over UDP
      security: "tls",            // always TLS
      serverName: params.sni || params.serverName || host,
      fingerprint: params.fp || "",
      publicKey: "",
      shortId: "",
      spiderX: "/",
      alpn: alpn.length ? alpn : ["h3"],
      path: "",
      host: "",
      alterId: 0,
      serviceName: "",
      mode: "",
      authority: "",
      xPaddingBytes: "",
      // Hysteria2-specific
      obfs: params.obfs || "",
      obfsPassword: params["obfs-password"] || params.obfsPassword || "",
      insecure: params.insecure === "1" || params.insecure === "true",
      pinSHA256: params.pinSHA256 || params["pin-sha256"] || ""
    }
  };
}

// Parse a subscription body (already base64-decoded by caller).
// Each non-empty line is a URI; unknown schemes are skipped silently.
function parseSubscriptionText(rawText) {
  const lines = String(rawText || "").split(/\r?\n/);
  const configs = [];
  const errors = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("#")) continue;
    let result = null;
    if (/^vless:\/\//i.test(trimmed)) result = parseVlessUri(trimmed);
    else if (/^vmess:\/\//i.test(trimmed)) result = parseVmessUri(trimmed);
    else if (/^(hysteria2|hy2):\/\//i.test(trimmed)) result = parseHysteria2Uri(trimmed);
    else continue;
    if (result.ok) configs.push(result.config);
    else errors.push({ line: trimmed.slice(0, 80), error: result.error });
  }
  return { configs, errors };
}

// Build xray outbound `streamSettings` from a normalized proxy config.
// Branches on `security` (reality | tls | none) and `network` (tcp | ws).
// Returns the streamSettings object for the outbound.
function buildStreamSettings(cfg) {
  const network = (cfg.network || "tcp").toLowerCase();
  const security = (cfg.security || "none").toLowerCase();

  const ss = {
    network,
    security: security === "none" ? "none" : security
  };

  if (security === "reality") {
    ss.realitySettings = {
      publicKey: cfg.publicKey || "",
      fingerprint: cfg.fingerprint || "random",
      serverName: cfg.serverName || "",
      shortId: cfg.shortId || "",
      spiderX: cfg.spiderX || "/"
    };
  } else if (security === "tls") {
    ss.tlsSettings = {
      serverName: cfg.serverName || cfg.address || "",
      fingerprint: cfg.fingerprint || "chrome",
      allowInsecure: false
    };
    if (Array.isArray(cfg.alpn) && cfg.alpn.length) {
      ss.tlsSettings.alpn = cfg.alpn.slice();
    }
  }

  if (network === "ws") {
    ss.wsSettings = {
      path: cfg.path || "/",
      headers: cfg.host ? { Host: cfg.host } : {}
    };
  } else if (network === "grpc") {
    ss.grpcSettings = {
      // Prefer explicit serviceName; fall back to path (vmess-legacy).
      serviceName: cfg.serviceName || cfg.path || "",
      // multi/gun modes — multiMode flips to true for "multi", everything
      // else (default "gun") stays false. xray will use single-stream when
      // multiMode is false.
      multiMode: String(cfg.mode || "").toLowerCase() === "multi"
    };
    if (cfg.authority) ss.grpcSettings.authority = cfg.authority;
  } else if (network === "xhttp") {
    // XHTTP — xray's modern transport: HTTP/2 or HTTP/3 frames that look
    // like normal browser traffic. Best paired with Reality for DPI evasion.
    // mode determines upload framing: "auto" lets xray pick, "stream-one"
    // is the stealthiest single-stream variant.
    const mode = (cfg.mode || "auto").toLowerCase();
    ss.xhttpSettings = {
      mode,
      path: cfg.path || "/",
      host: cfg.host || ""
    };
    // `extra` carries the stream-up tuning that servers really care about
    // (scMaxEachPostBytes, scMaxConcurrentPosts, scMinPostsIntervalMs,
    // xPaddingBytes, noGRPCHeader). Prefer the full provider-supplied blob;
    // fall back to the xPaddingBytes shortcut so older keys still work.
    if (cfg.xhttpExtra && typeof cfg.xhttpExtra === "object") {
      ss.xhttpSettings.extra = cfg.xhttpExtra;
    } else if (cfg.xPaddingBytes) {
      ss.xhttpSettings.extra = { xPaddingBytes: cfg.xPaddingBytes };
    }
  }

  return ss;
}

function normalizeMuxConfig(config) {
  const source = config || {};
  let mode = source.mode;
  if (!mode) {
    if (source.enabled === true) {
      const tcpConcurrency = Number(source.concurrency);
      const xudpConcurrency = Number(source.xudpConcurrency);
      mode = tcpConcurrency < 0 && xudpConcurrency > 0 ? "xudp" : "off";
    } else {
      mode = "off";
    }
  }
  if (!MUX_MODES.has(mode)) {
    mode = Number(source.xudpConcurrency) > 0 ? "xudp" : "off";
  }

  const xudpProxyUDP443 = MUX_UDP443_MODES.has(source.xudpProxyUDP443)
    ? source.xudpProxyUDP443
    : "reject";

  return {
    mode,
    tcpConcurrency: 8,
    xudpConcurrency: clampInt(source.xudpConcurrency, 8, 1, 1024),
    xudpProxyUDP443
  };
}

function buildMuxObject(config) {
  const mux = normalizeMuxConfig(config);
  if (mux.mode === "off") {
    return { enabled: false };
  }
  if (mux.mode === "xudp") {
    return {
      enabled: true,
      concurrency: -1,
      xudpConcurrency: mux.xudpConcurrency,
      xudpProxyUDP443: mux.xudpProxyUDP443
    };
  }
  return { enabled: false };
}

function clampInt(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function isProxyConfigEmpty(config) {
  return !config.address && !config.port && !config.uuid && !config.publicKey && !config.serverName && !config.shortId;
}

function normalizeState(input) {
  if (Array.isArray(input.profiles)) {
    const profiles = input.profiles.map(normalizeProfile).filter(Boolean);
    const safeProfiles = profiles.length ? profiles : cloneFallback().profiles;
    const activeProfileId = safeProfiles.some((profile) => profile.id === input.activeProfileId)
      ? input.activeProfileId
      : safeProfiles[0].id;

    return {
      activeProfileId,
      profiles: safeProfiles,
      subscriptionAutoRefresh: {
        enabled: input?.subscriptionAutoRefresh?.enabled !== false,
        intervalMin: clampInt(
          input?.subscriptionAutoRefresh?.intervalMin,
          SUBSCRIPTION_AUTO_REFRESH_DEFAULT_MIN,
          SUBSCRIPTION_AUTO_REFRESH_MIN_MINUTES,
          24 * 60
        ),
        lastRunAt: Number(input?.subscriptionAutoRefresh?.lastRunAt) || 0,
        lastSuccessAt: Number(input?.subscriptionAutoRefresh?.lastSuccessAt) || 0,
        lastError: input?.subscriptionAutoRefresh?.lastError ? String(input.subscriptionAutoRefresh.lastError).slice(0, 300) : "",
        log: Array.isArray(input?.subscriptionAutoRefresh?.log)
          ? input.subscriptionAutoRefresh.log.slice(-SUBSCRIPTION_AUTO_REFRESH_LOG_LIMIT)
          : []
      }
    };
  }

  return {
    activeProfileId: "profile-main",
    subscriptionAutoRefresh: {
      enabled: true,
      intervalMin: SUBSCRIPTION_AUTO_REFRESH_DEFAULT_MIN,
      lastRunAt: 0,
      lastSuccessAt: 0,
      lastError: "",
      log: []
    },
    profiles: [
      normalizeProfile({
        id: "profile-main",
        name: input.profileName || T.profileName,
        domainStrategy: input.domainStrategy || "IPIfNonMatch",
        fallbackOutbound: input.fallbackOutbound || "direct",
        proxyConfig: input.proxyConfig,
        muxConfig: input.muxConfig,
        groups: input.groups
      })
    ]
  };
}

function createEmptyGroup() {
  return {
    id: newId(),
    name: T.newGroup,
    note: "",
    enabled: true,
    outboundTag: "vless-reality",
    domains: [],
    cidrs: []
  };
}

function cloneFallback() {
  return JSON.parse(JSON.stringify(fallbackState));
}

function createEmptyProfile(name = T.defaultProfileName) {
  return {
    id: newId(),
    name,
    domainStrategy: "IPIfNonMatch",
    fallbackOutbound: "direct",
    proxyConfig: createDefaultProxyConfig(),
    muxConfig: createDefaultMuxConfig(),
    proxies: [],
    subscriptions: [],
    activeProxyId: null,
    groups: [createEmptyGroup()]
  };
}

function cloneProfile(profile) {
  return JSON.parse(JSON.stringify(profile));
}

function normalizeProxyEntry(entry) {
  if (!entry || typeof entry !== "object") return null;
  const config = normalizeProxyConfig(entry.config);
  // vless/vmess authenticate by uuid; hysteria2 by password. Accept either.
  const hasAuth = config.uuid || config.password;
  if (!config.address || !hasAuth) return null;
  return {
    id: entry.id || `proxy-${newId()}`,
    name: String(entry.name || config.address || "Unnamed"),
    source: entry.source || "manual",
    config
  };
}

function normalizeSubscriptionEntry(entry) {
  if (!entry || typeof entry !== "object") return null;
  const url = String(entry.url || "").trim();
  if (!url) return null;
  return {
    id: entry.id || `sub-${newId()}`,
    name: String(entry.name || url.replace(/^https?:\/\//, "").slice(0, 32)),
    url,
    lastFetched: Number.isFinite(entry.lastFetched) ? entry.lastFetched : null,
    lastError: entry.lastError ? String(entry.lastError).slice(0, 200) : null
  };
}

function normalizeProfile(profile) {
  const groups = (Array.isArray(profile.groups) ? profile.groups : []).map((group) => ({
    id: group.id || newId(),
    name: group.name || T.newGroup,
    note: group.note || "",
    enabled: group.enabled !== false,
    outboundTag: (group.outboundTag === "direct" ? "bypass" : (group.outboundTag || "vless-reality")),
    domains: uniq(Array.isArray(group.domains) ? group.domains : []),
    cidrs: uniq(Array.isArray(group.cidrs) ? group.cidrs : [])
  }));

  // New multi-key fields with shape normalization
  const proxies = (Array.isArray(profile.proxies) ? profile.proxies : [])
    .map(normalizeProxyEntry)
    .filter(Boolean);
  const subscriptions = (Array.isArray(profile.subscriptions) ? profile.subscriptions : [])
    .map(normalizeSubscriptionEntry)
    .filter(Boolean);

  const legacy = normalizeProxyConfig(profile.proxyConfig);

  // Migration: if proxies[] is empty but legacy proxyConfig has real fields,
  // create proxies[0] from legacy. Idempotent — running again no-ops since
  // the migrated proxy is already present.
  if (proxies.length === 0 && legacy.address && legacy.uuid) {
    proxies.push({
      id: `proxy-${newId()}`,
      name: legacy.address || "Legacy",
      source: "manual",
      config: legacy
    });
  }

  // Validate activeProxyId: must reference an existing proxy.
  let activeProxyId = profile.activeProxyId || null;
  if (activeProxyId && !proxies.some((p) => p.id === activeProxyId)) {
    activeProxyId = null;
  }
  if (!activeProxyId && proxies.length) {
    activeProxyId = proxies[0].id;
  }

  return {
    id: profile.id || newId(),
    name: profile.name || T.defaultProfileName,
    domainStrategy: profile.domainStrategy || "IPIfNonMatch",
    fallbackOutbound: profile.fallbackOutbound || "direct",
    proxyConfig: legacy,
    muxConfig: normalizeMuxConfig(profile.muxConfig),
    proxies,
    subscriptions,
    activeProxyId,
    groups: groups.length ? groups : [createEmptyGroup()]
  };
}

// Return the proxy config that should drive the xray outbound. Prefers the
// active entry in profile.proxies[]; falls back to legacy profile.proxyConfig
// when nothing is selected (e.g. fresh install before user picks a key).
function getActiveProxyConfig(profile) {
  if (!profile) return createDefaultProxyConfig();
  const proxies = Array.isArray(profile.proxies) ? profile.proxies : [];
  if (proxies.length && profile.activeProxyId) {
    const active = proxies.find((p) => p.id === profile.activeProxyId);
    if (active && active.config) return normalizeProxyConfig(active.config);
  }
  if (proxies.length && proxies[0].config) return normalizeProxyConfig(proxies[0].config);
  return normalizeProxyConfig(profile.proxyConfig);
}

function getActiveProfile() {
  const profiles = state?.profiles || [];
  return profiles.find((profile) => profile.id === state.activeProfileId) || profiles[0] || null;
}

function newId() {
  if (typeof crypto !== "undefined" && crypto && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function encodeBase64Unicode(value) {
  const bytes = new TextEncoder().encode(String(value || ""));
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function splitLinesOrCsv(text) {
  return uniq(
    text
      .split(/\r?\n|,/g)
      .map((item) => item.trim())
      .filter(Boolean)
  );
}

function uniq(items) {
  return [...new Set((items || []).map((item) => String(item).trim()).filter(Boolean))];
}

function statPill(text) {
  return `<span class="stat-pill">${escapeHtml(text)}</span>`;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "");
}

function downloadJson(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

// True if string looks like a valid domain (one or more labels, dots,
// no IP-like all-numeric labels, no slashes, no spaces).
const DOMAIN_RE = /^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;
function looksLikeDomain(str) {
  const s = String(str || "").trim().toLowerCase();
  if (!s) return false;
  if (/^\d+\.\d+\.\d+\.\d+(\/\d+)?$/.test(s)) return false;
  return DOMAIN_RE.test(s);
}
// True if string is a valid IP or IP/mask CIDR.
function looksLikeIpOrCidr(str) {
  return parseCidrEntry(str) !== null;
}

// Split a list into {valid, invalid} based on a predicate.
function partitionList(list, isValid) {
  const valid = [];
  const invalid = [];
  for (const entry of (list || [])) {
    const trimmed = String(entry || "").trim();
    if (!trimmed) continue;
    if (isValid(trimmed)) valid.push(trimmed);
    else invalid.push(trimmed);
  }
  return { valid, invalid };
}

// Dedupe domains: drop subdomains already covered by a parent domain
// in the same list. Match xray's default "domain" rule semantics — a
// rule for foo.com matches foo.com itself plus any *.foo.com.
function dedupeDomainsList(list) {
  const cleaned = [...new Set((list || [])
    .map((d) => String(d || "").trim().toLowerCase())
    .filter(Boolean))];
  if (cleaned.length <= 1) return cleaned;

  const reversed = cleaned.map((d) => ({
    original: d,
    key: d.split(".").reverse().join(".")
  }));
  reversed.sort((a, b) => (a.key < b.key ? -1 : (a.key > b.key ? 1 : 0)));

  const kept = [];
  for (const item of reversed) {
    const covered = kept.some((parent) =>
      item.key === parent.key || item.key.startsWith(parent.key + ".")
    );
    if (!covered) kept.push(item);
  }
  return kept.map((item) => item.original);
}

// Parse "1.2.3.4" or "1.2.3.0/24" into {network, mask}. Returns null
// for anything that isn't a valid IPv4 address or CIDR.
function parseCidrEntry(str) {
  const trimmed = String(str || "").trim();
  if (!trimmed) return null;
  let ip;
  let mask;
  const slashIdx = trimmed.indexOf("/");
  if (slashIdx >= 0) {
    ip = trimmed.slice(0, slashIdx);
    mask = parseInt(trimmed.slice(slashIdx + 1), 10);
    if (!Number.isFinite(mask) || mask < 0 || mask > 32) return null;
  } else {
    ip = trimmed;
    mask = 32;
  }
  const octets = ip.split(".");
  if (octets.length !== 4) return null;
  let intIp = 0;
  for (const o of octets) {
    if (!/^\d+$/.test(o)) return null;
    const n = Number(o);
    if (n < 0 || n > 255) return null;
    intIp = (intIp * 256) + n;
  }
  const maskBits = mask === 0 ? 0 : (0xFFFFFFFF << (32 - mask)) >>> 0;
  const network = (intIp & maskBits) >>> 0;
  return { original: trimmed, network, mask };
}

// Dedupe CIDR/IP list: drop entries fully contained in a wider entry.
// Invalid entries pass through untouched (so users see their typos).
function dedupeCidrsList(list) {
  const seen = new Set();
  const valid = [];
  const invalid = [];
  for (const entry of (list || [])) {
    const trimmed = String(entry || "").trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const parsed = parseCidrEntry(trimmed);
    if (parsed) valid.push(parsed);
    else invalid.push(trimmed);
  }
  valid.sort((a, b) => a.mask - b.mask);
  const kept = [];
  for (const item of valid) {
    const covered = kept.some((parent) => {
      if (parent.mask > item.mask) return false;
      const parentBits = parent.mask === 0 ? 0 : (0xFFFFFFFF << (32 - parent.mask)) >>> 0;
      return ((item.network & parentBits) >>> 0) === parent.network;
    });
    if (!covered) kept.push(item);
  }
  return [...kept.map((k) => k.original), ...invalid];
}

function showFieldFlash(el, text) {
  const host = el.parentElement;
  if (!host) return;
  if (getComputedStyle(host).position === "static") {
    host.style.position = "relative";
  }
  let note = host.querySelector(".field-flash");
  if (!note) {
    note = document.createElement("div");
    note.className = "field-flash";
    host.appendChild(note);
  }
  note.textContent = text;
  note.classList.remove("field-flash-show");
  void note.offsetWidth;
  note.classList.add("field-flash-show");
}

function pushDebug(message) {
  const stamp = new Date().toLocaleTimeString("ru-RU");
  debugState.messages.push(`[${stamp}] ${message}`);
  debugState.messages = debugState.messages.slice(-8);
  console.log(message);
}

function formatMessage(template, values = {}) {
  return String(template || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title = T.documentTitle;
  AUTH_REQUIRED_MESSAGE = T.authRequiredMessage;
  AUTH_LOGIN_HINT = T.authLoginHint;

  if (els.langSelect) els.langSelect.value = currentLang;

  if (els.authTitle) els.authTitle.textContent = T.authTitle;
  if (els.authLead) els.authLead.textContent = T.authLead;
  if (els.authLoginLabel) els.authLoginLabel.textContent = T.authLoginLabel;
  if (els.authPasswordLabel) els.authPasswordLabel.textContent = T.authPasswordLabel;
  if (els.authSubmitBtn) els.authSubmitBtn.textContent = T.authSubmit;
  if (els.langLabel) els.langLabel.textContent = T.langLabel;
  if (els.heroTitle) els.heroTitle.textContent = T.heroTitle;
  if (els.heroLead) els.heroLead.textContent = T.heroLead;
  if (els.profileKicker) els.profileKicker.textContent = T.profileKicker;
  if (els.profileTitle) els.profileTitle.textContent = T.profileTitle;
  if (els.activeProfileLabel) els.activeProfileLabel.textContent = T.activeProfileLabel;
  if (els.profileNameLabel) els.profileNameLabel.textContent = T.profileNameLabel;
  if (els.domainStrategyLabel) els.domainStrategyLabel.textContent = T.domainStrategyLabel;
  if (els.fallbackLabel) els.fallbackLabel.textContent = T.fallbackLabel;
  if (els.proxyTitle) els.proxyTitle.textContent = T.proxyTitle;
  if (els.proxyUrlLabel) els.proxyUrlLabel.textContent = T.proxyUrlLabel;
  if (els.proxyAddressLabel) els.proxyAddressLabel.textContent = T.proxyAddressLabel;
  if (els.proxyPortLabel) els.proxyPortLabel.textContent = T.proxyPortLabel;
  if (els.muxKicker) els.muxKicker.textContent = T.muxKicker;
  if (els.muxTitle) els.muxTitle.textContent = T.muxTitle;
  if (els.muxModeLabel) els.muxModeLabel.textContent = T.muxModeLabel;
  if (els.muxUdp443Label) els.muxUdp443Label.textContent = T.muxUdp443Label;
  if (els.muxXudpConcurrencyLabel) els.muxXudpConcurrencyLabel.textContent = T.muxXudpConcurrencyLabel;
  if (els.muxMode) {
    const optionLabels = {
      off: T.muxModeOff,
      xudp: T.muxModeXudp
    };
    for (const option of els.muxMode.options) {
      option.textContent = optionLabels[option.value] || option.value;
    }
  }
  if (els.previewKicker) els.previewKicker.textContent = T.previewKicker;
  if (els.previewTitle) els.previewTitle.textContent = T.previewTitle;
  if (els.groupsKicker) els.groupsKicker.textContent = T.groupsKicker;
  if (els.groupsTitle) els.groupsTitle.textContent = T.groupsTitle;

  if (els.importStateBtn) els.importStateBtn.textContent = T.importBtn;
  if (els.exportStateBtn) els.exportStateBtn.textContent = T.exportBtn;
  if (els.repairRuntimeBtn) els.repairRuntimeBtn.textContent = T.repairBtn;
  if (els.saveApplyBtn) els.saveApplyBtn.textContent = T.saveApplyBtn;
  if (els.logoutBtn) els.logoutBtn.textContent = T.logoutBtn;
  if (els.addProfileBtn) els.addProfileBtn.textContent = T.addProfileBtn;
  if (els.duplicateProfileBtn) els.duplicateProfileBtn.textContent = T.duplicateProfileBtn;
  if (els.removeProfileBtn) els.removeProfileBtn.textContent = T.removeProfileBtn;
  if (els.saveStateBtn) els.saveStateBtn.textContent = T.saveStateBtn;
  if (els.importProxyBtn) els.importProxyBtn.textContent = T.importProxyBtn;
  if (els.probeProxyBtn) els.probeProxyBtn.textContent = T.probeProxyBtn;
  if (els.addGroupBtn) els.addGroupBtn.textContent = T.addGroupBtn;

  if (els.importStateBtn) els.importStateBtn.title = T.importStateTitle;
  if (els.exportStateBtn) els.exportStateBtn.title = T.exportStateTitle;
  if (els.saveStateBtn) els.saveStateBtn.title = T.saveStateTitle;
  if (els.saveApplyBtn) els.saveApplyBtn.title = T.saveApplyTitle;
  if (els.repairRuntimeBtn) els.repairRuntimeBtn.title = T.repairTitle;
  if (els.importProxyBtn) els.importProxyBtn.title = T.importProxyTitle;
  if (els.probeProxyBtn) els.probeProxyBtn.title = T.probeProxyTitle;
  if (els.logoutBtn) els.logoutBtn.title = T.logoutTitle || "";

  if (els.profileName) els.profileName.placeholder = T.profileName;

  if (els.healthKicker) els.healthKicker.textContent = T.healthKicker;
  if (els.healthTitle) els.healthTitle.textContent = T.healthTitle;
  if (els.refreshHealthBtn) els.refreshHealthBtn.textContent = T.healthRefreshBtn;
  if (els.restartXrayBtn) els.restartXrayBtn.textContent = T.restartXrayBtn;
  if (els.restartSingboxBtn) els.restartSingboxBtn.textContent = T.restartSingboxBtn;
  if (els.restartSelfhealBtn) els.restartSelfhealBtn.textContent = T.restartSelfhealBtn;
  if (els.logsSelectLabel) els.logsSelectLabel.textContent = T.logsSelectLabel;
  if (els.logsLinesLabel) els.logsLinesLabel.textContent = T.logsLinesLabel;
  if (els.loadLogsBtn) els.loadLogsBtn.textContent = T.loadLogsBtn;
  if (els.logsCopyBtn && !els.logsCopyBtn.classList.contains("copied")) {
    els.logsCopyBtn.textContent = T.logsCopyBtn;
  }
}
