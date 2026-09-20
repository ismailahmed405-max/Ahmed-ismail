import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const { lang, isRTL } = useLanguage();
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xs text-white p-3 shadow-xl border border-slate-700 text-xs font-medium"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span>
        {lang === 'ar'
          ? 'وضع عدم الاتصال: التطبيق يعمل بشكل طبيعي والبيانات محفوظة محلياً.'
          : 'Offline Mode: Application is active using local cached data.'}
      </span>
    </div>
  );
};
