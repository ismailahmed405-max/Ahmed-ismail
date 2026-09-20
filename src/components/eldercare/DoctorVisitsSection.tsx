import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DoctorVisit, Sibling } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  CheckCircle2,
  Circle,
  Plus,
  Car,
  FileText,
  X,
  Stethoscope,
  HelpCircle,
  Send,
  Star,
} from 'lucide-react';
import { RatingReviewModal } from './RatingReviewModal';
import { getTargetRatingSummary } from '../../utils/ratingsStorage';

interface Props {
  visits: DoctorVisit[];
  siblings: Sibling[];
  activeSibling: Sibling;
  onAddVisit: (newVisit: Omit<DoctorVisit, 'id'>) => void;
  onToggleQuestion: (visitId: string, questionId: string, answer?: string) => void;
  onAddQuestion: (visitId: string, questionText: string) => void;
  onUpdateVisitSummary: (visitId: string, summary: string) => void;
}

export const DoctorVisitsSection: React.FC<Props> = ({
  visits,
  siblings,
  activeSibling,
  onAddVisit,
  onToggleQuestion,
  onAddQuestion,
  onUpdateVisitSummary,
}) => {
  const { lang, isRTL } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newQuestionTexts, setNewQuestionTexts] = useState<{ [visitId: string]: string }>({});
  const [editingSummaryVisitId, setEditingSummaryVisitId] = useState<string | null>(null);
  const [tempSummaryText, setTempSummaryText] = useState('');
  const [reviewDoctor, setReviewDoctor] = useState<{ id: string; name: string } | null>(null);
  const [refreshReviewKey, setRefreshReviewKey] = useState(0);

  // New visit form state
  const [formData, setFormData] = useState({
    doctorName: '',
    specialty: '',
    clinicName: '',
    address: '',
    dateTime: '',
    assignedSiblingId: siblings[0]?.id || '',
    transportDetails: '',
    questions: ['Review current prescription dosages', 'Check blood pressure progress'],
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.doctorName.trim() || !formData.dateTime.trim()) return;

    onAddVisit({
      doctorName: formData.doctorName,
      specialty: formData.specialty,
      clinicName: formData.clinicName,
      address: formData.address,
      dateTime: formData.dateTime,
      assignedSiblingId: formData.assignedSiblingId,
      transportDetails: formData.transportDetails,
      status: 'upcoming',
      questionsForDoctor: formData.questions
        .filter((q) => q.trim())
        .map((q, idx) => ({
          id: `q-${Date.now()}-${idx}`,
          question: q,
          answered: false,
        })),
    });

    setIsAddModalOpen(false);
  };

  const handleQuestionSubmit = (visitId: string) => {
    const text = newQuestionTexts[visitId];
    if (!text || !text.trim()) return;
    onAddQuestion(visitId, text.trim());
    setNewQuestionTexts({ ...newQuestionTexts, [visitId]: '' });
  };

  const upcomingVisits = visits.filter((v) => v.status === 'upcoming');
  const pastVisits = visits.filter((v) => v.status !== 'upcoming');

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-sky-600" />
            Doctor Visits & Specialist Appointments
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Coordinate sibling drivers, prep questions before visits, and record doctor instructions.
          </p>
        </div>

        <button
          id="add-appointment-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Schedule Visit
        </button>
      </div>

      {/* Upcoming Visits */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-600" />
          Upcoming Appointments ({upcomingVisits.length})
        </h3>

        {upcomingVisits.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500 text-xs">
            {lang === 'ar'
              ? 'لا توجد مواعيد قادمة مسجلة حالياً. انقر على "حجز موعد طبي جديد" للإضافة.'
              : 'No upcoming appointments scheduled. Click "Schedule Visit" to add one.'}
          </div>
        ) : (
          upcomingVisits.map((visit) => {
            const assignedSibling = siblings.find((s) => s.id === visit.assignedSiblingId);

            return (
              <div
                key={visit.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
              >
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                        {visit.specialty}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">{visit.doctorName}</h4>

                      {/* Doctor Rating Badge & Trigger */}
                      {(() => {
                        const docRating = getTargetRatingSummary(visit.doctorName, 'doctor');
                        return (
                          <div className="flex items-center gap-1.5 ms-1">
                            <button
                              onClick={() => setReviewDoctor({ id: visit.doctorName, name: visit.doctorName })}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold transition cursor-pointer"
                              title={lang === 'ar' ? 'تقييم الطبيب وكتابة رأيك' : 'Rate doctor and write a review'}
                            >
                              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                              <span>{docRating.average}</span>
                              <span className="text-amber-700/80">({docRating.count})</span>
                              <span className="text-[10px] text-amber-800 underline ms-0.5">
                                {lang === 'ar' ? 'تقييم' : 'Rate'}
                              </span>
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">{visit.clinicName}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {visit.address}
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-1.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {visit.dateTime}
                    </div>

                    {assignedSibling && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Car className="w-3.5 h-3.5 text-sky-600" />
                        <span>
                          Driver / Lead: <strong>{assignedSibling.name}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transport note */}
                {visit.transportDetails && (
                  <div className="p-2.5 rounded-lg bg-sky-50/70 border border-sky-100 text-xs text-sky-900 flex items-start gap-2">
                    <Car className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Transport & Logistics: </span>
                      {visit.transportDetails}
                    </div>
                  </div>
                )}

                {/* Questions for Doctor (Interactive checklist) */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      Sibling Questions for the Doctor ({visit.questionsForDoctor.length})
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {lang === 'ar' ? 'يمكن للإخوة إضافة أسئلة للطبيب' : 'Siblings can add items to ask the doctor'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {visit.questionsForDoctor.map((q) => (
                      <div
                        key={q.id}
                        className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition ${
                          q.answered
                            ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <button
                          id={`toggle-q-${q.id}`}
                          onClick={() => onToggleQuestion(visit.id, q.id)}
                          className="mt-0.5 text-slate-400 hover:text-emerald-600"
                        >
                          {q.answered ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                        <div className="flex-1 space-y-1">
                          <p className={q.answered ? 'line-through text-slate-500' : 'font-medium'}>
                            {q.question}
                          </p>
                          {q.answer && (
                            <div className="text-[11px] text-emerald-800 bg-white/80 p-1.5 rounded border border-emerald-200">
                              <strong>Doctor's Answer:</strong> {q.answer}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add new question to appointment input */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add a question or symptom to ask doctor..."
                      value={newQuestionTexts[visit.id] || ''}
                      onChange={(e) =>
                        setNewQuestionTexts({ ...newQuestionTexts, [visit.id]: e.target.value })
                      }
                      onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit(visit.id)}
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                    />
                    <button
                      onClick={() => handleQuestionSubmit(visit.id)}
                      className="px-3 py-1.5 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 flex items-center gap-1 shadow-xs"
                    >
                      <Send className="w-3 h-3" /> Add
                    </button>
                  </div>
                </div>

                {/* Post-visit notes & summary */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      Doctor's Instructions & Caregiver Notes
                    </span>
                    <button
                      onClick={() => {
                        setEditingSummaryVisitId(visit.id);
                        setTempSummaryText(visit.summaryNotes || '');
                      }}
                      className="text-xs text-sky-600 hover:text-sky-800 font-semibold"
                    >
                      {visit.summaryNotes ? 'Edit Notes' : '+ Add Summary'}
                    </button>
                  </div>

                  {editingSummaryVisitId === visit.id ? (
                    <div className="space-y-2 mt-2">
                      <textarea
                        rows={3}
                        value={tempSummaryText}
                        onChange={(e) => setTempSummaryText(e.target.value)}
                        placeholder="Write what the doctor recommended, new prescriptions, lifestyle changes..."
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingSummaryVisitId(null)}
                          className="px-3 py-1 border border-slate-300 rounded text-xs text-slate-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            onUpdateVisitSummary(visit.id, tempSummaryText);
                            setEditingSummaryVisitId(null);
                          }}
                          className="px-3 py-1 bg-sky-600 text-white rounded text-xs font-semibold hover:bg-sky-700"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  ) : visit.summaryNotes ? (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      {visit.summaryNotes}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      No summary entered yet. The accompanying sibling can log notes right after the visit.
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Past Visits history */}
      {pastVisits.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Past Medical Records ({pastVisits.length})
          </h3>
          <div className="space-y-2">
            {pastVisits.map((pv) => (
              <div
                key={pv.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-700"
              >
                <div>
                  <div className="font-bold text-slate-900">{pv.doctorName} • {pv.specialty}</div>
                  <div className="text-slate-500">{pv.clinicName} — {pv.dateTime}</div>
                  {pv.summaryNotes && (
                    <p className="text-slate-600 mt-1 text-[11px] bg-slate-50 p-1.5 rounded">
                      {pv.summaryNotes}
                    </p>
                  )}
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Visit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-600" /> Schedule Doctor Appointment
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'اسم الطبيب *' : 'Doctor Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'اسم الطبيب المعالج' : 'Doctor name'}
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'التخصص / سبب الزيارة *' : 'Specialty / Reason *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'التخصص أو سبب الاستشارة' : 'Specialty or visit reason'}
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الموعد والتوقيت *' : 'Date & Time *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'تاريخ ووقت الموعد' : 'Appointment date and time'}
                    value={formData.dateTime}
                    onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الابن المكلف بالتوصيل' : 'Assigned Sibling (Driver)'}
                  </label>
                  <select
                    value={formData.assignedSiblingId}
                    onChange={(e) => setFormData({ ...formData, assignedSiblingId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    {siblings.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم العيادة والعنوان' : 'Clinic Name & Address'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'اسم المركز الطبي أو العيادة' : 'Clinic or medical center'}
                  value={formData.clinicName}
                  onChange={(e) => setFormData({ ...formData, clinicName: e.target.value, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'ملاحظات المواصلات والمرافقين' : 'Transportation & Notes'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'ملاحظات التوصيل أو المرافقة' : 'Transportation or assistance notes'}
                  value={formData.transportDetails}
                  onChange={(e) => setFormData({ ...formData, transportDetails: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-semibold shadow-xs"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
