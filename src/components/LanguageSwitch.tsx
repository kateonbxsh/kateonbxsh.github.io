// src/components/LanguageSwitch.tsx
import React from 'react';
import { useLanguageStore } from '../stores/languageStore';
import '../styles/LanguageSwitch.css';

const LanguageSwitch: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguageStore();

  return (
    <div className="language-switch">
      <button
        className={currentLanguage === 'en' ? 'active' : ''}
        onClick={() => setLanguage('en')}
      >
        {t('languageSwitch.english')}
      </button>
      <button
        className={currentLanguage === 'fr' ? 'active' : ''}
        onClick={() => setLanguage('fr')}
      >
        {t('languageSwitch.french')}
      </button>
    </div>
  );
};

export default LanguageSwitch;