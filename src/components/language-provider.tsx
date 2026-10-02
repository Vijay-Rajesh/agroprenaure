'use client';

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

export type SiteLanguage = 'en' | 'ur';

type LanguageContextValue = {
  language: SiteLanguage;
  isUrdu: boolean;
  setLanguage: (language: SiteLanguage) => void;
  toggleLanguage: () => void;
};

const storageKey = 'agropreneurs-language';
const languageChangedEvent = 'agropreneurs-language-change';
const LanguageContext = createContext<LanguageContextValue | null>(null);

function subscribeToLanguage(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(languageChangedEvent, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(languageChangedEvent, onChange);
  };
}

function getLanguageSnapshot(): SiteLanguage {
  return localStorage.getItem(storageKey) === 'ur' ? 'ur' : 'en';
}

function getServerLanguageSnapshot(): SiteLanguage {
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribeToLanguage, getLanguageSnapshot, getServerLanguageSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  }, [language]);

  function setSiteLanguage(nextLanguage: SiteLanguage) {
    localStorage.setItem(storageKey, nextLanguage);
    window.dispatchEvent(new Event(languageChangedEvent));
  }

  const value: LanguageContextValue = {
    language,
    isUrdu: language === 'ur',
    setLanguage: setSiteLanguage,
    toggleLanguage: () => setSiteLanguage(language === 'ur' ? 'en' : 'ur'),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage() {
  const language = useContext(LanguageContext);
  if (!language) throw new Error('useSiteLanguage must be used inside LanguageProvider.');
  return language;
}