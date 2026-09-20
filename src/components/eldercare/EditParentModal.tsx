import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ParentProfile, Sibling } from '../../types';
import { X, Check, Heart, Plus, Trash2, Stethoscope, Phone, ShieldAlert, Pill } from 'lucide-react';

interface Props {
  parent: ParentProfile;
  siblings: Sibling[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateParent: (updated: ParentProfile) => void;
  onAddSibling: (newSibling: Omit<Sibling, 'id'>) => void;
}

export const EditParentModal: React.FC<Props> = ({
  parent,
  siblings,
  isOpen,
  onClose,
  onUpdateParent,
  onAddSibling,
}) => {
  const { lang, isRTL } = useLanguage();
  const [name, setName] = useState(parent.name);
  const [conditionsText, setConditionsText] = useState(parent.chronicConditions.join(', '));
  const [allergiesText, setAllergiesText] = useState(parent.allergies.join(', '));

  // Doctor & Pharmacy
  const [docName, setDocName] = useState(parent.primaryDoctor.name);
  const [docPhone, setDocPhone] = useState(parent.primaryDoctor.phone);
  const [docClinic, setDocClinic] = useState(parent.primaryDoctor.clinic);

  const [emgName, setEmgName] = useState(parent.emergencyContact.name);
  const [emgPhone, setEmgPhone] = useState(parent.emergencyContact.phone);

  const [pharmName, setPharmName] = useState(parent.preferredPharmacy.name);
  const [pharmPhone, setPharmPhone] = useState(parent.preferredPharmacy.phone);

  // New Sibling state
  const [newSiblingName, setNewSiblingName] = useState('');
  const [newSiblingRole, setNewSiblingRole] = useState(lang === 'ar' ? 'الابن / رعاية صباحية' : 'Son / Morning Care');
  const [newSiblingPhone, setNewSiblingPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmitParent = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateParent({
      ...parent,
      name: name.trim() || parent.name,
      chronicConditions: conditionsText.split(',').map((c) => c.trim()).filter(Boolean),
      allergies: allergiesText.split(',').map((a) => a.trim()).filter(Boolean),
      primaryDoctor: {
        name: docName,
        clinic: docClinic,
        phone: docPhone,
      },
      emergencyContact: {
        ...parent.emergencyContact,
        name: emgName,
        phone: emgPhone,
      },
      preferredPharmacy: {
        ...parent.preferredPharmacy,
        name: pharmName,
        phone: pharmPhone,
      },
    });
    onClose();
  };

  const handleAddNewSibling = () => {
    if (!newSiblingName.trim()) return;
    onAddSibling({
      name: newSiblingName.trim(),
      role: newSiblingRole.trim(),
      avatarColor: '#10b981',
      phone: newSiblingPhone.trim() || '+966 50 123 4567',
    });
    setNewSiblingName('');
    setNewSiblingPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 max-h-[94vh] flex flex-col text-slate-800 my-auto"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {lang === 'ar' ? 'تعديل ملف الوالد / الوالدة وإضافة الإخوة' : 'Edit Parent Profile & Siblings'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'ar'
                  ? 'قم بتخصيص الاسم، الأمراض المزمنة، الطبيب، وأفراد العائلة'
                  : 'Customize parent details, medical history & family caregivers'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <form onSubmit={handleSubmitParent} className="overflow-y-auto flex-1 space-y-4 pr-1 pl-1">
          {/* Section 1: Basic Info */}
          <div className="space-y-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div className="text-xs font-bold text-slate-700">
              {lang === 'ar' ? 'البيانات الأساسية للوالد/الوالدة:' : 'Parent Basic Information:'}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">
                {lang === 'ar' ? 'اسم الوالد / الوالدة:' : 'Parent Full Name:'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'ar' ? 'ملف رعاية كبير السن' : 'Elder Care Profile'}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  {lang === 'ar' ? 'الحالات الصحية المزمنة (مفصولة بفاصلة):' : 'Chronic Conditions (comma separated):'}
                </label>
                <input
                  type="text"
                  value={conditionsText}
                  onChange={(e) => setConditionsText(e.target.value)}
                  placeholder={lang === 'ar' ? 'ضغط دم، سكري نوع 2' : 'Hypertension, Diabetes Type 2'}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  {lang === 'ar' ? 'الحساسية المعروفة (مفصولة بفاصلة):' : 'Known Allergies (comma separated):'}
                </label>
                <input
                  type="text"
                  value={allergiesText}
                  onChange={(e) => setAllergiesText(e.target.value)}
                  placeholder={lang === 'ar' ? 'بنسلين، سلفا' : 'Penicillin, Sulfa'}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Doctor & Emergency */}
          <div className="space-y-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div className="text-xs font-bold text-slate-700">
              {lang === 'ar' ? 'الطبيب المعالج وجهات الطوارئ:' : 'Physician & Emergency Contacts:'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">{lang === 'ar' ? 'اسم الطبيب:' : 'Doctor Name:'}</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">{lang === 'ar' ? 'هاتف الطبيب:' : 'Doctor Phone:'}</label>
                <input
                  type="text"
                  value={docPhone}
                  onChange={(e) => setDocPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">{lang === 'ar' ? 'العيادة / المستشفى:' : 'Clinic / Hospital:'}</label>
                <input
                  type="text"
                  value={docClinic}
                  onChange={(e) => setDocClinic(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">{lang === 'ar' ? 'طوارئ العائلة (اسم ورقم):' : 'Emergency Contact:'}</label>
                <input
                  type="text"
                  value={emgPhone}
                  onChange={(e) => setEmgPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">{lang === 'ar' ? 'الصيدلية المعتمدة (اسم ورقم):' : 'Preferred Pharmacy:'}</label>
                <input
                  type="text"
                  value={pharmPhone}
                  onChange={(e) => setPharmPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Siblings & Family Caregivers */}
          <div className="space-y-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                {lang === 'ar' ? 'فريق العائلة المناوب (الإخوة ومقدمو الرعاية):' : 'Family Caregivers (Siblings):'}
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {siblings.length} {lang === 'ar' ? 'أفراد مضافون' : 'members'}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {siblings.map((sib) => (
                <div
                  key={sib.id}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>{sib.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({sib.role})</span>
                </div>
              ))}
            </div>

            {/* Add new sibling inline */}
            <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                placeholder={lang === 'ar' ? 'اسم الابن أو المرافق الجديد' : 'New sibling name'}
                value={newSiblingName}
                onChange={(e) => setNewSiblingName(e.target.value)}
                className="w-full sm:flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-600"
              />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'رقم الهاتف (واتساب)' : 'Phone number'}
                value={newSiblingPhone}
                onChange={(e) => setNewSiblingPhone(e.target.value)}
                className="w-full sm:w-36 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-600"
              />
              <button
                type="button"
                onClick={handleAddNewSibling}
                className="w-full sm:w-auto px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'إضافة للرعاية' : 'Add Sibling'}</span>
              </button>
            </div>
          </div>

          {/* Footer Submit Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
