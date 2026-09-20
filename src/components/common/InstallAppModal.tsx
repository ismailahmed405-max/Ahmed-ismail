import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePWAInstall } from '../../utils/usePWAInstall';
import {
  Smartphone,
  Download,
  Share2,
  Check,
  X,
  Apple,
  ExternalLink,
  QrCode,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { lang, t, isRTL } = useLanguage();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [activeDeviceTab, setActiveDeviceTab] = useState<'iphone' | 'android' | 'qr'>('iphone');

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeInstall = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 max-h-[92vh] flex flex-col text-slate-800"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {lang === 'ar' ? 'تثبيت تطبيق KinCare على هاتفك' : 'Install KinCare on Your Phone'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'ar'
                  ? 'يعمل كتطبيق جوال حقيقي بدون رسوم وبدون الحاجة لمتجر التطبيقات'
                  : 'Runs as a native mobile app directly with zero friction'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveDeviceTab('iphone')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
              activeDeviceTab === 'iphone'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>{lang === 'ar' ? 'آيفون (iOS)' : 'iPhone'}</span>
          </button>

          <button
            onClick={() => setActiveDeviceTab('android')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
              activeDeviceTab === 'android'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{lang === 'ar' ? 'أندرويد' : 'Android'}</span>
          </button>

          <button
            onClick={() => setActiveDeviceTab('qr')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
              activeDeviceTab === 'qr'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>{lang === 'ar' ? 'مشاركة الرابط' : 'Share Link'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-3 py-1">
          {activeDeviceTab === 'iphone' && (
            <div className="space-y-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                <Apple className="w-4 h-4 text-emerald-700" />
                <span>{lang === 'ar' ? 'طريقة التثبيت في ثوانٍ على الآيفون:' : 'Install on iPhone in 3 steps:'}</span>
              </div>

              <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    {lang === 'ar' ? (
                      <>افتح الرابط في متصفح <strong>Safari</strong>، ثم اضغط على زر <strong>المشاركة (Share ⎋)</strong> في أسفل الشاشة.</>
                    ) : (
                      <>Open link in <strong>Safari</strong>, then tap the <strong>Share icon (⎋)</strong> at the bottom bar.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    {lang === 'ar' ? (
                      <>مرر لأسفل القائمة واضغط على <strong>"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)</strong>.</>
                    ) : (
                      <>Scroll down and tap <strong>"Add to Home Screen"</strong>.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    {lang === 'ar' ? (
                      <>اضغط على زر <strong>"إضافة" (Add)</strong> أعلى اليمين. سيظهر التطبيق فوراً كأيقونة مستقلة على شاشة جهازك كأي تطبيق رسمي!</>
                    ) : (
                      <>Tap <strong>"Add"</strong> on the top right. KinCare is now installed as a standalone app!</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDeviceTab === 'android' && (
            <div className="space-y-3 bg-sky-50/70 border border-sky-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sky-900 font-extrabold text-sm">
                <Smartphone className="w-4 h-4 text-sky-700" />
                <span>{lang === 'ar' ? 'التثبيت المباشر على أندرويد (Chrome):' : 'Instant 1-Tap Install on Android:'}</span>
              </div>

              {isInstallable ? (
                <button
                  onClick={handleNativeInstall}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'اضغط هنا لتثبيت التطبيق فوراً' : 'Click here to install now'}</span>
                </button>
              ) : (
                <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  <p className="bg-white p-3 rounded-xl border border-slate-200">
                    {lang === 'ar'
                      ? 'إذا كنت في متصفح Chrome، اضغط على زر القائمة (ثلاث نقاط ⋮) في أعلى أو أسفل المتصفح، ثم اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية".'
                      : 'In Google Chrome, tap the menu icon (⋮) and select "Install App" or "Add to Home screen".'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeDeviceTab === 'qr' && (
            <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-slate-900 font-extrabold text-sm">
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ar' ? 'شارك الرابط مع أفراد العائلة' : 'Share with Family Members'}</span>
              </div>

              <p className="text-xs text-slate-500">
                {lang === 'ar'
                  ? 'أرسل هذا الرابط لأي شخص من الإخوة ليفتحه على هاتفه ويثبته فوراً:'
                  : 'Send this direct link to any sibling to open and install on their phone:'}
              </p>

              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-xl p-2">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 bg-transparent text-xs text-slate-700 outline-none truncate font-mono select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ الرابط' : 'Copy')}</span>
                </button>
              </div>

              <div className="pt-1">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    lang === 'ar'
                      ? `رابط تطبيق رعاية الوالدين KinCare: ${currentUrl}`
                      : `Family Care app link: ${currentUrl}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition shadow-xs"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إرسال الرابط عبر واتساب للعائلة' : 'Share Link via WhatsApp'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          )}

          {/* Value Badges */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-bold text-slate-600">
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{lang === 'ar' ? 'سرعة فائقة وبدون إعلانات' : 'Lightning fast & ad-free'}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lang === 'ar' ? 'حفظ البيانات محلياً بخصوصية' : '100% Private local storage'}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
