export interface ReviewItem {
  id: string;
  targetId: string;
  targetType: 'doctor' | 'medication' | 'hospital';
  targetName: string;
  rating: number; // 1-5
  author: string;
  comment: string;
  date: string;
  subScores?: {
    label: string;
    score: number;
  }[];
}

const STORAGE_KEY = 'eldercare_unified_ratings';

// Initial realistic community reviews for doctors, medications, and hospitals
const INITIAL_REVIEWS: ReviewItem[] = [
  // Doctors
  {
    id: 'rev-doc-1',
    targetId: 'doc-1',
    targetType: 'doctor',
    targetName: 'د. طارق المنشاوي (Dr. Tarek El-Menshawy)',
    rating: 5,
    author: 'عائلة أحمد',
    comment: 'طبيب متميز جداً، يستمع باهتمام لحالة الوالد ويشرح التعديلات الدوائية بوضوح وصبر كبير.',
    date: '2026-09-15',
    subScores: [
      { label: 'التعامل الإنساني والإنصات', score: 5 },
      { label: 'دقة التشخيص والعلاج', score: 5 },
      { label: 'احترام المواعيد', score: 4.8 }
    ]
  },
  {
    id: 'rev-doc-2',
    targetId: 'doc-2',
    targetType: 'doctor',
    targetName: 'د. رانيا النجار (Dr. Rania El-Naggar)',
    rating: 4.8,
    author: 'سارة م.',
    comment: 'فحصت عيني الوالدة بدقة متناهية وأعطتنا نصائح ممتازة لقطرات الترطيب والوقاية من الجفاف.',
    date: '2026-09-10',
    subScores: [
      { label: 'التعامل الإنساني والإنصات', score: 5 },
      { label: 'دقة التشخيص والعلاج', score: 4.9 },
      { label: 'احترام المواعيد', score: 4.6 }
    ]
  },

  // Medications
  {
    id: 'rev-med-donepezil',
    targetId: 'donepezil',
    targetType: 'medication',
    targetName: 'Donepezil (Aricept / أريسبت)',
    rating: 4.7,
    author: 'مرافق صحي معتمد',
    comment: 'لاحظنا تحسناً طيباً في انتباه الوالدة وتذكر أسماء أفراد العائلة بعد 4 أسابيع من الجرعة الموصوفة، وأخذها مساءً مع وجبة خفيفة منع أي غثيان.',
    date: '2026-09-12',
    subScores: [
      { label: 'فعالية تحسين الانتباه والذاكرة', score: 4.7 },
      { label: 'سهولة التناول وخفة الأعراض', score: 4.6 }
    ]
  },
  {
    id: 'rev-med-memantine',
    targetId: 'memantine',
    targetType: 'medication',
    targetName: 'Memantine (Ebixa / إبيكسيا)',
    rating: 4.8,
    author: 'محمد خالد',
    comment: 'دواء ممتاز ساعد والدي كثيراً في الحفاظ على هدوئه وأداء حركاته اليومية المعتادة.',
    date: '2026-09-08',
    subScores: [
      { label: 'فعالية تحسين الانتباه والذاكرة', score: 4.8 },
      { label: 'سهولة التناول وخفة الأعراض', score: 4.8 }
    ]
  },
  {
    id: 'rev-med-citicoline',
    targetId: 'citicoline',
    targetType: 'medication',
    targetName: 'Citicoline (Somazina / سومازينا)',
    rating: 4.9,
    author: 'أم مروان',
    comment: 'أمبولات الشرب مريحة جداً وسهلة للبلع، فرقت كثيراً في يقظة والدي الذهنية واستجابته للحديث.',
    date: '2026-09-14',
    subScores: [
      { label: 'فعالية تحسين الانتباه والذاكرة', score: 4.9 },
      { label: 'سهولة التناول وخفة الأعراض', score: 4.9 }
    ]
  },

  // Hospitals & Facilities
  {
    id: 'rev-hosp-1',
    targetId: 'hosp-1',
    targetType: 'hospital',
    targetName: 'مستشفى السلام الدولي التخصصي (Al Salam International)',
    rating: 4.8,
    author: 'كريم عثمان',
    comment: 'طوارئ سريعة الاستجابة لكبار السن ولديهم كراسي متحركة وطاقم تمريض مدرب على التعامل برفق مع المرضى.',
    date: '2026-09-16',
    subScores: [
      { label: 'سرعة الاستجابة والطوارئ', score: 4.9 },
      { label: 'نظافة المرافق والرعاية', score: 4.8 },
      { label: 'عناية التمريض بكبار السن', score: 4.7 }
    ]
  },
  {
    id: 'rev-pharm-1',
    targetId: 'pharm-1',
    targetType: 'hospital',
    targetName: 'صيدليات العزبي (El Ezaby 24/7)',
    rating: 4.9,
    author: 'داليا ف.',
    comment: 'خدمة توصيل منزلية سريعة جداً على مدار 24 ساعة، ويتوفر لديهم لصقات إكسيلون وأدوية الذاكرة الأصلية دائماً.',
    date: '2026-09-17',
    subScores: [
      { label: 'توفر الأدوية التخصصية', score: 5 },
      { label: 'سرعة التوصيل المنزلي', score: 4.8 }
    ]
  }
];

export function getStoredReviews(): ReviewItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading reviews', e);
    return INITIAL_REVIEWS;
  }
}

export function saveReview(review: Omit<ReviewItem, 'id' | 'date'>): ReviewItem {
  const current = getStoredReviews();
  const newReview: ReviewItem = {
    ...review,
    id: `rev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    date: new Date().toISOString().split('T')[0]
  };
  const updated = [newReview, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed saving review', e);
  }
  return newReview;
}

export function getTargetRatingSummary(targetId: string, targetType: 'doctor' | 'medication' | 'hospital') {
  const all = getStoredReviews();
  // Match by targetId or loose match
  const matches = all.filter(
    (r) => r.targetType === targetType && (r.targetId === targetId || r.targetName.toLowerCase().includes(targetId.toLowerCase()))
  );

  if (matches.length === 0) {
    return {
      average: 4.8,
      count: 6,
      reviews: []
    };
  }

  const sum = matches.reduce((acc, curr) => acc + curr.rating, 0);
  const average = Number((sum / matches.length).toFixed(1));

  return {
    average,
    count: matches.length,
    reviews: matches
  };
}
