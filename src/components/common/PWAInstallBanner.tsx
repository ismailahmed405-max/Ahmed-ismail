import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePWAInstall } from '../../utils/usePWAInstall';
import { Smartphone, Download, X, ShieldCheck } from 'lucide-react';
import { InstallAppModal } from './InstallAppModal';

export const PWAInstallBanner: React.FC = () => {
  const { lang, isRTL } = useLanguage();
  const { isInstalled } = usePWAInstall();
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem('kincare_banner_dismissed') === 'true';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Don't show if already running as installed app or dismissed in this session
  if (isInstalled || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('kincare_banner_dismissed', 'true');
  };

  return (
    <>
      <div
        className="bg-emerald-800 text-white px-4 py-2.5 shadow-md flex items-center justify-between gap-3 text-xs"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-xl bg-emerald-700/80 flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4 text-emerald-200" />
          </div>
          <div className="truncate">
            <span className="font-extrabold">
              {lang === 'ar' ? 'تطبيق KinCare للجوال: ' : 'KinCare Mobile App: '}
            </span>
            <span className="text-emerald-100 font-medium">
              {lang === 'ar'
                ? 'ثبت التطبيق على هاتفك الآن لمتابعة أدوية ومواعيد الوالدين بسهولة'
                : 'Install on your home screen for quick 1-tap family access'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-900 rounded-lg font-bold text-xs shadow-xs transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تثبيت التطبيق' : 'Install App'}</span>
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 text-emerald-300 hover:text-white transition"
            title={lang === 'ar' ? 'إغلاق' : 'Dismiss'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <InstallAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
