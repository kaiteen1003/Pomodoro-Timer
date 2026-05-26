export type Lang =
  | "en" | "ja" | "zh" | "zh-TW" | "ko"
  | "es" | "pt" | "fr" | "de" | "it"
  | "ru" | "pl" | "nl" | "sv" | "tr"
  | "ar" | "hi" | "id" | "vi" | "th";

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en",    label: "English",             native: "English" },
  { code: "ja",    label: "Japanese",             native: "日本語" },
  { code: "zh",    label: "Chinese (Simplified)", native: "中文（简体）" },
  { code: "zh-TW", label: "Chinese (Traditional)",native: "中文（繁體）" },
  { code: "ko",    label: "Korean",               native: "한국어" },
  { code: "es",    label: "Spanish",              native: "Español" },
  { code: "pt",    label: "Portuguese",           native: "Português" },
  { code: "fr",    label: "French",               native: "Français" },
  { code: "de",    label: "German",               native: "Deutsch" },
  { code: "it",    label: "Italian",              native: "Italiano" },
  { code: "ru",    label: "Russian",              native: "Русский" },
  { code: "pl",    label: "Polish",               native: "Polski" },
  { code: "nl",    label: "Dutch",                native: "Nederlands" },
  { code: "sv",    label: "Swedish",              native: "Svenska" },
  { code: "tr",    label: "Turkish",              native: "Türkçe" },
  { code: "ar",    label: "Arabic",               native: "العربية" },
  { code: "hi",    label: "Hindi",                native: "हिन्दी" },
  { code: "id",    label: "Indonesian",           native: "Bahasa Indonesia" },
  { code: "vi",    label: "Vietnamese",           native: "Tiếng Việt" },
  { code: "th",    label: "Thai",                 native: "ภาษาไทย" },
];

type T = {
  settings: string;
  focusMin: string;
  breakMin: string;
  presets: string;
  notifications: string;
  notifyHelp: string;
  notifyHelpBody: string;
  officialGuide: string;
  sound: string;
  autoSwitch: string;
  language: string;
  start: string;
  pause: string;
  resume: string;
  reset: string;
  focusTime: string;
  breakTime: string;
};

export const translations: Record<Lang, T> = {
  en: {
    settings: "Settings", focusMin: "Focus (min)", breakMin: "Break (min)",
    presets: "Presets", notifications: "Notifications",
    notifyHelp: "Notifications not working?",
    notifyHelpBody: "You need to allow notifications in both your OS settings and browser settings.",
    officialGuide: "official guide",
    sound: "Sound", autoSwitch: "Auto Switch", language: "Language",
    start: "Start", pause: "Pause", resume: "Resume", reset: "Reset",
    focusTime: "Focus Time", breakTime: "Break Time",
  },
  ja: {
    settings: "設定", focusMin: "集中時間（分）", breakMin: "休憩時間（分）",
    presets: "プリセット", notifications: "通知",
    notifyHelp: "通知が届かない場合は？",
    notifyHelpBody: "OSの設定とブラウザの設定の両方で通知を許可する必要があります。",
    officialGuide: "公式ガイド",
    sound: "通知音", autoSwitch: "自動切り替え", language: "言語",
    start: "スタート", pause: "一時停止", resume: "再開", reset: "リセット",
    focusTime: "集中タイム", breakTime: "休憩タイム",
  },
  zh: {
    settings: "设置", focusMin: "专注时间（分钟）", breakMin: "休息时间（分钟）",
    presets: "预设", notifications: "通知",
    notifyHelp: "通知无法收到？",
    notifyHelpBody: "您需要在操作系统设置和浏览器设置中同时允许通知。",
    officialGuide: "官方指南",
    sound: "提示音", autoSwitch: "自动切换", language: "语言",
    start: "开始", pause: "暂停", resume: "继续", reset: "重置",
    focusTime: "专注时间", breakTime: "休息时间",
  },
  "zh-TW": {
    settings: "設定", focusMin: "專注時間（分鐘）", breakMin: "休息時間（分鐘）",
    presets: "預設", notifications: "通知",
    notifyHelp: "通知無法收到？",
    notifyHelpBody: "您需要在作業系統設定和瀏覽器設定中同時允許通知。",
    officialGuide: "官方指南",
    sound: "提示音", autoSwitch: "自動切換", language: "語言",
    start: "開始", pause: "暫停", resume: "繼續", reset: "重置",
    focusTime: "專注時間", breakTime: "休息時間",
  },
  ko: {
    settings: "설정", focusMin: "집중 시간(분)", breakMin: "휴식 시간(분)",
    presets: "프리셋", notifications: "알림",
    notifyHelp: "알림이 오지 않나요?",
    notifyHelpBody: "OS 설정과 브라우저 설정 모두에서 알림을 허용해야 합니다.",
    officialGuide: "공식 가이드",
    sound: "알림음", autoSwitch: "자동 전환", language: "언어",
    start: "시작", pause: "일시정지", resume: "재개", reset: "초기화",
    focusTime: "집중 시간", breakTime: "휴식 시간",
  },
  es: {
    settings: "Ajustes", focusMin: "Enfoque (min)", breakMin: "Descanso (min)",
    presets: "Preajustes", notifications: "Notificaciones",
    notifyHelp: "¿Las notificaciones no funcionan?",
    notifyHelpBody: "Debes permitir las notificaciones tanto en los ajustes del sistema operativo como en los del navegador.",
    officialGuide: "guía oficial",
    sound: "Sonido", autoSwitch: "Cambio automático", language: "Idioma",
    start: "Iniciar", pause: "Pausar", resume: "Reanudar", reset: "Reiniciar",
    focusTime: "Enfoque", breakTime: "Descanso",
  },
  pt: {
    settings: "Configurações", focusMin: "Foco (min)", breakMin: "Pausa (min)",
    presets: "Predefinições", notifications: "Notificações",
    notifyHelp: "Notificações não estão funcionando?",
    notifyHelpBody: "Você precisa permitir notificações nas configurações do sistema operacional e do navegador.",
    officialGuide: "guia oficial",
    sound: "Som", autoSwitch: "Troca automática", language: "Idioma",
    start: "Iniciar", pause: "Pausar", resume: "Retomar", reset: "Redefinir",
    focusTime: "Foco", breakTime: "Pausa",
  },
  fr: {
    settings: "Paramètres", focusMin: "Concentration (min)", breakMin: "Pause (min)",
    presets: "Préréglages", notifications: "Notifications",
    notifyHelp: "Les notifications ne fonctionnent pas ?",
    notifyHelpBody: "Vous devez autoriser les notifications dans les paramètres de votre OS et de votre navigateur.",
    officialGuide: "guide officiel",
    sound: "Son", autoSwitch: "Changement auto", language: "Langue",
    start: "Démarrer", pause: "Pause", resume: "Reprendre", reset: "Réinitialiser",
    focusTime: "Concentration", breakTime: "Pause",
  },
  de: {
    settings: "Einstellungen", focusMin: "Fokus (Min.)", breakMin: "Pause (Min.)",
    presets: "Voreinstellungen", notifications: "Benachrichtigungen",
    notifyHelp: "Benachrichtigungen funktionieren nicht?",
    notifyHelpBody: "Du musst Benachrichtigungen sowohl in den OS-Einstellungen als auch in den Browsereinstellungen erlauben.",
    officialGuide: "offizielle Anleitung",
    sound: "Ton", autoSwitch: "Automatisch wechseln", language: "Sprache",
    start: "Start", pause: "Pause", resume: "Weiter", reset: "Zurücksetzen",
    focusTime: "Fokuszeit", breakTime: "Pause",
  },
  it: {
    settings: "Impostazioni", focusMin: "Concentrazione (min)", breakMin: "Pausa (min)",
    presets: "Preimpostazioni", notifications: "Notifiche",
    notifyHelp: "Le notifiche non funzionano?",
    notifyHelpBody: "Devi consentire le notifiche nelle impostazioni del sistema operativo e del browser.",
    officialGuide: "guida ufficiale",
    sound: "Suono", autoSwitch: "Cambio automatico", language: "Lingua",
    start: "Inizia", pause: "Pausa", resume: "Riprendi", reset: "Reimposta",
    focusTime: "Concentrazione", breakTime: "Pausa",
  },
  ru: {
    settings: "Настройки", focusMin: "Фокус (мин)", breakMin: "Перерыв (мин)",
    presets: "Пресеты", notifications: "Уведомления",
    notifyHelp: "Уведомления не работают?",
    notifyHelpBody: "Необходимо разрешить уведомления в настройках ОС и браузера.",
    officialGuide: "официальное руководство",
    sound: "Звук", autoSwitch: "Авто-переключение", language: "Язык",
    start: "Старт", pause: "Пауза", resume: "Продолжить", reset: "Сбросить",
    focusTime: "Фокус", breakTime: "Перерыв",
  },
  pl: {
    settings: "Ustawienia", focusMin: "Skupienie (min)", breakMin: "Przerwa (min)",
    presets: "Presety", notifications: "Powiadomienia",
    notifyHelp: "Powiadomienia nie działają?",
    notifyHelpBody: "Musisz zezwolić na powiadomienia zarówno w ustawieniach systemu, jak i przeglądarki.",
    officialGuide: "oficjalny przewodnik",
    sound: "Dźwięk", autoSwitch: "Auto-przełączanie", language: "Język",
    start: "Start", pause: "Pauza", resume: "Wznów", reset: "Resetuj",
    focusTime: "Skupienie", breakTime: "Przerwa",
  },
  nl: {
    settings: "Instellingen", focusMin: "Focus (min)", breakMin: "Pauze (min)",
    presets: "Voorinstellingen", notifications: "Meldingen",
    notifyHelp: "Meldingen werken niet?",
    notifyHelpBody: "Je moet meldingen toestaan in zowel de OS-instellingen als de browserinstellingen.",
    officialGuide: "officiële gids",
    sound: "Geluid", autoSwitch: "Automatisch wisselen", language: "Taal",
    start: "Start", pause: "Pauzeren", resume: "Hervatten", reset: "Opnieuw",
    focusTime: "Focustijd", breakTime: "Pauze",
  },
  sv: {
    settings: "Inställningar", focusMin: "Fokus (min)", breakMin: "Paus (min)",
    presets: "Förinställningar", notifications: "Aviseringar",
    notifyHelp: "Aviseringar fungerar inte?",
    notifyHelpBody: "Du måste tillåta aviseringar i både OS-inställningar och webbläsarinställningar.",
    officialGuide: "officiell guide",
    sound: "Ljud", autoSwitch: "Automatisk växling", language: "Språk",
    start: "Starta", pause: "Pausa", resume: "Återuppta", reset: "Återställ",
    focusTime: "Fokustid", breakTime: "Paus",
  },
  tr: {
    settings: "Ayarlar", focusMin: "Odak (dk)", breakMin: "Mola (dk)",
    presets: "Ön ayarlar", notifications: "Bildirimler",
    notifyHelp: "Bildirimler çalışmıyor mu?",
    notifyHelpBody: "Hem işletim sistemi hem de tarayıcı ayarlarında bildirimlere izin vermeniz gerekiyor.",
    officialGuide: "resmi kılavuz",
    sound: "Ses", autoSwitch: "Otomatik geçiş", language: "Dil",
    start: "Başlat", pause: "Duraklat", resume: "Devam et", reset: "Sıfırla",
    focusTime: "Odak Zamanı", breakTime: "Mola Zamanı",
  },
  ar: {
    settings: "الإعدادات", focusMin: "التركيز (دقيقة)", breakMin: "الاستراحة (دقيقة)",
    presets: "إعدادات مسبقة", notifications: "الإشعارات",
    notifyHelp: "الإشعارات لا تعمل؟",
    notifyHelpBody: "تحتاج إلى السماح بالإشعارات في إعدادات نظام التشغيل والمتصفح.",
    officialGuide: "الدليل الرسمي",
    sound: "الصوت", autoSwitch: "تبديل تلقائي", language: "اللغة",
    start: "ابدأ", pause: "إيقاف مؤقت", resume: "استئناف", reset: "إعادة تعيين",
    focusTime: "وقت التركيز", breakTime: "وقت الاستراحة",
  },
  hi: {
    settings: "सेटिंग्स", focusMin: "फ़ोकस (मिनट)", breakMin: "ब्रेक (मिनट)",
    presets: "प्रीसेट", notifications: "सूचनाएं",
    notifyHelp: "सूचनाएं काम नहीं कर रहीं?",
    notifyHelpBody: "आपको OS सेटिंग्स और ब्राउज़र सेटिंग्स दोनों में सूचनाओं की अनुमति देनी होगी।",
    officialGuide: "आधिकारिक गाइड",
    sound: "ध्वनि", autoSwitch: "स्वचालित स्विच", language: "भाषा",
    start: "शुरू करें", pause: "रोकें", resume: "फिर शुरू करें", reset: "रीसेट",
    focusTime: "फ़ोकस टाइम", breakTime: "ब्रेक टाइम",
  },
  id: {
    settings: "Pengaturan", focusMin: "Fokus (menit)", breakMin: "Istirahat (menit)",
    presets: "Prasetel", notifications: "Notifikasi",
    notifyHelp: "Notifikasi tidak berfungsi?",
    notifyHelpBody: "Anda perlu mengizinkan notifikasi di pengaturan OS dan pengaturan browser.",
    officialGuide: "panduan resmi",
    sound: "Suara", autoSwitch: "Beralih otomatis", language: "Bahasa",
    start: "Mulai", pause: "Jeda", resume: "Lanjutkan", reset: "Reset",
    focusTime: "Waktu Fokus", breakTime: "Waktu Istirahat",
  },
  vi: {
    settings: "Cài đặt", focusMin: "Tập trung (phút)", breakMin: "Nghỉ (phút)",
    presets: "Cài sẵn", notifications: "Thông báo",
    notifyHelp: "Thông báo không hoạt động?",
    notifyHelpBody: "Bạn cần cho phép thông báo trong cả cài đặt hệ điều hành và trình duyệt.",
    officialGuide: "hướng dẫn chính thức",
    sound: "Âm thanh", autoSwitch: "Tự động chuyển", language: "Ngôn ngữ",
    start: "Bắt đầu", pause: "Tạm dừng", resume: "Tiếp tục", reset: "Đặt lại",
    focusTime: "Giờ Tập Trung", breakTime: "Giờ Nghỉ",
  },
  th: {
    settings: "การตั้งค่า", focusMin: "โฟกัส (นาที)", breakMin: "พัก (นาที)",
    presets: "ค่าที่ตั้งไว้", notifications: "การแจ้งเตือน",
    notifyHelp: "การแจ้งเตือนไม่ทำงาน?",
    notifyHelpBody: "คุณต้องอนุญาตการแจ้งเตือนทั้งในการตั้งค่า OS และการตั้งค่าเบราว์เซอร์",
    officialGuide: "คู่มือทางการ",
    sound: "เสียง", autoSwitch: "สลับอัตโนมัติ", language: "ภาษา",
    start: "เริ่ม", pause: "หยุดชั่วคราว", resume: "ดำเนินต่อ", reset: "รีเซ็ต",
    focusTime: "เวลาโฟกัส", breakTime: "เวลาพัก",
  },
};

export function t(lang: Lang) {
  return translations[lang] ?? translations["en"];
}
