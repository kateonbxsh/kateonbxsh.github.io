// src/stores/languageStore.ts
import { create } from 'zustand';
import { translations } from '../data/translations';

export type Language = 'en' | 'fr';

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  currentLanguage: 'en',
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