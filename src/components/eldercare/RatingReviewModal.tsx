import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Star, X, CheckCircle, MessageSquare, User, ShieldCheck } from 'lucide-react';
import { getStoredReviews, saveReview, ReviewItem, getTargetRatingSummary } from '../../utils/ratingsStorage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'doctor' | 'medication' | 'hospital';
  targetName: string;
  onReviewAdded?: () => void;
}

export const RatingReviewModal: React.FC<Props> = ({
  isOpen,
  onClose,
  targetId,
  targetType,
  targetName,
  onReviewAdded
}) => {
  const { lang, isRTL } = useLanguage();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const summary = getTargetRatingSummary(targetId, targetType);

  const getCategoryLabel = () => {
    switch (targetType) {
      case 'doctor':
        return lang === 'ar' ? 'تقييم الطبيب' : 'Doctor Evaluation';
      case 'medication':
        return lang === 'ar' ? 'تقييم تجربة الدواء' : 'Medication Experience';
      case 'hospital':
        return lang === 'ar' ? 'تقييم المستشفى / المركز الطبي' : 'Hospital / Facility Review';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    saveReview({
      targetId,
      targetType,
      targetName,
      rating,
      author: author.trim() || (lang === 'ar' ? 'مرافق أسري' : 'Family Caregiver'),
      comment: comment.trim(),
      subScores: [
        {
          label:
            targetType === 'doctor'
              ? lang === 'ar'
                ? 'التعامل الإنساني والإنصات'
                : 'Bedside Manner'
              : targetType === 'medication'
              ? lang === 'ar'
                ? 'الفعالية والتحمل'
                : 'Efficacy & Tolerability'
              : lang === 'ar'
              ? 'سرعة الاستجابة والنظافة'
              : 'Speed & Hygiene',
          score: rating
        }
      ]
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setComment('');
      if (onReviewAdded) onReviewAdded();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 text-slate-800 relative max-h-[90vh] overflow-y-auto"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-2xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-5 pe-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{getCategoryLabel()}</span>
          </div>
          <h3 className="text-lg font-black text-slate-900">{targetName}</h3>
          <p className="text-xs text-slate-500 font-medium">
            {lang === 'ar'
              ? 'شارك تقييمك ورأيك لمساعدة أفراد العائلات والمرافقين الآخرين'
              : 'Share your feedback and rating to assist other caregiving families'}
          </p>
        </div>

        {/* Current Score Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-slate-900">{summary.average}</div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= Math.round(summary.average)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-slate-200 text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {lang === 'ar' ? `بناءً على ${summary.count} تقييمات موثقة` : `Based on ${summary.count} caregiver reviews`}
              </div>
            </div>
          </div>

          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تقييم معتمد' : 'Verified'}</span>
          </div>
        </div>

        {/* Success Alert */}
        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h4 className="font-black text-slate-900 text-base">
              {lang === 'ar' ? 'تم تسجيل تقييمك بنجاح!' : 'Review Submitted Successfully!'}
            </h4>
            <p className="text-xs text-slate-500">
              {lang === 'ar' ? 'شكراً لمساهمتك القيمة في خدمة كبار السن.' : 'Thank you for supporting elder caregiving.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Interactive Stars Picker */}
            <div className="space-y-1.5 text-center py-2">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === 'ar' ? 'حدد تقييمك بالنجوم:' : 'Select Star Rating:'}
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isFilled = (hoverRating || rating) >= starValue;
                  return (
                    <button
                      type="button"
                      key={starValue}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          isFilled
                            ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                            : 'fill-slate-100 text-slate-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-slate-500">
                {rating === 5
                  ? lang === 'ar'
                    ? 'ممتاز جداً (5/5)'
                    : 'Excellent (5/5)'
                  : rating === 4
                  ? lang === 'ar'
                    ? 'جيد جداً (4/5)'
                    : 'Very Good (4/5)'
                  : rating === 3
                  ? lang === 'ar'
                    ? 'متوسط ومقبول (3/5)'
                    : 'Acceptable (3/5)'
                  : lang === 'ar'
                  ? 'بحاجة لتحسين'
                  : 'Needs Improvement'}
              </span>
            </div>

            {/* Author Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{lang === 'ar' ? 'اسمك أو صفتك (اختياري):' : 'Your Name / Caregiver Role (Optional):'}</span>
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: ابن / ابنة / مرافق صحي' : 'e.g., Son, Daughter, Nurse'}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-emerald-600 transition"
              />
            </div>

            {/* Comment */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                <span>{lang === 'ar' ? 'رأيك وملاحظاتك بالتفصيل:' : 'Your Detailed Experience & Feedback:'}</span>
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  targetType === 'doctor'
                    ? lang === 'ar'
                      ? 'وضح مدى اهتمامه بكبير السن، انضباط المواعيد، ووضوح الخطة العلاجية...'
                      : 'Share his attention to senior health, punctuality, and clear plan...'
                    : targetType === 'medication'
                    ? lang === 'ar'
                      ? 'اذكر أثر الدواء على نشاط الذاكرة، سهولة تناوله، وأي ملاحظات للأسر الأخرى...'
                      : 'Describe cognitive impact, tolerability, and tips for other families...'
                    : lang === 'ar'
                    ? 'وضح سرعة استقبال الطوارئ، نظافة المكان، ورعاية التمريض...'
                    : 'Describe emergency speed, cleanliness, and nursing staff care...'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 outline-none focus:border-emerald-600 transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-xs transition cursor-pointer"
              >
                {lang === 'ar' ? 'حفظ التقييم' : 'Submit Review'}
              </button>
            </div>
          </form>
        )}

        {/* Existing Reviews List */}
        {summary.reviews.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {lang === 'ar' ? 'تقييمات العائلات السابقة:' : 'Previous Caregiver Reviews:'}
            </h4>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pe-1">
              {summary.reviews.map((rev) => (
                <div key={rev.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-800">{rev.author}</div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{rev.comment}</p>
                  <div className="text-[10px] text-slate-400 text-end">{rev.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
