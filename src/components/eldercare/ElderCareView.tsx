import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  ParentProfile,
  Sibling,
  Medication,
  DoctorVisit,
  CareNote
} from '../../types';
import {
  INITIAL_PARENT,
  INITIAL_SIBLINGS,
  INITIAL_MEDICATIONS,
  INITIAL_DOCTOR_VISITS,
  INITIAL_CARE_NOTES
} from '../../data/mockData';
import { MEMORY_MEDICATIONS } from '../../data/memoryMedicationsData';
import { getStoredData, setStoredData } from '../../utils/storage';
import { ElderCareIntroHome } from './ElderCareIntroHome';
import { ParentHeaderCard } from './ParentHeaderCard';
import { MedicationSection } from './MedicationSection';
import { DoctorVisitsSection } from './DoctorVisitsSection';
import { NotesAndVitalsSection } from './NotesAndVitalsSection';
import { WhatsAppFamilyReportModal } from './WhatsAppFamilyReportModal';
import { EditParentModal } from './EditParentModal';
import { NearestFacilitiesMapModal } from './NearestFacilitiesMapModal';
import {
  Pill,
  Stethoscope,
  FileText,
  Share2,
  Sparkles,
  RefreshCw,
  MapPin,
  Heart,
  LayoutDashboard,
} from 'lucide-react';

export const ElderCareView: React.FC = () => {
  const { lang, t } = useLanguage();

  // Top view mode: 'intro' (photo-driven introduction) or 'dashboard' (care coordination hub)
  const [mainView, setMainView] = useState<'intro' | 'dashboard'>('intro');

  // Load state from localStorage or default mocks with auto-migration of old placeholder names
  const [parent, setParent] = useState<ParentProfile>(() => {
    const saved = getStoredData('eldercare_parent', INITIAL_PARENT);
    if (
      !saved ||
      saved.name?.includes('Eleanor') ||
      saved.name?.includes('Vance') ||
      saved.name?.includes('أم أحمد') ||
      saved.age !== undefined ||
      saved.bloodType
    ) {
      return INITIAL_PARENT;
    }
    return saved;
  });

  const [siblings, setSiblings] = useState<Sibling[]>(() => {
    const saved = getStoredData('eldercare_siblings', INITIAL_SIBLINGS);
    if (
      saved &&
      saved.some(
        (s: Sibling) =>
          s.name === 'Maya' ||
          s.name === 'David' ||
          s.name === 'Leo' ||
          s.name === 'أحمد' ||
          s.name === 'سارة' ||
          s.name === 'محمد'
      )
    ) {
      return INITIAL_SIBLINGS;
    }
    return saved;
  });

  const [activeSibling, setActiveSibling] = useState<Sibling>(() => siblings[0] || INITIAL_SIBLINGS[0]);

  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = getStoredData('eldercare_medications', INITIAL_MEDICATIONS);
    if (
      saved &&
      saved.some(
        (m: Medication) =>
          m.prescribedBy?.includes('Reynolds') ||
          m.takenBy === 'Maya' ||
          m.name.includes('أتورفاستاتين') ||
          m.name.includes('Atorvastatin')
      )
    ) {
      return INITIAL_MEDICATIONS;
    }
    return saved;
  });

  const [visits, setVisits] = useState<DoctorVisit[]>(() => {
    const saved = getStoredData('eldercare_visits', INITIAL_DOCTOR_VISITS);
    if (
      saved &&
      saved.some(
        (v: DoctorVisit) =>
          v.doctorName.includes('Reynolds') ||
          v.doctorName.includes('حسام الشريف') ||
          (v.transportDetails && v.transportDetails.includes('Eleanor'))
      )
    ) {
      return INITIAL_DOCTOR_VISITS;
    }
    return saved;
  });

  const [notes, setNotes] = useState<CareNote[]>(() => {
    const saved = getStoredData('eldercare_notes', INITIAL_CARE_NOTES);
    if (
      saved &&
      saved.some(
        (n: CareNote) =>
          n.content?.includes('Eleanor') ||
          n.content?.includes('oatmeal with blueberries') ||
          n.content?.includes('الوالدة')
      )
    ) {
      return INITIAL_CARE_NOTES;
    }
    return saved;
  });

  const [activeTab, setActiveTab] = useState<'meds' | 'visits' | 'notes'>('meds');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isEditParentOpen, setIsEditParentOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [focusedMapType, setFocusedMapType] = useState<'all' | 'pharmacy' | 'hospital'>('all');

  // Synchronize to localStorage
  useEffect(() => {
    setStoredData('eldercare_parent', parent);
  }, [parent]);

  useEffect(() => {
    setStoredData('eldercare_siblings', siblings);
  }, [siblings]);

  useEffect(() => {
    setStoredData('eldercare_medications', medications);
  }, [medications]);

  useEffect(() => {
    setStoredData('eldercare_visits', visits);
  }, [visits]);

  useEffect(() => {
    setStoredData('eldercare_notes', notes);
  }, [notes]);

  const handleUpdateParent = (updated: ParentProfile) => {
    setParent(updated);
  };

  const handleAddSibling = (newSib: Omit<Sibling, 'id'>) => {
    const s: Sibling = {
      ...newSib,
      id: `sib-${Date.now()}`,
    };
    setSiblings((prev) => [...prev, s]);
  };

  // Actions
  const handleToggleTaken = (medId: string) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id !== medId) return med;
        const nowTaking = !med.takenToday;
        const currentTime = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        });

        return {
          ...med,
          takenToday: nowTaking,
          takenBy: nowTaking ? activeSibling.name : undefined,
          takenAt: nowTaking ? currentTime : undefined,
          pillsRemaining: nowTaking
            ? Math.max(0, med.pillsRemaining - 1)
            : Math.min(med.totalCapacity, med.pillsRemaining + 1),
        };
      })
    );
  };

  const handleAddMedication = (newMed: Omit<Medication, 'id'>) => {
    const med: Medication = {
      ...newMed,
      id: `med-${Date.now()}`,
    };
    setMedications((prev) => [med, ...prev]);
  };

  const handleUpdateRefill = (medId: string, addedCount: number) => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === medId
          ? {
              ...med,
              pillsRemaining: med.pillsRemaining + addedCount,
              totalCapacity: Math.max(med.totalCapacity, med.pillsRemaining + addedCount),
            }
          : med
      )
    );
  };

  const handleAddVisit = (newVisit: Omit<DoctorVisit, 'id'>) => {
    const visit: DoctorVisit = {
      ...newVisit,
      id: `visit-${Date.now()}`,
    };
    setVisits((prev) => [visit, ...prev]);
  };

  const handleToggleQuestion = (visitId: string, questionId: string, answer?: string) => {
    setVisits((prev) =>
      prev.map((v) => {
        if (v.id !== visitId) return v;
        return {
          ...v,
          questionsForDoctor: v.questionsForDoctor.map((q) =>
            q.id === questionId
              ? { ...q, answered: !q.answered, answer: answer !== undefined ? answer : q.answer }
              : q
          ),
        };
      })
    );
  };

  const handleAddQuestion = (visitId: string, questionText: string) => {
    setVisits((prev) =>
      prev.map((v) => {
        if (v.id !== visitId) return v;
        return {
          ...v,
          questionsForDoctor: [
            ...v.questionsForDoctor,
            { id: `q-${Date.now()}`, question: questionText, answered: false },
          ],
        };
      })
    );
  };

  const handleUpdateVisitSummary = (visitId: string, summary: string) => {
    setVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, summaryNotes: summary } : v))
    );
  };

  const handleAddNote = (newNote: Omit<CareNote, 'id' | 'timestamp'>) => {
    const note: CareNote = {
      ...newNote,
      id: `note-${Date.now()}`,
      timestamp: `Today, ${new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })}`,
    };
    setNotes((prev) => [note, ...prev]);
  };

  const handleResetData = () => {
    if (window.confirm('Reset Elder-Care records back to initial template?')) {
      setMedications(INITIAL_MEDICATIONS);
      setVisits(INITIAL_DOCTOR_VISITS);
      setNotes(INITIAL_CARE_NOTES);
      setStoredData('eldercare_medications', INITIAL_MEDICATIONS);
      setStoredData('eldercare_visits', INITIAL_DOCTOR_VISITS);
      setStoredData('eldercare_notes', INITIAL_CARE_NOTES);
    }
  };

  const medsTakenCount = medications.filter((m) => m.takenToday).length;
  const upcomingVisitsCount = visits.filter((v) => v.status === 'upcoming').length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Primary Navigation Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="view-intro-tab"
            onClick={() => setMainView('intro')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
              mainView === 'intro'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{lang === 'ar' ? 'مقدمة عن رعاية كبار السن' : 'Elder Care Introduction'}</span>
          </button>

          <button
            id="view-dashboard-tab"
            onClick={() => setMainView('dashboard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
              mainView === 'dashboard'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{lang === 'ar' ? 'لوحة إدارة الرعاية والجدول' : 'Care Management Hub'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="top-nearest-map-btn"
            onClick={() => {
              setFocusedMapType('all');
              setIsMapModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-sky-200 bg-sky-50 text-sky-900 text-xs font-bold hover:bg-sky-100 transition cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>{lang === 'ar' ? 'أقرب صيدلية ومستشفى' : 'Nearby Pharmacy & ER'}</span>
          </button>
        </div>
      </div>

      {mainView === 'intro' ? (
        <ElderCareIntroHome
          onOpenMap={() => {
            setFocusedMapType('all');
            setIsMapModalOpen(true);
          }}
          onGoToCareDashboard={() => setMainView('dashboard')}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />
      ) : (
        <>
          {/* Parent Medical Header & Sibling Switcher */}
          <ParentHeaderCard
            parent={parent}
            siblings={siblings}
            activeSibling={activeSibling}
            onSelectSibling={setActiveSibling}
            onOpenWhatsAppSummary={() => setIsWhatsAppModalOpen(true)}
            onOpenEditParentModal={() => setIsEditParentOpen(true)}
            medicationsSummary={{ taken: 0, total: MEMORY_MEDICATIONS.length }}
            upcomingVisitCount={upcomingVisitsCount}
          />

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                id="tab-medications"
                onClick={() => setActiveTab('meds')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                  activeTab === 'meds'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Pill className="w-4 h-4" />
                <span>
                  {lang === 'ar' ? 'أشهر أدوية تنشيط الذاكرة' : 'Memory & Brain Meds'} ({MEMORY_MEDICATIONS.length})
                </span>
              </button>

              <button
                id="tab-doctor-visits"
                onClick={() => setActiveTab('visits')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition ${
                  activeTab === 'visits'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>
                  {lang === 'ar' ? 'مواعيد الأطباء والنقل' : 'Doctor Visits & Rides'} ({upcomingVisitsCount})
                </span>
              </button>

              <button
                id="tab-sibling-notes"
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition ${
                  activeTab === 'notes'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>
                  {lang === 'ar' ? 'ملاحظات الإخوة والمؤشرات' : 'Sibling Log & Vitals'} ({notes.length})
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="open-whatsapp-summary-btn"
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-extrabold hover:bg-emerald-100 transition shadow-xs cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ar' ? 'تقرير واتساب' : 'WhatsApp'}</span>
              </button>

              <button
                onClick={handleResetData}
                title={lang === 'ar' ? 'استعادة البيانات الافتراضية' : 'Reset sample data'}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tab Panels */}
          {activeTab === 'meds' && (
            <MedicationSection
              medications={medications}
              activeSibling={activeSibling}
              onToggleTaken={handleToggleTaken}
              onAddMedication={handleAddMedication}
              onUpdateRefill={handleUpdateRefill}
              onOpenMap={(type) => {
                setFocusedMapType(type);
                setIsMapModalOpen(true);
              }}
            />
          )}

          {activeTab === 'visits' && (
            <DoctorVisitsSection
              visits={visits}
              siblings={siblings}
              activeSibling={activeSibling}
              onAddVisit={handleAddVisit}
              onToggleQuestion={handleToggleQuestion}
              onAddQuestion={handleAddQuestion}
              onUpdateVisitSummary={handleUpdateVisitSummary}
            />
          )}

          {activeTab === 'notes' && (
            <NotesAndVitalsSection
              notes={notes}
              siblings={siblings}
              activeSibling={activeSibling}
              onAddNote={handleAddNote}
            />
          )}
        </>
      )}

      {/* Google Maps Nearest Facilities Modal */}
      <NearestFacilitiesMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        focusedFacilityType={focusedMapType}
      />

      {/* WhatsApp Modal */}
      <WhatsAppFamilyReportModal
        parent={parent}
        activeSibling={activeSibling}
        medications={medications}
        visits={visits}
        notes={notes}
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      {/* Edit Parent Profile & Siblings Modal */}
      <EditParentModal
        parent={parent}
        siblings={siblings}
        isOpen={isEditParentOpen}
        onClose={() => setIsEditParentOpen(false)}
        onUpdateParent={handleUpdateParent}
        onAddSibling={handleAddSibling}
      />
    </div>
  );
};
