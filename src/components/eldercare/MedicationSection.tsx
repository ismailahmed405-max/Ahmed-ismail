import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MEMORY_MEDICATIONS } from '../../data/memoryMedicationsData';
import { MemoryMedication, Sibling } from '../../types';
import seniorMemoryImg from '../../assets/images/senior_memory_care_1789913332678.jpg';
import {
  Brain,
  Search,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Info,
  MapPin,
  FileText,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  AlertCircle,
  Pill,
} from 'lucide-react';

interface Props {
  activeSibling?: Sibling;
  onOpenMap?: (type: 'pharmacy' | 'hospital') => void;
  // Kept for backward interface compatibility if needed by parent
  medications?: any[];
  onToggleTaken?: (id: string) => void;
  onAddMedication?: (med: any) => void;
  onUpdateRefill?: (id: string, pillsAdded: number) => void;
}

export const MedicationSection: React.FC<Props> = ({ onOpenMap }) => {
  const { lang, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDetailMed, setActiveDetailMed] = useState<MemoryMedication | null>(null);
  const [copiedMedId, setCopiedMedId] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories = [
    { id: 'all', labelAr: 'جميع أدوية الذاكرة والمكملات', labelEn: 'All Memory Meds & Supplements', count: MEMORY_MEDICATIONS.length },
    { id: 'cholinesterase', labelAr: 'مثبطات الكولين إستراز (تعزيز النواقل)', labelEn: 'Cholinesterase Inhibitors', count: MEMORY_MEDICATIONS.filter(m => m.category === 'cholinesterase').length },
    { id: 'nmda', labelAr: 'حماة الخلايا ومنظمات NMDA', labelEn: 'NMDA Receptor Regulators', count: MEMORY_MEDICATIONS.filter(m => m.category === 'nmda').length },
    { id: 'cerebral_circulation', labelAr: 'منشطات الدورة الدموية الدماغية', labelEn: 'Cerebral Circulation Boosters', count: MEMORY_MEDICATIONS.filter(m => m.category === 'cerebral_circulation').length },
    { id: 'nootropic_neuro', labelAr: 'مغذيات وترميم أغشية الدماغ', labelEn: 'Neuro-Membrane Restorers', count: MEMORY_MEDICATIONS.filter(m => m.category === 'nootropic_neuro').length },
    { id: 'essential_supplements', labelAr: 'فيتامينات وأحماض أساسية للذاكرة', labelEn: 'Vital Brain Vitamins & DHA', count: MEMORY_MEDICATIONS.filter(m => m.category === 'essential_supplements').length },
  ];

  const filteredMeds = MEMORY_MEDICATIONS.filter((med) => {
    const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchNameAr = med.nameAr.toLowerCase().includes(query);
    const matchNameEn = med.nameEn.toLowerCase().includes(query);
    const matchGeneric = med.genericName.toLowerCase().includes(query);
    const matchBrands = med.brandNames.some((b) => b.toLowerCase().includes(query));
    const matchBenefit = med.primaryBenefitAr.toLowerCase().includes(query) || med.primaryBenefitEn.toLowerCase().includes(query);

    return matchesCategory && (matchNameAr || matchNameEn || matchGeneric || matchBrands || matchBenefit);
  });

  const handleCopyMedDetails = (med: MemoryMedication) => {
    const text = lang === 'ar'
      ? `💊 *دواء منشط للذاكرة لكبار السن: ${med.nameAr}*\n• الأسماء التجارية: ${med.brandNames.join('، ')}\n• الفائدة: ${med.primaryBenefitAr}\n• الجرعات المتوفرة: ${med.dosageFormsAr}\n• نصائح الاستخدام: ${med.safetyNotesAr}`
      : `💊 *Senior Memory Medication: ${med.nameEn}*\n• Brands: ${med.brandNames.join(', ')}\n• Benefit: ${med.primaryBenefitEn}\n• Forms: ${med.dosageFormsEn}\n• Guidance: ${med.safetyNotesEn}`;

    navigator.clipboard.writeText(text);
    setCopiedMedId(med.id);
    setTimeout(() => setCopiedMedId(null), 2500);
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Visual Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="p-5 sm:p-7 md:w-3/5 flex flex-col justify-center space-y-3 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold w-fit">
              <Brain className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ar' ? 'دليل الأدوية والمكملات المعرفية' : 'Senior Memory & Cognitive Guide'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {lang === 'ar'
                ? 'أشهر الأدوية المنشطة للذاكرة والمفيدة لكبار السن'
                : 'Top Memory-Boosting Medications & Supplements for Seniors'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'دليل استرشادي علمي شامل يستعرض أبرز العلاجات المعتمدة عالمياً لتنشيط وظائف الدماغ، تحسين الانتباه واسترجاع المعلومات، وحماية الخلايا العصبية لدى كبار السن.'
                : 'A comprehensive medical guide covering the most recognized medications and evidence-based supplements that stimulate memory, enhance recall, and protect brain cells in older adults.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {onOpenMap && (
                <button
                  id="med-find-pharmacy-btn"
                  onClick={() => onOpenMap('pharmacy')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition shadow-sm cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'البحث عن صيدليات قريبة' : 'Find Nearby Pharmacies'}</span>
                </button>
              )}
              <div className="text-xs text-emerald-300 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'معلومات موثوقة ومطابقة للدلائل العالمية' : 'Evidence-based international reference'}</span>
              </div>
            </div>
          </div>

          <div className="relative md:w-2/5 min-h-[180px] md:min-h-full">
            <img
              src={seniorMemoryImg}
              alt={lang === 'ar' ? 'تنشيط ذاكرة كبار السن' : 'Senior memory and cognitive support'}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-90" />
          </div>
        </div>
      </div>

      {/* Safety Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-extrabold block mb-0.5">
            {lang === 'ar' ? 'إرشاد طبي للعائلة ومرافقي كبار السن:' : 'Important Medical Note for Caregivers:'}
          </span>
          {lang === 'ar'
            ? 'هذه المعلومات مخصصة للمعرفة والاطلاع الصحي على خيارات دعم الذاكرة المعتمدة. يجب دائماً استشارة الطبيب المعالج أو الصيدلي المختص قبل بدء أو تغيير أي علاج لتحديد الجرعة المناسبة لحالة الوالد/الوالدة والتأكد من توافقها مع سائر أدويته اليومية.'
            : 'This information is intended for educational reference. Always consult a treating physician or clinical pharmacist before introducing or modifying medications to ensure proper dosage and rule out contraindications.'}
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-memory-meds-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'ابحث باسم الدواء (مثال: أريسبت، دونيبيزيل، ميمانتين، جنكة، سيتيكولين، ب12)...'
                : 'Search medications (e.g., Donepezil, Aricept, Memantine, Ginkgo, Citicoline, B12)...'
            }
            className="w-full bg-white border border-slate-200 rounded-2xl ps-10 pe-10 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-600 shadow-2xs transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {lang === 'ar' ? cat.labelAr : cat.labelEn} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMeds.map((med) => {
          const isExpanded = expandedCardId === med.id;

          return (
            <div
              key={med.id}
              id={`card-${med.id}`}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-extrabold text-slate-900">
                        {lang === 'ar' ? med.nameAr : med.nameEn}
                      </h3>
                      {med.isPrescriptionRequired ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          {lang === 'ar' ? 'دواء موصوف طبياً' : 'Prescription'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {lang === 'ar' ? 'مكمل معتمد' : 'Supplement / OTC'}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      <span className="font-bold text-slate-600">{lang === 'ar' ? 'الاسم العلمي:' : 'Generic:'}</span>{' '}
                      {med.genericName}
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                </div>

                {/* Badge Tag */}
                {med.badgeTagAr && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? med.badgeTagAr : med.badgeTagEn}</span>
                  </div>
                )}

                {/* Brands in Pharmacies */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <div className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-sky-600" />
                    <span>{lang === 'ar' ? 'أشهر الأسماء التجارية في الصيدليات:' : 'Common Pharmacy Trade Brands:'}</span>
                  </div>
                  <div className="text-slate-800 font-semibold flex flex-wrap gap-1.5 pt-0.5">
                    {med.brandNames.map((brand, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white rounded-md border border-slate-200 text-slate-700">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Benefit */}
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'ar' ? 'الفائدة الأساسية للذاكرة وكبار السن:' : 'Key Memory & Cognitive Benefit:'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {lang === 'ar' ? med.primaryBenefitAr : med.primaryBenefitEn}
                  </p>
                </div>

                {/* Dosage Forms */}
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-800">{lang === 'ar' ? 'الأشكال الدوائية المتوفرة:' : 'Forms:'}</span>{' '}
                  {lang === 'ar' ? med.dosageFormsAr : med.dosageFormsEn}
                </div>

                {/* Collapsible Scientific & Safety Details */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 animate-fade-in text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-800">
                        {lang === 'ar' ? 'طريقة التأثير في الدماغ (آلية العمل):' : 'Mechanism of Action:'}
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {lang === 'ar' ? med.mechanismAr : med.mechanismEn}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-slate-800">
                        {lang === 'ar' ? 'دواعي الاستعمال المعتادة:' : 'Indications:'}
                      </div>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5 ps-1">
                        {(lang === 'ar' ? med.indicationsAr : med.indicationsEn).map((ind, i) => (
                          <li key={i}>{ind}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
                      <div className="font-bold text-emerald-900 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{lang === 'ar' ? 'إرشادات الاستخدام والأمان لكبار السن:' : 'Senior Administration & Safety:'}</span>
                      </div>
                      <p className="text-emerald-800 leading-relaxed">
                        {lang === 'ar' ? med.safetyNotesAr : med.safetyNotesEn}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <span className="font-bold text-slate-600">{lang === 'ar' ? 'الاعتماد الطبي:' : 'Backing:'}</span>{' '}
                      {lang === 'ar' ? med.scientificBackingAr : med.scientificBackingEn}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setExpandedCardId(isExpanded ? null : med.id)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 p-1 cursor-pointer"
                >
                  <span>{isExpanded ? (lang === 'ar' ? 'إخفاء التفاصيل' : 'Less') : (lang === 'ar' ? 'عرض آلية العمل والإرشادات' : 'Mechanism & Details')}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyMedDetails(med)}
                    title={lang === 'ar' ? 'نسخ ملخص الدواء للمشاركة مع العائلة أو الطبيب' : 'Copy summary to share with doctor'}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                  >
                    {copiedMedId === med.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveDetailMed(med)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-extrabold transition cursor-pointer"
                  >
                    {lang === 'ar' ? 'الملف الطبي' : 'Clinical Sheet'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMeds.length === 0 && (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <Brain className="w-10 h-10 text-slate-300 mx-auto" />
          <div className="text-sm font-bold text-slate-800">
            {lang === 'ar' ? 'لم يتم العثور على أدوية مطابقة للبحث' : 'No matching medications found'}
          </div>
          <p className="text-xs text-slate-500">
            {lang === 'ar'
              ? 'جرّب البحث باسم تجاري مثل (أريسبت، إبيكسيا، إكسيلون، جنكة، سومازينا)'
              : 'Try searching for common brands like Aricept, Ebixa, Exelon, Ginkgo, or Citicoline'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            {lang === 'ar' ? 'إعادة ضبط البحث' : 'Reset search filter'}
          </button>
        </div>
      )}

      {/* Clinical Sheet Detail Modal */}
      {activeDetailMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 max-h-[92vh] flex flex-col text-slate-800 my-auto"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {lang === 'ar' ? activeDetailMed.nameAr : activeDetailMed.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{activeDetailMed.genericName}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveDetailMed(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-4 pr-1 pl-1 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'ar' ? 'الفائدة الإدراكية الأساسية لكبار السن:' : 'Key Cognitive Indication:'}</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {lang === 'ar' ? activeDetailMed.primaryBenefitAr : activeDetailMed.primaryBenefitEn}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-extrabold text-slate-900">
                  {lang === 'ar' ? 'الأسماء التجارية الشائعة في الصيدليات:' : 'Trade / Brand Names:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeDetailMed.brandNames.map((b, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-bold">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="font-extrabold text-slate-900">
                  {lang === 'ar' ? 'آلية العمل والتأثير البيولوجي على المخ:' : 'Biochemical Mechanism:'}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {lang === 'ar' ? activeDetailMed.mechanismAr : activeDetailMed.mechanismEn}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-extrabold text-slate-900">
                  {lang === 'ar' ? 'دواعي الاستعمال لكبير السن:' : 'Indications for Seniors:'}
                </div>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  {(lang === 'ar' ? activeDetailMed.indicationsAr : activeDetailMed.indicationsEn).map((ind, i) => (
                    <li key={i}>{ind}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1 text-amber-900">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'ar' ? 'إرشادات الاستخدام والسلامة الدوائية:' : 'Safety & Senior Administration:'}</span>
                </div>
                <p className="leading-relaxed">
                  {lang === 'ar' ? activeDetailMed.safetyNotesAr : activeDetailMed.safetyNotesEn}
                </p>
              </div>

              <div className="space-y-1 text-slate-600">
                <span className="font-bold text-slate-800">{lang === 'ar' ? 'الأشكال الدوائية المتوفرة:' : 'Dosage Forms:'}</span>{' '}
                {lang === 'ar' ? activeDetailMed.dosageFormsAr : activeDetailMed.dosageFormsEn}
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-700">{lang === 'ar' ? 'الاعتماد العلمي والدولي:' : 'Clinical Backing:'}</span>{' '}
                {lang === 'ar' ? activeDetailMed.scientificBackingAr : activeDetailMed.scientificBackingEn}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleCopyMedDetails(activeDetailMed)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                {copiedMedId === activeDetailMed.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'ar' ? 'تم نسخ الملخص!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'نسخ الملخص' : 'Copy Summary'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveDetailMed(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
