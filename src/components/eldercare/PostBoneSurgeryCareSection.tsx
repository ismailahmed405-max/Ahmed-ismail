import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Bone,
  Bed,
  ShieldAlert,
  Activity,
  HeartPulse,
  Apple,
  Clock,
  CheckSquare,
  Square,
  AlertTriangle,
  Info,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Wind,
  Droplets,
  Pill,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const PostBoneSurgeryCareSection: React.FC = () => {
  const { lang, isRTL } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'bedsores' | 'dvt' | 'movement' | 'respiratory' | 'nutrition' | 'checklist'>('bedsores');

  // Interactive 24-hour caregiver turn & hygiene checklist state
  const [checklist, setChecklist] = useState<{ [id: string]: boolean }>({
    'c1': true,
    'c2': true,
    'c3': false,
    'c4': false,
    'c5': true,
    'c6': false,
    'c7': false,
  });

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Banner for Bone Surgery & Bedridden Care */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-extrabold">
            <Bone className="w-4 h-4 text-indigo-400" />
            <span>
              {lang === 'ar'
                ? 'دليل العناية التخصصية بطريحي الفراش بعد جراحات العظام'
                : 'Specialized Care for Bedridden Seniors Post-Orthopedic Surgery'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {lang === 'ar'
              ? 'الرعاية اليومية الدقيقة لكبار السن بعد جراحات العظام وملازمة الفراش'
              : 'Comprehensive Daily Protocols for Immobile Seniors Following Bone Surgeries'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'ar'
              ? 'إرشادات طبية ووقائية إلزامية لحماية المسن بعد جراحات كسور الورك، عظمة الفخذ، تغيير المفاصل، وجراحات العمود الفقري، للوقاية الفعالة من قرح الفراش، التجلطات الوريدية، وضمان التئام العظام بأمان.'
              : 'Vital medical guidelines following hip fractures, femur repair, joint arthroplasty, and spinal surgery to prevent bedsores, deep vein thrombosis (DVT), and accelerate safe recovery.'}
          </p>
        </div>

        {/* Decorative Watermark */}
        <Bed className="absolute -bottom-6 -end-6 w-48 h-48 text-indigo-500/10 pointer-events-none" />
      </div>

      {/* Critical Red Flag Alert */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-extrabold block mb-0.5">
            {lang === 'ar' ? 'علامات طوارئ تستدعي مراجعة المستشفى فوراً:' : 'Red Flag Emergency Symptoms Requiring Immediate Medical Care:'}
          </span>
          {lang === 'ar'
            ? '1. تورم مفاجئ أو سخونة واحمرار في إحدى الساقين أو ربلة الساق (اشتباه جلطة DVT) • 2. ضيق تنفس مفاجئ أو ألم حاد بالصدر • 3. خروج إفرازات أو احمرار متزايد وحرارة عند جرح العملية • 4. دوران طرف القدم للخارج بشكل غير طبيعي مع ألم حاد عند مفصل الورك.'
            : '1. Sudden unilateral calf/leg swelling, warmth, or redness (suspected DVT) • 2. Acute shortness of breath or sudden chest pain • 3. Purulent discharge, heat, or severe redness around surgical incision • 4. Extreme groin pain or abnormal external rotation of the operated leg.'}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => setActiveSubTab('bedsores')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer shrink-0 ${
            activeSubTab === 'bedsores'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <RotateCw className="w-4 h-4" />
          <span>{lang === 'ar' ? 'منع قرح الفراش (التقليب)' : 'Bedsore Prevention'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dvt')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer shrink-0 ${
            activeSubTab === 'dvt'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>{lang === 'ar' ? 'منع جلطات الساق (DVT)' : 'DVT & Clot Prevention'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('movement')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer shrink-0 ${
            activeSubTab === 'movement'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Bone className="w-4 h-4" />
          <span>{lang === 'ar' ? 'احتياطات المفصل والتقليب' : 'Joint Precautions & Log-Roll'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('respiratory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer shrink-0 ${
            activeSubTab === 'respiratory'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>{lang === 'ar' ? 'تمارين التنفس والرئتين' : 'Respiratory Hygiene'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nutrition')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer shrink-0 ${
            activeSubTab === 'nutrition'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Apple className="w-4 h-4" />
          <span>{lang === 'ar' ? 'تغذية التئام العظام ومنع الإمساك' : 'Bone Healing Nutrition'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('checklist')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer shrink-0 ${
            activeSubTab === 'checklist'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>{lang === 'ar' ? 'جدول المتابعة اليومي' : 'Daily Shift Checklist'}</span>
        </button>
      </div>

      {/* SUBTAB 1: Bedsore Prevention */}
      {activeSubTab === 'bedsores' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <RotateCw className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                {lang === 'ar' ? 'التقليب كل ساعتين (قاعدة الـ 30 درجة)' : '2-Hour Repositioning (30° Tilt)'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'يجب عدم ترك كبير السن مستلقياً على ظهره باستمرار. يتم تعديل الوضعية كل ساعتين بالنهار وكل 3 ساعات بالليل بزاوية ميل 30 درجة باستخدام وسائد خلف الظهر لتفريغ الضغط عن العصعص وأسفل الظهر.'
                  : 'Reposition the patient every 2 hours during the day and 3 hours at night using a 30-degree tilt with supporting pillows behind the back to relieve pressure on the sacrum.'}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Bed className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                {lang === 'ar' ? 'المرتبة الهوائية وتطويف الكعبين' : 'Air Mattress & Floating Heels'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'استخدام مرتبة هوائية ديناميكية متناوبة الضغط ضروري جداً. كما يجب وضع وسادة ممتدة تحت بطة الساقين لرفع الكعبين في الهواء (Heel Floating) بحيث لا يلمس كعب القدم سطح الفراش نهائياً.'
                  : 'An alternating pressure air mattress is essential. Always place a pillow under the lower calves to elevate and float the heels off the mattress surface completely.'}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                {lang === 'ar' ? 'العناية بالجلد وكريمات الحماية' : 'Skin Hygiene & Barrier Creams'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'الحفاظ على جفاف الجلد التام وتنظيفه بماء فاتر وغسول لطيف خالٍ من الكحول مع التجفيف بالطبطبة. تطبيق كريم عازل يحتوي على أكسيد الزنك (Zinc Oxide) على مناطق الضغط لحماية الجلد من البلل.'
                  : 'Keep skin thoroughly clean and dry using lukewarm water and alcohol-free wash. Apply zinc oxide barrier cream over pressure points to prevent moisture breakdown.'}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'ar' ? 'نقاط الضغط الأكثر عرضة للقرح لدى طريحي الفراش بعد العمليات:' : 'High-Risk Pressure Points in Bedridden Patients:'}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-700">
              <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-center">
                {lang === 'ar' ? '1. كعب القدمين (الأكثر خطورة)' : '1. Heels (Highest Risk)'}
              </div>
              <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-center">
                {lang === 'ar' ? '2. عظم العصعص وأسفل الظهر' : '2. Sacrum & Tailbone'}
              </div>
              <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-center">
                {lang === 'ar' ? '3. عظمتي الورك الجانبيتين' : '3. Greater Trochanters'}
              </div>
              <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-center">
                {lang === 'ar' ? '4. لوحي الكتف والكوعين' : '4. Shoulder Blades & Elbows'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: DVT & Blood Clots Prevention */}
      {activeSubTab === 'dvt' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm">
                <HeartPulse className="w-5 h-5" />
                <span>{lang === 'ar' ? 'تمرين مضخة الكاحل في السرير (Ankle Pumps)' : 'Ankle Pump Exercises'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'بما أن المسن لا يستطيع المشي، فإن انقباض عضلات ربلة الساق (السمانة) هو المضخة الوحيدة لعودة الدم إلى القلب. يتم تشجيع المريض على ثني أصابع ومشط قدمه للأعلى نحو صدره ثم مدهما للأسفل 20 مرة كل ساعة أثناء استيقاظه.'
                  : 'Since the senior cannot walk, calf muscle contractions act as the primary pump returning venous blood to the heart. Encourage flexion and extension of both ankles 20 times every waking hour.'}
              </p>
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-xs text-indigo-950 font-semibold">
                {lang === 'ar' ? '💡 نصيحة: إذا كان المسن ضعيفاً، يمكن للمرافق تحريك الكاحل له برفق (Passive Range of Motion).' : '💡 Tip: If senior is fatigued, the caregiver can gently move the ankles in passive motion.'}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>{lang === 'ar' ? 'الجوارب الضاغطة ومضادات التخثر الموصوفة' : 'Compression Stockings & Anticoagulants'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'ارتداء الجوارب الطبية الضاغطة المانعة للانسداد (TED Stockings) بالنهار وخلعها لفحص الجلد وغسل القدمين يومياً. الالتزام بمواعيد حقن أو أقراص السيولة الموصوفة من جراح العظام (مثل كليكسان أو زاريلتو) دون تأخير أو إيقاف ذاتي.'
                  : 'Wear graduated compression (TED) stockings during daytime, removing them daily to inspect skin and wash feet. Strictly adhere to prescribed anticoagulants (e.g. Enoxaparin/Clexane or Rivaroxaban) as directed by the orthopedic surgeon.'}
              </p>
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl text-xs text-rose-950 font-semibold">
                {lang === 'ar' ? '⚠️ تحذير: لا تقم بتدليك ربلة الساق بقوة أبداً، فقد يتسبب التدليك في تحريك أي خثرة دموية.' : '⚠️ Warning: Never vigorously massage swollen calves, as this could dislodge an existing clot.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Movement & Log-Rolling */}
      {activeSubTab === 'movement' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4">
            <h4 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Bone className="w-5 h-5 text-indigo-600" />
              <span>
                {lang === 'ar'
                  ? 'احتياطات مفصل الورك وعظم الفخذ بعد العملية (Hip & Bone Precautions)'
                  : 'Orthopedic Hip & Femur Safety Protocols'}
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-rose-700 block">
                  {lang === 'ar' ? '❌ ممنوع ثني الورك > 90°' : '❌ No Hip Flexion > 90°'}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ar'
                    ? 'لا تجعل المسن ينحني للأمام للوصول إلى أقدامه أو يرفع ركبتيه أعلى من مستوى الحوض أثناء الجلوس في السرير.'
                    : 'Do not allow the patient to lean forward or pull knees higher than hip level when raising the head of the bed.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-emerald-700 block">
                  {lang === 'ar' ? '✅ وسادة المباعدة الإلزامية' : '✅ Abduction Pillow Between Legs'}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ar'
                    ? 'وضع وسادة عريضة سميكة بين ركبتي المسن وساقيه دائماً لمنع تقاطع الساقين (Crossed Legs) الذي قد يؤدي لخلع المفصل الصناعي.'
                    : 'Always place a firm pillow between knees to keep legs slightly separated and prevent cross-legged adduction.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-indigo-700 block">
                  {lang === 'ar' ? '✅ تقنية التدحرج كقطعة واحدة' : '✅ Log-Rolling Technique'}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ar'
                    ? 'عند تقليب المسن على جنبه، يجب أن يدور الكتف والحوض والركبتان معاً في نفس اللحظة ككتلة واحدة مستقيمة دون أي التواء في الظهر أو الورك.'
                    : 'When turning the patient, roll the shoulders, hips, and knees simultaneously as one straight unit without spinal twisting.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Respiratory Hygiene */}
      {activeSubTab === 'respiratory' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center gap-2 text-sky-600 font-extrabold text-sm">
              <Wind className="w-5 h-5" />
              <span>{lang === 'ar' ? 'حماية الرئتين ومنع الالتهاب الرئوي الركودي (Hypostatic Pneumonia)' : 'Preventing Hypostatic Pneumonia in Bedridden Seniors'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'استلقاء كبار السن لفترات طويلة يقلل من تمدد الحويصلات الهوائية السفلية ويؤدي لتراكم الإفرازات داخل الرئتين، مما يسبب عدوى بكتيرية خطيرة.'
                : 'Prolonged supine positioning causes shallow breathing, atelectasis, and pooling of bronchial secretions leading to secondary bacterial pneumonia.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs space-y-1.5">
                <span className="font-extrabold text-sky-900 block">
                  {lang === 'ar' ? '1. تمارين التنفس العميق والسعال الوقائي' : '1. Deep Breathing & Coughing Drill'}
                </span>
                <p className="text-slate-600">
                  {lang === 'ar'
                    ? 'أخذ 5 أنفاس عميقة بطيئة وحبس النفس لمدة ثانيتين ثم إخراجه بهدوء، يتبعه كحة وقائية خفيفة لطرد البلغم، وتكرار ذلك كل ساعتين.'
                    : 'Instruct the senior to take 5 deep slow breaths, hold for 2 seconds, exhale gently, then perform a light therapeutic cough.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-1.5">
                <span className="font-extrabold text-indigo-900 block">
                  {lang === 'ar' ? '2. رفع زاوية الرأس والصدر عند الأكل واليقظة' : '2. Head-of-Bed Elevation (30° - 45°)'}
                </span>
                <p className="text-slate-600">
                  {lang === 'ar'
                    ? 'رفع ظهر السرير بزاوية 30 إلى 45 درجة أثناء تناول الوجبات وشرب السوائل لمنع دخول الطعام في مجرى التنفس (الشرقة والشفط الرئوي).'
                    : 'Maintain bed angle at 30-45 degrees during all meals and hydration to prevent silent aspiration into the airway.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: Bone Healing Nutrition & Bowel Care */}
      {activeSubTab === 'nutrition' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-sm">
                <Apple className="w-5 h-5" />
                <span>{lang === 'ar' ? 'عناصر التئام العظام وتجديد الأنسجة' : 'Bone Union & Repair Nutrients'}</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>{lang === 'ar' ? 'البروتين عالي القيمة:' : 'High Biological Value Protein:'}</strong> {lang === 'ar' ? 'بيض مسلوق، لحوم بيضاء لينة، شوربة عظام، وألبان لدعم تكوين الكولاجين والكالس العظمي.' : 'Eggs, soft poultry, bone broths, and dairy for collagen matrix formation.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>{lang === 'ar' ? 'الكالسيوم وفيتامين D3:' : 'Calcium & Vitamin D3:'}</strong> {lang === 'ar' ? 'ضروريان لإعادة تمعدن العظم المكسور ومنع الهشاشة الثانوية لقلة الحركة.' : 'Vital for remineralizing bone calluses and preventing disuse osteoporosis.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>{lang === 'ar' ? 'فيتامين C والزنك:' : 'Vitamin C & Zinc:'}</strong> {lang === 'ar' ? 'حمضيات طازجة، جوافة، بذور القرع لتسريع التئام الجرح الجراحي ومقاومة العدوى.' : 'Citrus, guava, and pumpkin seeds for surgical wound tensile strength.'}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-600 font-extrabold text-sm">
                <Droplets className="w-5 h-5" />
                <span>{lang === 'ar' ? 'الوقاية من الإمساك الناتج عن السرير والمسكنات' : 'Preventing Severe Opioid & Bedrest Constipation'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'قلة الحركة وتناول مسكنات الألم القوية (مثل الترامادول أو المسكنات الأفيونية) تسبب شللاً مؤقتاً في حركة الأمعاء وإمساكاً شديداً قد يرفع ضغط الدم ويزعج المسن.'
                  : 'Immobility combined with post-op analgesics substantially slows intestinal peristalsis, causing severe fecal impaction if unmanaged.'}
              </p>
              <div className="p-3 bg-amber-50 rounded-2xl text-xs text-amber-950 font-semibold space-y-1">
                <div>• {lang === 'ar' ? 'شرب 6 إلى 8 أكواب ماء وسوائل دافئة موزعة على مدار اليوم.' : 'Provide 6-8 cups of fluids and warm broths evenly distributed.'}</div>
                <div>• {lang === 'ar' ? 'منقوع القراصيا (البرقوق المجفف)، الشوفان، وخضار مطهو جيداً.' : 'Include stewed prunes, oats, and well-cooked fibrous vegetables.'}</div>
                <div>• {lang === 'ar' ? 'استشارة الطبيب لوصف ملين أوسموزي خفيف (مثل اللاكتيلوز أو بولي إيثيلين جليكول).' : 'Request a gentle osmotic stool softener (e.g. lactulose) from the doctor.'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 6: Interactive Shift Checklist */}
      {activeSubTab === 'checklist' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                {lang === 'ar' ? 'قائمة المتابعة اليومية للمرافق المناوب (Shift Checklist)' : 'Caregiver 24-Hour Shift Checklist'}
              </h4>
              <p className="text-xs text-slate-500">
                {lang === 'ar'
                  ? 'ضع علامة على المهام المنجزة لطمأنة باقي أفراد الأسرة أثناء نوبتك'
                  : 'Mark completed shift tasks to keep other family members informed'}
              </p>
            </div>

            <div className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
              {Object.values(checklist).filter(Boolean).length} / {Object.keys(checklist).length} {lang === 'ar' ? 'مكتمل' : 'completed'}
            </div>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'c1',
                titleAr: 'التقليب الدوري كل ساعتين وتغيير زاوية الاستلقاء (مع وسادة الظهر)',
                titleEn: '2-hour repositioning tilt completed with back support pillows',
                category: lang === 'ar' ? 'قرح الفراش' : 'Bedsores'
              },
              {
                id: 'c2',
                titleAr: 'تطويف الكعبين عن المرتبة والتأكد من وسادة المباعدة بين الركبتين',
                titleEn: 'Heels floated off mattress and abduction pillow checked',
                category: lang === 'ar' ? 'المفصل' : 'Joint'
              },
              {
                id: 'c3',
                titleAr: 'إجراء تمارين مشط القدم (مضخة الكاحل) 20 مرة لتنشيط الدورة الدموية',
                titleEn: 'Completed 20 ankle pump drills to promote venous blood return',
                category: lang === 'ar' ? 'الجلطات' : 'DVT'
              },
              {
                id: 'c4',
                titleAr: 'تمارين التنفس العميق 5 مرات ورفع رأس السرير بزاوية مريحة',
                titleEn: '5 deep breath expansion cycles and head-of-bed elevation',
                category: lang === 'ar' ? 'الرئتين' : 'Lungs'
              },
              {
                id: 'c5',
                titleAr: 'فحص جفاف الجلد وتطبيق كريم العزل الواقي على مناطق الاحتكاك',
                titleEn: 'Skin moisture barrier cream inspected and reapplied',
                category: lang === 'ar' ? 'الجلد' : 'Skin'
              },
              {
                id: 'c6',
                titleAr: 'إعطاء حقنة أو قرص السيولة الموصوف من جراح العظام في موعده',
                titleEn: 'Prescribed anticoagulant dosage administered on schedule',
                category: lang === 'ar' ? 'الأدوية' : 'Meds'
              },
              {
                id: 'c7',
                titleAr: 'تقديم السوائل الدافئة ووجبة غنية بالبروتين والكالسيوم لالتئام العظام',
                titleEn: 'Warm hydration and bone healing high-protein meal served',
                category: lang === 'ar' ? 'التغذية' : 'Nutrition'
              }
            ].map((item) => {
              const isDone = !!checklist[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                      : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={isDone ? 'text-emerald-600' : 'text-slate-400'}>
                      {isDone ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs font-bold leading-snug ${isDone ? 'line-through text-slate-500' : ''}`}>
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
