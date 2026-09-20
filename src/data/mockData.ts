import {
  ParentProfile,
  Sibling,
  Medication,
  DoctorVisit,
  CareNote,
  MedicalFacility
} from '../types';

export const INITIAL_SIBLINGS: Sibling[] = [
  {
    id: 'sib-1',
    name: 'المرافق الأول',
    role: 'المتابعة اليومية والزيارات',
    avatarColor: 'bg-emerald-600 text-white',
    phone: '',
  },
  {
    id: 'sib-2',
    name: 'المرافق الثاني',
    role: 'متابعة الأدوية والصيدلية',
    avatarColor: 'bg-sky-600 text-white',
    phone: '',
  },
];

export const INITIAL_PARENT: ParentProfile = {
  name: 'ملف رعاية كبير السن',
  chronicConditions: [],
  allergies: [],
  primaryDoctor: {
    name: '',
    phone: '',
    clinic: '',
  },
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
  },
  preferredPharmacy: {
    name: '',
    phone: '',
    address: '',
  },
};

export const INITIAL_MEDICATIONS: Medication[] = [];

export const INITIAL_NEARBY_FACILITIES: MedicalFacility[] = [
  {
    id: 'fac-1',
    name: 'صيدلية خدمة 24 ساعة',
    type: 'pharmacy',
    address: 'شارع الملك فهد - بالقرب من المستشفى التخصصي',
    phone: '+966 11 456 7890',
    distanceKm: 0.8,
    isOpenNow: true,
    hours: 'مفتوح 24 ساعة',
    lat: 37.7749,
    lng: -122.4194,
    rating: 4.9,
  },
  {
    id: 'fac-2',
    name: 'صيدلية الحي المركزية',
    type: 'pharmacy',
    address: 'طريق الملك عبدالله - مجمع العيادات',
    phone: '+966 11 234 5678',
    distanceKm: 1.4,
    isOpenNow: true,
    hours: '08:00 ص – 12:00 م',
    lat: 37.7812,
    lng: -122.4112,
    rating: 4.8,
  },
  {
    id: 'fac-3',
    name: 'مستشفى السلام ومركز الطوارئ الرئيسي',
    type: 'hospital',
    address: 'شارع التخصصي الطبي - مبنى الطوارئ الرئيسي',
    phone: '+966 11 890 1122',
    distanceKm: 2.3,
    isOpenNow: true,
    hours: 'طوارئ وعناية مركزة 24/7',
    lat: 37.7689,
    lng: -122.4289,
    rating: 4.9,
  },
  {
    id: 'fac-4',
    name: 'المستشفى العام وقسم الرعاية العاجلة',
    type: 'hospital',
    address: 'حي الزهور - طريق المستشفيات',
    phone: '+966 11 345 9900',
    distanceKm: 3.1,
    isOpenNow: true,
    hours: 'قسم الطوارئ والإسعاف 24 ساعة',
    lat: 37.7895,
    lng: -122.4015,
    rating: 4.7,
  },
  {
    id: 'fac-5',
    name: 'صيدلية ومجمع الرعاية السريعة',
    type: 'pharmacy',
    address: 'شارع التحلية - المجمع السكني',
    phone: '+966 11 443 8811',
    distanceKm: 1.9,
    isOpenNow: true,
    hours: '07:00 ص – 11:30 م',
    lat: 37.7621,
    lng: -122.4350,
    rating: 4.6,
  },
];

export const INITIAL_DOCTOR_VISITS: DoctorVisit[] = [];

export const INITIAL_CARE_NOTES: CareNote[] = [];
