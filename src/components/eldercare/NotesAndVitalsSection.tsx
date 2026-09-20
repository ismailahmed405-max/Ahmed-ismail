import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CareNote, Sibling } from '../../types';
import {
  FileText,
  Activity,
  Heart,
  AlertTriangle,
  Plus,
  Smile,
  Utensils,
  Thermometer,
  X,
  Filter,
} from 'lucide-react';

interface Props {
  notes: CareNote[];
  siblings: Sibling[];
  activeSibling: Sibling;
  onAddNote: (newNote: Omit<CareNote, 'id' | 'timestamp'>) => void;
}

export const NotesAndVitalsSection: React.FC<Props> = ({
  notes,
  siblings,
  activeSibling,
  onAddNote,
}) => {
  const { lang } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general' as CareNote['category'],
    severity: 'normal' as CareNote['severity'],
    bpSys: '124',
    bpDia: '80',
    bloodSugar: '108',
    heartRate: '72',
    temperature: '98.4',
    includeVitals: false,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    onAddNote({
      authorSiblingId: activeSibling.id,
      category: formData.category,
      title: formData.title.trim(),
      content: formData.content.trim(),
      severity: formData.severity,
      vitals: formData.includeVitals
        ? {
            bloodPressure: `${formData.bpSys}/${formData.bpDia}`,
            bloodSugar: `${formData.bloodSugar} mg/dL`,
            heartRate: `${formData.heartRate} bpm`,
            temperature: `${formData.temperature}°F`,
          }
        : undefined,
    });

    setIsAddModalOpen(false);
    setFormData({
      title: '',
      content: '',
      category: 'general',
      severity: 'normal',
      bpSys: '124',
      bpDia: '80',
      bloodSugar: '108',
      heartRate: '72',
      temperature: '98.4',
      includeVitals: false,
    });
  };

  const filteredNotes =
    categoryFilter === 'all' ? notes : notes.filter((n) => n.category === categoryFilter);

  const getCategoryIcon = (cat: CareNote['category']) => {
    switch (cat) {
      case 'vitals':
        return <Activity className="w-4 h-4 text-emerald-600" />;
      case 'mood':
        return <Smile className="w-4 h-4 text-amber-600" />;
      case 'meal':
        return <Utensils className="w-4 h-4 text-sky-600" />;
      case 'incident':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Sibling Daily Handover & Parent Notes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Log daily vitals, mood, meal intake, and observations for seamless sibling coordination.
          </p>
        </div>

        <button
          id="add-care-note-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Observation / Vitals
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-semibold px-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { key: 'all', label: 'All Updates' },
          { key: 'vitals', label: 'Vitals & BP' },
          { key: 'meal', label: 'Appetite & Meals' },
          { key: 'mood', label: 'Mood & Sleep' },
          { key: 'incident', label: 'Alerts & Pain' },
          { key: 'general', label: 'General' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setCategoryFilter(f.key)}
            className={`px-3 py-1 rounded-full font-medium transition whitespace-nowrap ${
              categoryFilter === f.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notes Feed */}
      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500 text-xs">
            {lang === 'ar'
              ? 'لا توجد ملاحظات أو قياسات مسجلة حتى الآن. انقر على "إضافة ملاحظة / قياس" للبدء.'
              : 'No notes found for this filter. Click "Add Observation / Vitals" to write one.'}
          </div>
        ) : (
          filteredNotes.map((note) => {
            const author = siblings.find((s) => s.id === note.authorSiblingId);

            return (
              <div
                key={note.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs space-y-3 transition-all ${
                  note.severity === 'attention'
                    ? 'border-amber-200 bg-amber-50/20'
                    : note.severity === 'urgent'
                    ? 'border-rose-200 bg-rose-50/20'
                    : 'border-slate-200'
                }`}
              >
                {/* Header with author, tag & timestamp */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-slate-100 flex items-center justify-center">
                      {getCategoryIcon(note.category)}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
                      <span className="text-[11px] text-slate-500">{note.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {note.severity === 'attention' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Sibling Attention
                      </span>
                    )}

                    {note.severity === 'urgent' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Priority Notice
                      </span>
                    )}

                    {author && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                        <span className={`w-2 h-2 rounded-full ${author.avatarColor.split(' ')[0]}`}></span>
                        By {author.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {note.content}
                </p>

                {/* Attached Vitals Display */}
                {note.vitals && (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Recorded Vitals:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {note.vitals.bloodPressure && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                          <div className="text-[10px] text-slate-500 font-medium">Blood Pressure</div>
                          <div className="text-xs font-bold text-slate-900 mt-0.5">
                            {note.vitals.bloodPressure}
                          </div>
                        </div>
                      )}
                      {note.vitals.bloodSugar && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                          <div className="text-[10px] text-slate-500 font-medium">Blood Glucose</div>
                          <div className="text-xs font-bold text-slate-900 mt-0.5">
                            {note.vitals.bloodSugar}
                          </div>
                        </div>
                      )}
                      {note.vitals.heartRate && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                          <div className="text-[10px] text-slate-500 font-medium">Heart Rate</div>
                          <div className="text-xs font-bold text-slate-900 mt-0.5">
                            {note.vitals.heartRate}
                          </div>
                        </div>
                      )}
                      {note.vitals.temperature && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                          <div className="text-[10px] text-slate-500 font-medium">Temperature</div>
                          <div className="text-xs font-bold text-slate-900 mt-0.5">
                            {note.vitals.temperature}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Note Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" /> Log Sibling Observation
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-900 flex items-center gap-2">
                <span className="font-bold">Posting as:</span>
                <span className="font-semibold text-emerald-700">{activeSibling.name}</span>
                <span className="text-slate-500 text-[11px]">({activeSibling.role})</span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان الملاحظة *' : 'Title / Subject *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ar' ? 'عنوان الملاحظة' : 'Note subject or title'}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as CareNote['category'] })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="general">General Observation</option>
                    <option value="vitals">Vitals & Health Metrics</option>
                    <option value="meal">Meal & Appetite</option>
                    <option value="mood">Mood & Mental State</option>
                    <option value="incident">Pain / Physical Mobility Alert</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Severity Flag</label>
                  <select
                    value={formData.severity}
                    onChange={(e) =>
                      setFormData({ ...formData, severity: e.target.value as CareNote['severity'] })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="normal">Routine / Normal</option>
                    <option value="attention">Sibling Attention Requested</option>
                    <option value="urgent">Urgent / Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الملاحظات والتفاصيل *' : 'Observation Notes *'}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={lang === 'ar' ? 'اكتب الملاحظات الصحية، الأنشطة اليومية، أو التطورات هنا...' : 'Write health observations, activities, or updates here...'}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              {/* Toggle include vitals */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.includeVitals}
                    onChange={(e) => setFormData({ ...formData, includeVitals: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300"
                  />
                  <span>Attach Physical Vitals Check (Blood Pressure, Sugar, etc.)</span>
                </label>

                {formData.includeVitals && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">
                        BP Systolic
                      </label>
                      <input
                        type="text"
                        placeholder="120"
                        value={formData.bpSys}
                        onChange={(e) => setFormData({ ...formData, bpSys: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">
                        BP Diastolic
                      </label>
                      <input
                        type="text"
                        placeholder="80"
                        value={formData.bpDia}
                        onChange={(e) => setFormData({ ...formData, bpDia: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">
                        Blood Sugar
                      </label>
                      <input
                        type="text"
                        placeholder="110"
                        value={formData.bloodSugar}
                        onChange={(e) => setFormData({ ...formData, bloodSugar: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 font-medium mb-1">
                        Heart Rate
                      </label>
                      <input
                        type="text"
                        placeholder="72"
                        value={formData.heartRate}
                        onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                      />
                    </div>
                  </div>
                )}
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
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold shadow-xs"
                >
                  Post Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
