import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Crown,
  Check,
  Sparkles,
  ShieldCheck,
  CreditCard,
  X,
  Lock,
  Smartphone,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isProUser: boolean;
  onUpgradeToPro: (plan: 'annual' | 'monthly') => void;
}

export const SubscriptionPaywallModal: React.FC<Props> = ({
  isOpen,
  onClose,
  isProUser,
  onUpgradeToPro,
}) => {
  const { lang, isRTL } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'google_pay' | 'card' | 'paypal'>('apple_pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);
  
  // Card input mock states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessNotice(true);
      onUpgradeToPro(selectedPlan);
      setTimeout(() => {
        setSuccessNotice(false);
        onClose();
      }, 1600);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl border border-amber-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 max-h-[95vh] flex flex-col text-slate-800 overflow-hidden relative my-auto"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Accent Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-500" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pt-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <Crown className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">
                  {lang === 'ar' ? 'باقة KinCare PRO العائلية' : 'KinCare Family PRO'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-[10px] uppercase tracking-wider">
                  VIP
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'ar'
                  ? 'رعاية كلا الوالدين بدون قيود، مزامنة غير محدودة للإخوة وتقارير PDF'
                  : 'Unlimited care for both parents, unlimited siblings & PDF reports'}
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

        <div className="overflow-y-auto flex-1 space-y-4 pr-1 pl-1">
          {/* Plan Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Annual */}
            <div
              onClick={() => setSelectedPlan('annual')}
              className={`cursor-pointer rounded-2xl p-3.5 border-2 transition-all relative flex flex-col justify-between ${
                selectedPlan === 'annual'
                  ? 'border-emerald-600 bg-emerald-50/60 shadow-md ring-1 ring-emerald-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="absolute -top-2.5 left-3 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                {lang === 'ar' ? 'الأكثر توفيراً (خصم 45%)' : 'Best Value -45%'}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    {lang === 'ar' ? 'الاشتراك السنوي' : 'Annual Plan'}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'annual' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                    }`}
                  >
                    {selectedPlan === 'annual' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">$39.99</span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {lang === 'ar' ? '/ سنة' : '/ year'}
                  </span>
                </div>
                <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                  {lang === 'ar' ? 'فقط $3.33 شهرياً (3 أيام مجاناً)' : '$3.33/mo (3 days free trial)'}
                </p>
              </div>
            </div>

            {/* Monthly */}
            <div
              onClick={() => setSelectedPlan('monthly')}
              className={`cursor-pointer rounded-2xl p-3.5 border-2 transition-all relative flex flex-col justify-between ${
                selectedPlan === 'monthly'
                  ? 'border-emerald-600 bg-emerald-50/60 shadow-md ring-1 ring-emerald-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    {lang === 'ar' ? 'الاشتراك الشهري' : 'Monthly Plan'}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'monthly' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                    }`}
                  >
                    {selectedPlan === 'monthly' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">$4.99</span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {lang === 'ar' ? '/ شهر' : '/ month'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {lang === 'ar' ? 'إلغاء في أي وقت' : 'Cancel anytime'}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="space-y-2.5 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                {lang === 'ar' ? 'اختر طريقة الدفع:' : 'Select Payment Method:'}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                {lang === 'ar' ? 'دفع آمن ومشفّر 256-bit' : '256-bit SSL Secure'}
              </span>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span> Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition ${
                  paymentMethod === 'card'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'بطاقة بنكية' : 'Card'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 border transition ${
                  paymentMethod === 'paypal'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>PayPal</span>
              </button>
            </div>

            {/* Card Form when Card is selected */}
            {paymentMethod === 'card' && (
              <div className="space-y-2 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">
                    {lang === 'ar' ? 'رقم البطاقة (Visa / Mastercard / مدى)' : 'Card Number'}
                  </label>
                  <input
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">
                      {lang === 'ar' ? 'تاريخ الانتهاء' : 'Expiry (MM/YY)'}
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">
                      {lang === 'ar' ? 'رمز الأمان CVC' : 'CVC'}
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'apple_pay' && (
              <p className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-slate-700 shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'سيتم الخصم مباشرة عبر Apple Pay باستخدام Face ID / Touch ID على جهازك.'
                    : 'Instant 1-tap checkout with Apple Pay Face ID / Touch ID.'}
                </span>
              </p>
            )}

            {paymentMethod === 'paypal' && (
              <p className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200">
                {lang === 'ar'
                  ? 'سيتم تحويلك إلى صفحة PayPal الآمنة لتأكيد الاشتراك والخصم التلقائي.'
                  : 'You will be redirected to PayPal secure checkout to authorize your plan.'}
              </p>
            )}
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2 space-y-2 border-t border-slate-100">
          <button
            id="confirm-payment-btn"
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : successNotice ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                <span>{lang === 'ar' ? 'تم الدفع وتفعيل باقة PRO بنجاح! 🎉' : 'Payment Success! PRO Activated 🎉'}</span>
              </>
            ) : (
              <>
                <Crown className="w-4 h-4 fill-white" />
                <span>
                  {selectedPlan === 'annual'
                    ? lang === 'ar'
                      ? `ادفع الآن $39.99 (تجربة 3 أيام مجاناً)`
                      : `Pay $39.99 (3-Day Free Trial)`
                    : lang === 'ar'
                    ? `ادفع الآن $4.99 / شهر`
                    : `Pay $4.99 / month`}
                </span>
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-slate-400 font-medium">
            {lang === 'ar'
              ? 'تتم معالجة المدفوعات بأعلى معايير الأمان المصرفي PCI-DSS. يمكنك الإلغاء في أي وقت بنقرة واحدة.'
              : 'PCI-DSS Compliant bank security. Cancel anytime with 1 click.'}
          </p>
        </div>
      </div>
    </div>
  );
};
