import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, Language } from '../../context/LanguageContext';
import { InstallAppModal } from './InstallAppModal';
import { SubscriptionPaywallModal } from './SubscriptionPaywallModal';
import { UserAuthModal } from './UserAuthModal';
import {
  HeartHandshake,
  Smartphone,
  Share2,
  Crown,
  User,
  Sparkles,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';

interface Props {
  isProUser: boolean;
  onUpgradeToPro: (plan: 'annual' | 'monthly') => void;
  currentUser: { name: string; email: string; familyName: string } | null;
  onRegisterUser: (data: { name: string; email: string; familyName: string }) => void;
  onLogoutUser: () => void;
}

export const Header: React.FC<Props> = ({
  isProUser,
  onUpgradeToPro,
  currentUser,
  onRegisterUser,
  onLogoutUser,
}) => {
  const { lang, setLang, t, isRTL } = useLanguage();
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Brand & Context */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {lang === 'ar' ? 'KinCare • رعاية كبار السن' : 'KinCare • Elder Care Hub'}
                </span>
                
                {isProUser ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    <Crown className="w-3 h-3 fill-amber-500 text-amber-600" />
                    PRO VIP
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {lang === 'ar' ? 'تطبيق العائلة' : 'Family Care'}
                  </span>
                )}

                {/* Logged in family tag */}
                {currentUser && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                    {currentUser.familyName}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'ar'
                  ? 'جدول الأدوية المشترك، زيارات الأطباء، والمؤشرات الحيوية للوالدين'
                  : 'Sibling coordination for medications, rides & vital care'}
              </p>
            </div>
          </div>

          {/* Right Action Controls: User Account, PRO Upgrade, Install on Phone & Language */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto flex-wrap">
            {/* User Account / Register Button */}
            <button
              id="header-user-account-btn"
              onClick={() => setIsAuthModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                currentUser
                  ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
              title={lang === 'ar' ? 'حساب العائلة والمستخدم' : 'Family Account'}
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {currentUser
                  ? currentUser.name.split(' ')[0]
                  : lang === 'ar'
                  ? 'تسجيل مستخدم'
                  : 'Family Sign In'}
              </span>
            </button>

            {/* PRO / Subscription Upgrade Button */}
            {!isProUser ? (
              <button
                id="header-upgrade-pro-btn"
                onClick={() => setIsPaywallOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-xs transition cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 fill-slate-950" />
                <span>{lang === 'ar' ? 'ترقية لـ PRO' : 'Get PRO'}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsPaywallOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{lang === 'ar' ? 'عضوية PRO' : 'PRO Active'}</span>
              </button>
            )}

            {/* Install / Download App on Mobile Button */}
            <button
              id="header-install-app-btn"
              onClick={() => setIsInstallModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              title={lang === 'ar' ? 'تثبيت على الهاتف' : 'Install on Phone'}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'تثبيت' : 'Install'}</span>
            </button>

            {/* Share link button */}
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
              title={lang === 'ar' ? 'مشاركة الرابط' : 'Share link'}
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Multi-Language Switcher Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                id="header-language-select-btn"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-black transition cursor-pointer shadow-2xs"
                title="تغيير اللغة والبلد / Change Language & Country"
              >
                <span className="text-sm">{activeLangObj.flag}</span>
                <span className="hidden sm:inline font-bold">{activeLangObj.nativeLabel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isLangMenuOpen && (
                <div
                  className="absolute end-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fade-in"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>{lang === 'ar' ? 'اختر اللغة والبلد' : 'Select Language & Region'}</span>
                    <Globe className="w-3 h-3" />
                  </div>

                  <div className="py-1 max-h-60 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((langOption) => {
                      const isCurrent = langOption.code === lang;
                      return (
                        <button
                          key={langOption.code}
                          onClick={() => {
                            setLang(langOption.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-xs flex items-center justify-between transition text-start cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-50 text-emerald-900 font-black'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{langOption.flag}</span>
                            <div>
                              <div className="font-extrabold">{langOption.nativeLabel}</div>
                              <div className="text-[10px] text-slate-400">{langOption.region}</div>
                            </div>
                          </div>
                          {isCurrent && <Check className="w-4 h-4 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Install Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Subscription Paywall & Payment Modal */}
      <SubscriptionPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        isProUser={isProUser}
        onUpgradeToPro={onUpgradeToPro}
      />

      {/* User Registration & Account Modal */}
      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onRegister={onRegisterUser}
        onLogout={onLogoutUser}
      />
    </>
  );
};
