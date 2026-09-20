import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Heart,
  Pill,
  Stethoscope,
  Activity,
  MapPin,
  ShieldCheck,
  Clock,
  Share2,
  PhoneCall,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Bone,
} from 'lucide-react';
import { getCultureAsset } from '../../utils/cultureAssets';

interface Props {
  onOpenMap: () => void;
  onGoToCareDashboard: () => void;
  onOpenWhatsAppModal?: () => void;
}

export const ElderCareIntroHome: React.FC<Props> = ({
  onOpenMap,
  onGoToCareDashboard,
  onOpenWhatsAppModal,
}) => {
  const { lang, isRTL, mercyWord } = useLanguage();
  const culture = getCultureAsset(lang);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Visual Introduction with Culturally Adaptive Senior Imagery */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-900 to-slate-900 text-white shadow-lg">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={culture.heroCharacterImg}
            alt={culture.heroCharacterAlt}
            className="w-full h-full object-cover object-center opacity-90 hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Warm Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Hero Floating Content */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-xs font-extrabold mb-3">
              <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>{culture.characterTitle}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-2xl leading-snug">
              {culture.cultureGreeting}
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed font-normal">
              {lang === 'ar'
                ? 'تطبيق عائلي متكامل يُسهل متابعة مواعيد الأدوية، مرافقة الفحوصات الطبية، تسجيل المؤشرات الحيوية، وتنسيق الرعاية اليومية بين أفراد الأسرة في أي وقت.'
                : 'A dedicated family platform to coordinate medication schedules, doctor appointments, vital health logs, and reassuring daily care for elderly parents.'}
            </p>

            {/* Quick Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                id="hero-go-to-care-hub-btn"
                onClick={onGoToCareDashboard}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition shadow-md cursor-pointer hover:shadow-emerald-600/30"
              >
                <span>{lang === 'ar' ? 'دخول لوحة الرعاية والجدول' : 'Open Care Dashboard'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                id="hero-open-map-btn"
                onClick={onOpenMap}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-extrabold text-xs sm:text-sm transition cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-sky-300" />
                <span>{lang === 'ar' ? 'خريطة أقرب صيدلية ومستشفى' : 'Nearby Pharmacy & Hospital Map'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Elder Care Provided by KinCare */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {lang === 'ar' ? 'كيف يُعينك التطبيق على رعاية كبير السن؟' : 'How KinCare Supports Elder Care'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {lang === 'ar'
              ? 'أربعة محاور أساسية لتوفير العناية الصحية والراحة النفسية لكبار السن'
              : 'Four core pillars designed to provide safety, dignity, and family harmony'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Visual Medication */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-emerald-300 hover:shadow-sm transition group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1.5">
              {lang === 'ar' ? 'جدولة الأدوية بالصور' : 'Visual Medication Schedule'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar'
                ? 'صور واقعية مكبرة للأقراص والكبسولات لمنع الالتباس، مع تنظيم الجرعات وتنبيهات إعادة التعبئة قبل نفاد الدواء.'
                : 'Clear photos of each pill to prevent confusion, organized morning to bedtime with low-stock refill reminders.'}
            </p>
          </div>

          {/* Card 2: Doctor Visits & Transport */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-sky-300 hover:shadow-sm transition group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1.5">
              {lang === 'ar' ? 'مواعيد الأطباء والمرافقة' : 'Doctor Visits & Transport'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar'
                ? 'تنسيق مواعيد العيادات، تدوين أسئلة الإخوة للطبيب مسبقاً، وتحديد المرافق ووسيلة النقل المريحة لكبير السن.'
                : 'Organize clinic visits, compile family questions for doctors, and coordinate assisted transportation.'}
            </p>
          </div>

          {/* Card 3: Vitals & Health Notes */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-amber-300 hover:shadow-sm transition group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1.5">
              {lang === 'ar' ? 'المؤشرات الحيوية واليوميات' : 'Vitals & Daily Updates'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar'
                ? 'تسجيل قياسات ضغط الدم والسكر والنبض، وتدوين الملاحظات اليومية لطمأنة جميع أفراد الأسرة باستمرار.'
                : 'Track blood pressure, glucose, and heart rate with a shared diary to keep everyone in the family reassured.'}
            </p>
          </div>

          {/* Card 4: Nearby Facilities Map */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-indigo-300 hover:shadow-sm transition group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1.5">
              {lang === 'ar' ? 'خريطة الصيدليات والطوارئ' : 'Emergency & Pharmacy Map'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ar'
                ? 'خريطة تفاعلية للوصول المباشر إلى أقرب صيدليات خدمة 24 ساعة ومستشفيات الطوارئ مع الاتصال السريع والاتجاهات.'
                : 'Interactive map locating 24/7 pharmacies and emergency medical centers with instant phone call and turn-by-turn routes.'}
            </p>
          </div>
        </div>
      </section>

      {/* Visual Touching Highlight Section with Warm Photo */}
      <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="order-2 md:order-1 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'ar' ? 'برٌّ ووفاء في كل خطوة' : 'Compassion in Every Step'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {lang === 'ar'
                ? 'كبار السن بركة بيوتنا؛ رعايتهم شرف وطمأنينتهم أمانة'
                : 'Caring for our parents is an honor and a sacred duty'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'مع تقدم السن، تتعدد متطلبات الرعاية من مواعيد الأدوية بدقة إلى المتابعة الدورية. صُمم هذا التطبيق ليكون رفيقاً سهلاً وبسيطاً يجمع جهود الأبناء والمرافقين في مكان واحد، دون تعقيد أو تشتت.'
                : 'As our loved ones age, their medical needs require coordination. KinCare simplifies daily care, medication schedules, and clinic appointments in a unified, gentle interface.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="intro-start-care-btn"
                onClick={onGoToCareDashboard}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-extrabold transition shadow-xs cursor-pointer"
              >
                <span>{lang === 'ar' ? 'ابدأ تنظيم الرعاية الآن' : 'Start Coordinating Care'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                id="intro-map-btn"
                onClick={onOpenMap}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-extrabold transition cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ar' ? 'أقرب صيدلية ومستشفى' : 'Nearby Pharmacy & ER'}</span>
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <img
                src={culture.handCareImg}
                alt={culture.heroCharacterAlt}
                className="w-full h-56 sm:h-72 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end items-center p-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/25 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs font-black mb-1">
                  <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  <span>{lang === 'ar' ? 'الرحمة' : 'Mercy & Care'}</span>
                </div>
                <p className="text-white text-xs sm:text-sm font-black tracking-wide drop-shadow-sm">
                  {mercyWord}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Peace of Mind Summary Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-start">
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'ar' ? 'حفظ البيانات محلياً وبأمان تام' : 'Secure & Private Storage'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            {lang === 'ar'
              ? 'جاهز للاستخدام الفوري لخدمة كبار السن وعائلاتهم'
              : 'Ready to care for seniors and their families instantly'}
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            {lang === 'ar'
              ? 'يمكنك إضافة الأدوية، تتبع مواعيد العيادات، أو استعراض المرافق الطبية القريبة بنقرة واحدة.'
              : 'Log medications, plan doctor visits, or discover nearby medical facilities with 1 tap.'}
          </p>
        </div>

        <button
          id="intro-bottom-care-btn"
          onClick={onGoToCareDashboard}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition shadow-lg cursor-pointer"
        >
          <span>{lang === 'ar' ? 'الانتقال للوحة الرعاية' : 'Go to Care Dashboard'}</span>
          <ArrowIcon className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
