// TypeScript types for Elder-Care Coordination & Informal Bookkeeping

// --- Elder-Care Types ---
export interface Sibling {
  id: string;
  name: string;
  role: string; // e.g. 'Primary Caregiver (Local)', 'Medical/Pharmacy (Remote)', 'Weekend Visits'
  avatarColor: string;
  phone: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  scheduleTime: 'morning' | 'midday' | 'evening' | 'bedtime';
  timeLabel: string; // e.g. '08:00 AM'
  instructions: string; // e.g. 'Take with breakfast'
  prescribedBy: string;
  pillsRemaining: number;
  totalCapacity: number;
  refillThreshold: number;
  pharmacyInfo?: string;
  takenToday?: boolean;
  takenBy?: string; // Sibling name
  takenAt?: string; // Timestamp
  imageUrl?: string;
  infoUrl?: string;
  pharmacyUrl?: string;
}

export interface MedicalFacility {
  id: string;
  name: string;
  type: 'pharmacy' | 'hospital';
  address: string;
  phone: string;
  distanceKm: number;
  isOpenNow: boolean;
  hours: string;
  lat: number;
  lng: number;
  rating?: number;
}

export interface DoctorVisit {
  id: string;
  doctorName: string;
  specialty: string;
  clinicName: string;
  address: string;
  dateTime: string;
  assignedSiblingId: string;
  transportDetails?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  questionsForDoctor: { id: string; question: string; answered: boolean; answer?: string }[];
  summaryNotes?: string;
  nextFollowUp?: string;
}

export interface CareNote {
  id: string;
  authorSiblingId: string;
  timestamp: string;
  category: 'vitals' | 'mood' | 'meal' | 'general' | 'incident';
  title: string;
  content: string;
  vitals?: {
    bloodPressure?: string; // e.g. '126/82'
    bloodSugar?: string; // e.g. '112 mg/dL'
    temperature?: string; // e.g. '98.4°F'
    heartRate?: string; // e.g. '72 bpm'
  };
  severity?: 'normal' | 'attention' | 'urgent';
}

export interface MemoryMedication {
  id: string;
  nameAr: string;
  nameEn: string;
  genericName: string;
  brandNames: string[];
  category: 'cholinesterase' | 'nmda' | 'cerebral_circulation' | 'nootropic_neuro' | 'essential_supplements';
  categoryLabelAr: string;
  categoryLabelEn: string;
  primaryBenefitAr: string;
  primaryBenefitEn: string;
  mechanismAr: string;
  mechanismEn: string;
  indicationsAr: string[];
  indicationsEn: string[];
  safetyNotesAr: string;
  safetyNotesEn: string;
  dosageFormsAr: string;
  dosageFormsEn: string;
  scientificBackingAr: string;
  scientificBackingEn: string;
  isPrescriptionRequired: boolean;
  badgeTagAr?: string;
  badgeTagEn?: string;
  imageUrl?: string;
}

export interface ParentProfile {
  name: string;
  age?: number;
  dateOfBirth?: string;
  preferredLanguage?: string;
  bloodType?: string;
  chronicConditions: string[];
  allergies: string[];
  primaryDoctor: {
    name: string;
    phone: string;
    clinic: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  preferredPharmacy: {
    name: string;
    phone: string;
    address: string;
  };
}

// End of Elder-Care Types
