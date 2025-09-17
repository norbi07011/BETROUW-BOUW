
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import type { LanguageCode } from '../types';

type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  direction: Direction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const defaultLanguage: LanguageCode = 'nl';
const rtlLanguages: LanguageCode[] = ['ar'];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage as LanguageCode) || defaultLanguage;
    } catch (error) {
      return defaultLanguage;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Failed to save language to localStorage', error);
    }
  }, [language]);

  const setLanguage = (newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
  };
  
  // FIX: Explicitly type `direction` as `Direction` to prevent type widening to `string`.
  const direction: Direction = useMemo(() => (rtlLanguages.includes(language) ? 'rtl' : 'ltr'), [language]);

  const value = { language, setLanguage, direction };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
