// src/stores/languageStore.ts
import { create } from 'zustand';
import { translations } from '../data/translations';

export type Language = 'en' | 'fr';

const detectLocaleLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'en';

  const locale = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase();
  return locale.startsWith('fr') ? 'fr' : 'en';
};

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  currentLanguage: detectLocaleLanguage(),
  setLanguage: (lang: Language) => set({ currentLanguage: lang }),
  t: (key: string) => {
    const lang = get().currentLanguage;
    const keys = key.split('.');
    let value: any = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  },
}));
