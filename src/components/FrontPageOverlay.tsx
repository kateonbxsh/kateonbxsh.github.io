// src/components/FrontPageOverlay.tsx
import React, { useEffect, useState } from 'react';
import { useLanguageStore } from '../stores/languageStore';
import '../styles/FrontPageOverlay.css';

const FrontPageOverlay: React.FC = () => {
  const { t } = useLanguageStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`front-page-overlay ${visible ? 'visible' : ''}`}>
      <h1 className="portfolio-title">{t('frontPage.subtitle')}</h1>
    </div>
  );
};

export default FrontPageOverlay;