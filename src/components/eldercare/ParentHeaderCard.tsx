import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ParentProfile, Sibling } from '../../types';
import {
  Heart,
  Phone,
  AlertCircle,
  ShieldAlert,
  User,
  ChevronDown,
  ChevronUp,
  Clock,
  Stethoscope,
  Pill,
  Edit3,
} from 'lucide-react';

interface Props {
  parent: ParentProfile;
  siblings: Sibling[];
  activeSibling: Sibling;
  onSelectSibling: (sibling: Sibling) => void;
  onOpenWhatsAppSummary: () => void;
  onOpenEditParentModal: () => void;
  medicationsSummary: { taken: number; total: number };
  upcomingVisitCount: number;
}

export const ParentHeaderCard: React.FC<Props> = ({
  parent,
  siblings,
  activeSibling,
  onSelectSibling,
  onOpenWhatsAppSummary,
  onOpenEditParentModal,
  medicationsSummary,
  upcomingVisitCount,
}) => {
  const { lang, t, isRTL } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(label);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div
      className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden mb-6"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Top Banner with Caregiver Switcher */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {lang === 'ar' ? 'المناوب الحالي من الأبناء:' : 'Caregiver On Duty:'}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {siblings.map((sib) => {
              const isActive = sib.id === activeSibling.id;
              return (
                <button
                  key={sib.id}
                  id={`sibling-select-${sib.id}`}
                  onClick={() => onSelectSibling(sib)}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs ring-2 ring-emerald-300'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={sib.role}
                >
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  {sib.name}
                  {isActive && (
                    <span className="text-[10px] opacity-80">
                      {lang === 'ar' ? '(المناوب)' : '(Active)'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="whatsapp-summary-top-btn"
            onClick={onOpenWhatsAppSummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <span className="font-mono">💬</span>
            <span>{lang === 'ar' ? 'مشاركة اليوم عبر واتساب' : 'Share Day on WhatsApp'}</span>
          </button>
        </div>
      </div>

      {/* Main Parent Overview */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center font-black text-xl shrink-0">
              <Heart className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-black text-slate-900">
                  {parent.name || (lang === 'ar' ? 'ملف رعاية كبير السن' : 'Elder Care Profile')}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {lang === 'ar' ? 'ملف رعاية وتنسيق أسري' : 'Active Care Coordination'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-medium">
                <span>{lang === 'ar' ? 'متابعة الرعاية والأدوية والمواعيد الطبية' : 'Care, cognitive health, & appointment tracking'}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2.5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-center min-w-[95px]">
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs font-bold">
                <Pill className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ar' ? 'أدوية الذاكرة' : 'Memory Meds'}</span>
              </div>
              <div className="text-xs font-bold text-emerald-700 mt-1">
                {lang === 'ar' ? 'دليل معتمد' : 'Reference'}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-center min-w-[95px]">
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs font-bold">
                <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                <span>{lang === 'ar' ? 'المواعيد' : 'Doc Visits'}</span>
              </div>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {upcomingVisitCount} {lang === 'ar' ? 'قادم' : 'upcoming'}
              </div>
            </div>

            <button
              id="edit-parent-profile-btn"
              onClick={onOpenEditParentModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:bg-slate-100 rounded-2xl text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer"
              title={lang === 'ar' ? 'تعديل جهات الاتصال والمعلومات' : 'Edit Contacts & Info'}
            >
              <Edit3 className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'تعديل البيانات' : 'Edit Profile'}</span>
            </button>

            <button
              id="toggle-parent-details-btn"
              onClick={() => setShowDetails(!showDetails)}
              className="p-2.5 border border-slate-200 hover:bg-slate-100 rounded-2xl text-slate-600 transition cursor-pointer"
              title={lang === 'ar' ? 'عرض تفاصيل الأطباء والطوارئ' : 'Toggle Doctor & Emergency Contacts'}
            >
              {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Medical Badges Row */}
        <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="font-bold text-slate-500">
            {lang === 'ar' ? 'الحالات الصحية:' : 'Conditions:'}
          </span>
          {parent.chronicConditions.length > 0 ? (
            parent.chronicConditions.map((c, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-bold"
              >
                {c}
              </span>
            ))
          ) : (
            <span className="text-slate-400 text-xs italic">
              {lang === 'ar' ? 'لم تُسجل حالات مزمنة (مستقر)' : 'No recorded chronic conditions'}
            </span>
          )}

          {parent.allergies.length > 0 && (
            <>
              <span className="font-bold text-slate-500 mr-2 ml-2">
                {lang === 'ar' ? 'الحساسية:' : 'Allergies:'}
              </span>
              {parent.allergies.map((a, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-bold flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  {a}
                </span>
              ))}
            </>
          )}
        </div>

        {/* Collapsible Emergency & Doctor Contacts */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                <span>{lang === 'ar' ? 'طبيب الرعاية الأولية' : 'Primary Physician'}</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                {parent.primaryDoctor.name || (lang === 'ar' ? 'لم يُحدد بعد' : 'Not set')}
              </div>
              {parent.primaryDoctor.clinic && (
                <div className="text-xs text-slate-500">{parent.primaryDoctor.clinic}</div>
              )}
              {parent.primaryDoctor.phone && (
                <button
                  id="copy-doc-phone-btn"
                  onClick={() => copyToClipboard(parent.primaryDoctor.phone, 'doc')}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs"
                >
                  <Phone className="w-3 h-3" />
                  {copiedPhone === 'doc' ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : parent.primaryDoctor.phone}
                </button>
              )}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>{lang === 'ar' ? 'جهة اتصال الطوارئ' : 'Emergency Contact'}</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                {parent.emergencyContact.name || (lang === 'ar' ? 'لم يُحدد بعد' : 'Not set')}
              </div>
              {parent.emergencyContact.relationship && (
                <div className="text-xs text-slate-500">{parent.emergencyContact.relationship}</div>
              )}
              {parent.emergencyContact.phone && (
                <button
                  id="copy-emergency-phone-btn"
                  onClick={() => copyToClipboard(parent.emergencyContact.phone, 'emg')}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs"
                >
                  <Phone className="w-3 h-3" />
                  {copiedPhone === 'emg' ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : parent.emergencyContact.phone}
                </button>
              )}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <Pill className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ar' ? 'الصيدلية المعتمدة' : 'Preferred Pharmacy'}</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                {parent.preferredPharmacy.name || (lang === 'ar' ? 'لم تُحدد بعد' : 'Not set')}
              </div>
              {parent.preferredPharmacy.address && (
                <div className="text-xs text-slate-500">{parent.preferredPharmacy.address}</div>
              )}
              {parent.preferredPharmacy.phone && (
                <button
                  id="copy-pharmacy-phone-btn"
                  onClick={() => copyToClipboard(parent.preferredPharmacy.phone, 'pharm')}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs"
                >
                  <Phone className="w-3 h-3" />
                  {copiedPhone === 'pharm' ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : parent.preferredPharmacy.phone}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
