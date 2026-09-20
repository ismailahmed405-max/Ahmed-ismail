import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/common/Header';
import { PWAInstallBanner } from './components/common/PWAInstallBanner';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { ElderCareView } from './components/eldercare/ElderCareView';

interface UserData {
  name: string;
  email: string;
  familyName: string;
}

function AppContent() {
  const { lang, isRTL } = useLanguage();

  // PRO subscription state
  const [isProUser, setIsProUser] = useState<boolean>(() => {
    return localStorage.getItem('kincare_is_pro') === 'true';
  });

  // User Account state
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    try {
      const saved = localStorage.getItem('kincare_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleUpgradeToPro = (plan: 'annual' | 'monthly') => {
    setIsProUser(true);
    localStorage.setItem('kincare_is_pro', 'true');
    localStorage.setItem('kincare_pro_plan', plan);
  };

  const handleRegisterUser = (userData: UserData) => {
    setCurrentUser(userData);
    localStorage.setItem('kincare_current_user', JSON.stringify(userData));
  };

  const handleLogoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('kincare_current_user');
  };

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Top Banner for 1-tap PWA Mobile Installation */}
      <PWAInstallBanner />

      {/* Main Header with Language, User Account & PRO Modals */}
      <Header
        isProUser={isProUser}
        onUpgradeToPro={handleUpgradeToPro}
        currentUser={currentUser}
        onRegisterUser={handleRegisterUser}
        onLogoutUser={handleLogoutUser}
      />

      {/* Primary Dedicated Elder-Care Hub */}
      <main className="flex-1">
        <ElderCareView />
      </main>

      {/* Offline Connectivity Toast */}
      <OfflineIndicator />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 mt-10 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {lang === 'ar'
              ? 'KinCare • منصة التنسيق العائلي لرعاية الوالدين وكبار السن'
              : 'KinCare • Family Care Coordination Platform'}
          </span>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              ✓ {lang === 'ar' ? 'تطبيق PWA مثبت وجاهز' : 'PWA Ready'}
            </span>
            <span className="font-mono text-[11px]">
              {lang === 'ar' ? 'البيانات محفوظة محلياً بأمان' : 'Secure local storage'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
