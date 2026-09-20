import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en' | 'fr' | 'es' | 'de' | 'tr' | 'ja';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦', region: 'الشرق الأوسط' },
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸', region: 'United States & UK' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷', region: 'France & Europe' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸', region: 'España & América Latina' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪', region: 'Deutschland' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', flag: '🇹🇷', region: 'Türkiye' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵', region: '日本' },
];

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  mercyWord: string;
}

const mercyTranslations: Record<Language, string> = {
  ar: 'الرحمة والإحسان بركيزة الوفاء',
  en: 'Mercy, Compassion & Respect',
  fr: 'La Miséricorde et la Bienveillance',
  es: 'La Compasión, el Cariño y el Cuidado',
  de: 'Barmherzigkeit und Fürsorge',
  tr: 'Şefkat, Merhamet ve Sevgi Dolu Bakım',
  ja: '慈しみと思いやり、敬愛の心',
};

const translations: Record<Language, Record<string, string>> = {
  ar: {
    appTitle: 'KinCare • رعاية كبار السن',
    appSubtitle: 'التنسيق العائلي الموحد لجدول الأدوية ومواعيد الأطباء ورعاية طريحي الفراش',
    installApp: 'تثبيت التطبيق على هاتفك',
    installSubtitle: 'يعمل كتطبيق حقيقي على آيفون وأندرويد بدون متجر وبدون إنترنت',
    shareApp: 'مشاركة مع العائلة',
    activeCaregiver: 'المسؤول المناوب حالياً',
    medications: 'أدوية الذاكرة',
    doctorVisits: 'مواعيد الأطباء والتقييمات',
    vitalsAndNotes: 'المؤشرات الحيوية والملاحظات',
    whatsappReport: 'تقرير واتساب العائلي',
    boneSurgeryCare: 'رعاية طريحي الفراش بعد جراحات العظام',
    upcomingVisits: 'المواعيد القادمة',
    assignedDriver: 'المرافق المكلف',
    doctorQuestions: 'أسئلة للطبيب',
    addQuestion: 'إضافة سؤال للطبيب',
    bloodPressure: 'ضغط الدم',
    bloodSugar: 'سكر الدم',
    temperature: 'الحرارة',
    heartRate: 'نبض القلب',
    logVitals: 'تسجيل قراءة جديدة',
    allergies: 'الحساسية',
    conditions: 'الحالات الصحية',
    primaryDoctor: 'الطبيب الرئيسي',
    emergencyContact: 'طوارئ العائلة',
    pharmacy: 'الصيدلية المعتمدة',
    close: 'إغلاق',
    copyLink: 'نسخ رابط التطبيق',
    linkCopied: 'تم نسخ الرابط بنجاح!',
    offlineReady: 'يعمل بدون اتصال بالإنترنت',
  },
  en: {
    appTitle: 'KinCare • Elder Care Hub',
    appSubtitle: 'Unified family care for memory medications, doctor visits, and bedridden care',
    installApp: 'Install App on Phone',
    installSubtitle: 'Runs like a native app on iPhone & Android with zero installation fees',
    shareApp: 'Share with Siblings',
    activeCaregiver: 'Active Caregiver on Duty',
    medications: 'Memory Medications',
    doctorVisits: 'Doctor Visits & Reviews',
    vitalsAndNotes: 'Vitals & Handover Notes',
    whatsappReport: 'Family WhatsApp Digest',
    boneSurgeryCare: 'Post-Orthopedic Bedridden Care',
    upcomingVisits: 'Upcoming Visits',
    assignedDriver: 'Assigned Escort',
    doctorQuestions: 'Questions for Doctor',
    addQuestion: 'Add Question for Doctor',
    bloodPressure: 'Blood Pressure',
    bloodSugar: 'Blood Sugar',
    temperature: 'Temperature',
    heartRate: 'Heart Rate',
    logVitals: 'Log New Vitals',
    allergies: 'Allergies',
    conditions: 'Chronic Conditions',
    primaryDoctor: 'Primary Doctor',
    emergencyContact: 'Emergency Contact',
    pharmacy: 'Preferred Pharmacy',
    close: 'Close',
    copyLink: 'Copy App Link',
    linkCopied: 'Link copied to clipboard!',
    offlineReady: 'Works Offline with Local Storage',
  },
  fr: {
    appTitle: 'KinCare • Soins des Aînés',
    appSubtitle: 'Coordination familiale pour les médicaments de la mémoire, visites et soins alités',
    installApp: "Installer l'application",
    installSubtitle: 'Fonctionne comme une application native sans magasin',
    shareApp: 'Partager avec la famille',
    activeCaregiver: 'Aidant actif en service',
    medications: 'Médicaments de la Mémoire',
    doctorVisits: 'Visites Médicales & Avis',
    vitalsAndNotes: 'Constantes & Notes de Transmission',
    whatsappReport: 'Rapport Familial WhatsApp',
    boneSurgeryCare: 'Soins Post-Chirurgie Osseuse Alité',
    upcomingVisits: 'Prochaines Visites',
    assignedDriver: 'Accompagnant Assigné',
    doctorQuestions: 'Questions pour le Médecin',
    addQuestion: 'Ajouter une question',
    bloodPressure: 'Tension Artérielle',
    bloodSugar: 'Glycémie',
    temperature: 'Température',
    heartRate: 'Pouls',
    logVitals: 'Enregistrer constantes',
    allergies: 'Allergies',
    conditions: 'Conditions Chroniques',
    primaryDoctor: 'Médecin Traitant',
    emergencyContact: "Contact d'Urgence",
    pharmacy: 'Pharmacie Référente',
    close: 'Fermer',
    copyLink: 'Copier le lien',
    linkCopied: 'Lien copié avec succès !',
    offlineReady: 'Fonctionne hors ligne',
  },
  es: {
    appTitle: 'KinCare • Cuidado del Mayor',
    appSubtitle: 'Coordinación familiar para medicamentos de memoria, médicos y pacientes encamados',
    installApp: 'Instalar en el Teléfono',
    installSubtitle: 'Funciona como una app nativa en iPhone y Android',
    shareApp: 'Compartir con Hermanos',
    activeCaregiver: 'Cuidador de Turno',
    medications: 'Medicamentos de la Memoria',
    doctorVisits: 'Citas Médicas y Reseñas',
    vitalsAndNotes: 'Signos Vitales y Notas',
    whatsappReport: 'Resumen Familiar de WhatsApp',
    boneSurgeryCare: 'Cuidados de Cirugía Ósea y Encamados',
    upcomingVisits: 'Próximas Citas',
    assignedDriver: 'Acompañante Asignado',
    doctorQuestions: 'Preguntas para el Médico',
    addQuestion: 'Añadir pregunta',
    bloodPressure: 'Presión Arterial',
    bloodSugar: 'Glucosa',
    temperature: 'Temperatura',
    heartRate: 'Frecuencia Cardíaca',
    logVitals: 'Registrar Signos',
    allergies: 'Alergias',
    conditions: 'Condiciones Crónicas',
    primaryDoctor: 'Médico Principal',
    emergencyContact: 'Contacto de Emergencia',
    pharmacy: 'Farmacia Preferida',
    close: 'Cerrar',
    copyLink: 'Copiar enlace',
    linkCopied: '¡Enlace copiado!',
    offlineReady: 'Funciona sin conexión',
  },
  de: {
    appTitle: 'KinCare • Seniorenpflege',
    appSubtitle: 'Familienkoordination für Gedächtnismedikamente, Arzttermine & bettlägerige Pflege',
    installApp: 'App auf Telefon installieren',
    installSubtitle: 'Läuft wie eine native App ohne App-Store-Zwang',
    shareApp: 'Mit Geschwistern teilen',
    activeCaregiver: 'Diensthabende Pflegeperson',
    medications: 'Gedächtnismedikamente',
    doctorVisits: 'Arztbesuche & Bewertungen',
    vitalsAndNotes: 'Vitalwerte & Pflegeberichte',
    whatsappReport: 'Familien-WhatsApp-Bericht',
    boneSurgeryCare: 'Pflege nach Knochen-OP & Bettlägerigkeit',
    upcomingVisits: 'Anstehende Termine',
    assignedDriver: 'Begleitperson',
    doctorQuestions: 'Fragen an den Arzt',
    addQuestion: 'Frage hinzufügen',
    bloodPressure: 'Blutdruck',
    bloodSugar: 'Blutzucker',
    temperature: 'Temperatur',
    heartRate: 'Herzfrequenz',
    logVitals: 'Neue Werte erfassen',
    allergies: 'Allergien',
    conditions: 'Chronische Leiden',
    primaryDoctor: 'Hausarzt',
    emergencyContact: 'Notfallkontakt',
    pharmacy: 'Apotheke',
    close: 'Schließen',
    copyLink: 'Link kopieren',
    linkCopied: 'Link kopiert!',
    offlineReady: 'Offline funktionsfähig',
  },
  tr: {
    appTitle: 'KinCare • Yaşlı Bakımı',
    appSubtitle: 'Hafıza ilaçları, doktor randevuları ve yatağa bağımlı bakım için aile platformu',
    installApp: 'Uygulamayı Telefona Yükle',
    installSubtitle: 'iPhone ve Android cihazlarda yerel uygulama gibi çalışır',
    shareApp: 'Aileyle Paylaş',
    activeCaregiver: 'Nöbetçi Aile Üyesi',
    medications: 'Hafıza İlaçları Rehberi',
    doctorVisits: 'Doktor Randevuları & Değerlendirmeler',
    vitalsAndNotes: 'Hayati Değerler & Bakım Notları',
    whatsappReport: 'WhatsApp Aile Raporu',
    boneSurgeryCare: 'Kemik Ameliyatı Sonrası Yatalak Bakımı',
    upcomingVisits: 'Yaklaşan Randevular',
    assignedDriver: 'Refakatçi',
    doctorQuestions: 'Doktora Sorular',
    addQuestion: 'Soru Ekle',
    bloodPressure: 'Tansiyon',
    bloodSugar: 'Kan Şekeri',
    temperature: 'Vücut Sıcaklığı',
    heartRate: 'Nabız',
    logVitals: 'Yeni Değer Kaydet',
    allergies: 'Alerjiler',
    conditions: 'Kronik Rahatsızlıklar',
    primaryDoctor: 'Ana Doktor',
    emergencyContact: 'Acil Durum İletişimi',
    pharmacy: 'Yetkili Eczane',
    close: 'Kapat',
    copyLink: 'Bağlantıyı Kopyala',
    linkCopied: 'Bağlantı kopyalandı!',
    offlineReady: 'Çevrimdışı çalışır',
  },
  ja: {
    appTitle: 'KinCare • シニア介護ハブ',
    appSubtitle: '記憶サポート薬、通院スケジュール、骨折・術後の寝たきりケアを家族で共有',
    installApp: 'アプリをスマホにインストール',
    installSubtitle: 'ストア不要でホーム画面から素早く起動',
    shareApp: '家族と共有',
    activeCaregiver: '本日の担当介護者',
    medications: '記憶・脳機能サポート薬',
    doctorVisits: '通院予定とドクター評価',
    vitalsAndNotes: 'バイタル記録と申し送り',
    whatsappReport: '家族向けレポート共有',
    boneSurgeryCare: '骨手術後・寝たきりシニアの専門ケア',
    upcomingVisits: '次回の通院',
    assignedDriver: '付き添い担当',
    doctorQuestions: '医師への質問メモ',
    addQuestion: '質問を追加',
    bloodPressure: '血圧',
    bloodSugar: '血糖値',
    temperature: '体温',
    heartRate: '脈拍',
    logVitals: 'バイタルを記録',
    allergies: 'アレルギー',
    conditions: '持病・既往歴',
    primaryDoctor: 'かかりつけ医',
    emergencyContact: '緊急連絡先',
    pharmacy: 'かかりつけ薬局',
    close: '閉じる',
    copyLink: 'リンクをコピー',
    linkCopied: 'リンクをコピーしました！',
    offlineReady: 'オフライン対応',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  setLang: () => {},
  t: (key) => key,
  isRTL: true,
  mercyWord: 'الرحمة',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('kincare_lang');
    if (saved && (saved in translations)) {
      return saved as Language;
    }
    return 'ar';
  });

  useEffect(() => {
    localStorage.setItem('kincare_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en?.[key] || key;
  };

  const isRTL = lang === 'ar';
  const mercyWord = mercyTranslations[lang] || mercyTranslations.ar;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL, mercyWord }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
