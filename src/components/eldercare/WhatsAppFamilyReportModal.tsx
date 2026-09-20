import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ParentProfile, Sibling, Medication, DoctorVisit, CareNote } from '../../types';
import { Copy, Check, ExternalLink, X, Share2 } from 'lucide-react';

interface Props {
  parent: ParentProfile;
  activeSibling: Sibling;
  medications: Medication[];
  visits: DoctorVisit[];
  notes: CareNote[];
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppFamilyReportModal: React.FC<Props> = ({
  parent,
  activeSibling,
  medications,
  visits,
  notes,
  isOpen,
  onClose,
}) => {
  const { lang, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const takenMeds = medications.filter((m) => m.takenToday);
  const pendingMeds = medications.filter((m) => !m.takenToday);
  const upcomingVisits = visits.filter((v) => v.status === 'upcoming');
  const latestNote = notes[0];

  const formattedDate = new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Generate WhatsApp formatted text based on language
  const reportText = lang === 'ar'
    ? `🌿 *تقرير الرعاية والمتابعة — ${parent.name || 'ملف رعاية كبير السن'}*
📅 *التاريخ:* ${formattedDate}
👤 *المسؤول المناوب:* ${activeSibling.name} (${activeSibling.role})
----------------------------------------
💊 *متابعة أدوية الذاكرة والرعاية الصحية:*
${medications.length > 0 ? medications.map((m) => `  • ${m.name} (${m.dosage})`).join('\n') : '  • الخطة الطبية والأدوية مستقرة وفق توصيات الطبيب'}

🩺 *المؤشرات الحيوية والملاحظات:*
${latestNote ? `• ${latestNote.title}\n  ${latestNote.content.slice(0, 140)}` : '• الحالة مستقرة والحمد لله.'}
${latestNote?.vitals ? `  📊 ضغط الدم: ${latestNote.vitals.bloodPressure || 'غير محدد'} | السكر: ${latestNote.vitals.bloodSugar || 'غير محدد'} | النبض: ${latestNote.vitals.heartRate || 'غير محدد'}` : ''}

🗓️ *مواعيد الأطباء القادمة:*
${
  upcomingVisits.length > 0
    ? upcomingVisits
        .slice(0, 2)
        .map(
          (v) =>
            `• ${v.doctorName} (${v.specialty})\n  🕒 الموعد: ${v.dateTime}`
        )
        .join('\n')
    : '• لا توجد مواعيد مستعجلة هذا الأسبوع.'
}

_تم الإنشاء عبر تطبيق رعاية كبار السن_`
    : `🌿 *Family Care Daily Update — ${parent.name || 'Elder Care Profile'}*
📅 *Date:* ${formattedDate}
👤 *Recorded by:* ${activeSibling.name} (${activeSibling.role})
----------------------------------------
💊 *Memory & Health Care Monitoring:*
${medications.length > 0 ? medications.map((m) => `  • ${m.name} (${m.dosage})`).join('\n') : '  • Medical plan is stable under physician care'}

🩺 *Latest Vitals & Notes:*
${latestNote ? `• "${latestNote.title}"\n  ${latestNote.content.slice(0, 140)}...` : '• All quiet and stable today.'}
${latestNote?.vitals ? `  📊 BP: ${latestNote.vitals.bloodPressure || 'N/A'} | Sugar: ${latestNote.vitals.bloodSugar || 'N/A'}` : ''}

🗓️ *Upcoming Doctor Visits:*
${
  upcomingVisits.length > 0
    ? upcomingVisits
        .slice(0, 2)
        .map(
          (v) =>
            `• ${v.doctorName} (${v.specialty})\n  🕒 ${v.dateTime}`
        )
        .join('\n')
    : '• No urgent appointments scheduled this week.'
}

_Sent from Elder Care Hub_`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(reportText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 max-h-[92vh] flex flex-col"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base shadow-xs">
              💬
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {lang === 'ar' ? 'مشاركة التقرير اليومي عبر واتساب' : 'Share Daily Report to WhatsApp'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'ar'
                  ? 'تقرير منظم وجاهز للإرسال لمجموعة العائلة على واتساب'
                  : 'Ready-to-send summary for your family group chat'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Preview Box */}
        <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs leading-relaxed whitespace-pre-wrap border border-slate-800 shadow-inner">
          {reportText}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
          >
            {lang === 'ar' ? 'إلغاء' : 'Close'}
          </button>

          <div className="flex items-center gap-2">
            <button
              id="copy-whatsapp-text-btn"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ التقرير' : 'Copy Text')}
            </button>

            <button
              id="open-whatsapp-direct-btn"
              onClick={handleOpenWhatsApp}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              {lang === 'ar' ? 'فتح واتساب' : 'Open WhatsApp'}
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
