import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { User, Lock, Mail, Heart, Check, X, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { ParentProfile } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; email: string; familyName: string } | null;
  onRegister: (userData: { name: string; email: string; familyName: string }) => void;
  onLogout: () => void;
}

export const UserAuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  onRegister,
  onLogout,
}) => {
  const { lang, isRTL } = useLanguage();
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onRegister({
      name: name.trim(),
      email: email.trim(),
      familyName: familyName.trim() || (lang === 'ar' ? `عائلة ${name}` : `${name} Family`),
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 max-h-[90vh] flex flex-col text-slate-800"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {currentUser
                  ? lang === 'ar'
                    ? 'حساب العائلة المسجل'
                    : 'Registered Family Account'
                  : mode === 'register'
                  ? lang === 'ar'
                    ? 'تسجيل مستخدم وعائلة جديدة'
                    : 'Register New Family Account'
                  : lang === 'ar'
                  ? 'تسجيل الدخول'
                  : 'Sign In'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'ar'
                  ? 'لحفظ وتنسيق رعاية الوالدين بين جميع الإخوة'
                  : 'To synchronize parent care among siblings'}
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

        {/* If user is already logged in */}
        {currentUser ? (
          <div className="space-y-4 py-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">
                  {lang === 'ar' ? 'العائلة:' : 'Family:'}
                </span>
                <span className="text-xs font-black text-emerald-950 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                  {currentUser.familyName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{lang === 'ar' ? 'المستخدم:' : 'User:'}</span>
                <span className="text-xs font-bold text-slate-800">{currentUser.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{lang === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</span>
                <span className="text-xs font-mono text-slate-700">{currentUser.email}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              {lang === 'ar'
                ? 'جميع الأدوية والمواعيد والمؤشرات التي تضيفها يتم حفظها تحت حساب عائلتك فوراً.'
                : 'All medication schedules and doctor visits are saved to your family cloud.'}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onLogout}
                className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition"
              >
                {lang === 'ar' ? 'تسجيل الخروج أو إنشاء حساب آخر' : 'Log Out / New Account'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
              >
                {lang === 'ar' ? 'تم ومتابعة' : 'Continue'}
              </button>
            </div>
          </div>
        ) : (
          /* Registration / Login Form */
          <form onSubmit={handleSubmit} className="space-y-3.5 py-1">
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`py-1.5 rounded-lg transition ${
                  mode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                {lang === 'ar' ? 'إنشاء حساب جديد' : 'Register New'}
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-1.5 rounded-lg transition ${
                  mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                {lang === 'ar' ? 'اسمك بالكامل (الابن / الابنة):' : 'Your Full Name:'}
              </label>
              <input
                type="text"
                required
                placeholder={lang === 'ar' ? 'أدخل الاسم هنا' : 'Enter full name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600"
              />
            </div>

            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'ar' ? 'اسم العائلة:' : 'Family Account Name:'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'أدخل اسم العائلة' : 'Enter family name'}
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                {lang === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                {lang === 'ar' ? 'كلمة المرور:' : 'Password:'}
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {success ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تم التسجيل بنجاح!' : 'Successfully Registered!'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {mode === 'register'
                      ? lang === 'ar'
                        ? 'إنشاء الحساب وبدء رعاية العائلة'
                        : 'Create Family Account'
                      : lang === 'ar'
                      ? 'تسجيل الدخول'
                      : 'Sign In'}
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
