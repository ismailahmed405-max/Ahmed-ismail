import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MedicalFacility } from '../../types';
import { INITIAL_NEARBY_FACILITIES } from '../../data/mockData';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Cross,
  Pill,
  Building2,
  X,
  ExternalLink,
  ShieldCheck,
  Star,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  focusedFacilityType?: 'all' | 'pharmacy' | 'hospital';
}

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyC90d2skzeR-TBZVJcNdcr8VYT7usy9GYU';

export const NearestFacilitiesMapModal: React.FC<Props> = ({
  isOpen,
  onClose,
  focusedFacilityType = 'all',
}) => {
  const { lang, isRTL } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'pharmacy' | 'hospital'>(focusedFacilityType);
  const [selectedFacility, setSelectedFacility] = useState<MedicalFacility | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.7749,
    lng: -122.4194,
  });

  if (!isOpen) return null;

  const facilities = INITIAL_NEARBY_FACILITIES.filter((f) => {
    if (filterType === 'all') return true;
    return f.type === filterType;
  });

  const handleSelectFacility = (fac: MedicalFacility) => {
    setSelectedFacility(fac);
    setMapCenter({ lat: fac.lat, lng: fac.lng });
  };

  const getDirectionsUrl = (fac: MedicalFacility) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${fac.lat},${fac.lng}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in overflow-hidden">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full h-[90vh] flex flex-col text-slate-800 overflow-hidden relative"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  {lang === 'ar' ? 'خريطة أقرب صيدلية ومستشفى' : 'Nearest Pharmacies & Hospitals'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  Google Maps Live
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'ar'
                  ? 'ابحث وتواصل فوراً مع الصيدليات والمستشفيات الأقرب لمنزل الوالدين'
                  : 'Find and reach the nearest medical centers and pharmacies with 1-click directions'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Pills */}
            <div className="hidden sm:flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold shadow-2xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg transition ${
                  filterType === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'ar' ? 'الكل' : 'All'}
              </button>
              <button
                onClick={() => setFilterType('pharmacy')}
                className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${
                  filterType === 'pharmacy' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Pill className="w-3 h-3" />
                <span>{lang === 'ar' ? 'صيدليات' : 'Pharmacies'}</span>
              </button>
              <button
                onClick={() => setFilterType('hospital')}
                className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${
                  filterType === 'hospital' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3 h-3" />
                <span>{lang === 'ar' ? 'مستشفيات' : 'Hospitals'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Filter Row */}
        <div className="flex sm:hidden items-center justify-around p-2 bg-slate-100 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg ${filterType === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            {lang === 'ar' ? 'الكل' : 'All'}
          </button>
          <button
            onClick={() => setFilterType('pharmacy')}
            className={`px-3 py-1 rounded-lg ${filterType === 'pharmacy' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
          >
            {lang === 'ar' ? 'صيدليات' : 'Pharmacies'}
          </button>
          <button
            onClick={() => setFilterType('hospital')}
            className={`px-3 py-1 rounded-lg ${filterType === 'hospital' ? 'bg-rose-600 text-white' : 'text-slate-600'}`}
          >
            {lang === 'ar' ? 'مستشفيات' : 'Hospitals'}
          </button>
        </div>

        {/* Body Split: Left List / Right Map */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Facility List Sidebar */}
          <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-slate-200 overflow-y-auto p-3 space-y-2.5 bg-slate-50/50 max-h-48 md:max-h-none shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              {lang === 'ar'
                ? `الأماكن المتاحة القريبة (${facilities.length}):`
                : `Nearby Locations (${facilities.length}):`}
            </div>

            {facilities.map((fac) => {
              const isSelected = selectedFacility?.id === fac.id;
              const isPharmacy = fac.type === 'pharmacy';

              return (
                <div
                  key={fac.id}
                  onClick={() => handleSelectFacility(fac)}
                  className={`cursor-pointer rounded-2xl p-3 border transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 ${
                          isPharmacy ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}
                      >
                        {isPharmacy ? <Pill className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-extrabold text-xs text-slate-900 line-clamp-1">{fac.name}</span>
                    </div>

                    <span className="text-[11px] font-bold text-slate-500 shrink-0 bg-slate-100 px-2 py-0.5 rounded-full">
                      {fac.distanceKm} {lang === 'ar' ? 'كم' : 'km'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{fac.address}</span>
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {fac.hours}
                    </span>

                    <a
                      href={`tel:${fac.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-bold text-sky-600 hover:text-sky-700"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Map */}
          <div className="flex-1 h-full min-h-[300px] relative">
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
              <Map
                mapId="DEMO_MAP_ID"
                center={mapCenter}
                zoom={14}
                gestureHandling="greedy"
                disableDefaultUI={false}
                className="w-full h-full"
              >
                {facilities.map((fac) => {
                  const isPharmacy = fac.type === 'pharmacy';
                  return (
                    <AdvancedMarker
                      key={fac.id}
                      position={{ lat: fac.lat, lng: fac.lng }}
                      onClick={() => handleSelectFacility(fac)}
                      title={fac.name}
                    >
                      <Pin
                        background={isPharmacy ? '#059669' : '#dc2626'}
                        borderColor="#ffffff"
                        glyphColor="#ffffff"
                        scale={1.1}
                      />
                    </AdvancedMarker>
                  );
                })}

                {selectedFacility && (
                  <InfoWindow
                    position={{ lat: selectedFacility.lat, lng: selectedFacility.lng }}
                    onCloseClick={() => setSelectedFacility(null)}
                  >
                    <div className="p-2 space-y-2 max-w-xs text-slate-800" dir={isRTL ? 'rtl' : 'ltr'}>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black text-white ${
                            selectedFacility.type === 'pharmacy' ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        >
                          {selectedFacility.type === 'pharmacy'
                            ? lang === 'ar'
                              ? 'صيدلية'
                              : 'Pharmacy'
                            : lang === 'ar'
                            ? 'مستشفى'
                            : 'Hospital'}
                        </span>
                        <span className="font-bold text-xs text-slate-500">
                          {selectedFacility.distanceKm} km away
                        </span>
                      </div>

                      <h4 className="font-black text-sm text-slate-900">{selectedFacility.name}</h4>
                      <p className="text-xs text-slate-500">{selectedFacility.address}</p>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={getDirectionsUrl(selectedFacility)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-1.5 px-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'الاتجاهات' : 'Directions'}</span>
                        </a>

                        <a
                          href={`tel:${selectedFacility.phone}`}
                          className="py-1.5 px-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                        </a>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
