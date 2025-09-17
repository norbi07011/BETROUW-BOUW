
import React, { useState, useRef, useEffect } from 'react';
import type { Language, LanguageCode } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDownIcon, NLFlag, GBFlag, TRFlag, PLFlag, BGFlag, SAFlag, DEFlag, HUFlag, FRFlag } from './icons';

const languages: Language[] = [
  { code: 'nl', name: 'Nederlands', flag: NLFlag },
  { code: 'en', name: 'English', flag: GBFlag },
  { code: 'tr', name: 'Türkçe', flag: TRFlag },
  { code: 'pl', name: 'Polski', flag: PLFlag },
  { code: 'bg', name: 'Български', flag: BGFlag },
  { code: 'ar', name: 'العربية', flag: SAFlag },
  { code: 'de', name: 'Deutsch', flag: DEFlag },
  { code: 'hu', name: 'Magyar', flag: HUFlag },
  { code: 'fr', name: 'Français', flag: FRFlag },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <currentLanguage.flag className="h-5 w-5 rounded-full" />
        <span className="text-sm font-semibold uppercase">{currentLanguage.code}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 end-0 bg-white rounded-lg shadow-xl border border-gray-200 w-40 z-50">
          <ul className="py-1">
            {languages.map(lang => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className="w-full text-left flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <lang.flag className="h-5 w-5 rounded-full" />
                  <span>{lang.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
