// src/components/UI.tsx
import React from 'react';
import LanguageSwitch from './LanguageSwitch';
import FrontPageOverlay from './FrontPageOverlay';
import StarDetails from './StarDetails';
import BackButton from './BackButton';
import { useNavigationStore } from '../stores/navigationStore';

const UI: React.FC = () => {
  const { currentView } = useNavigationStore();

  return (
    <div className="ui-container">
      <LanguageSwitch />
      {currentView === 'home' && <FrontPageOverlay />}
      {currentView === 'star' && (
        <>
          <StarDetails />
          <BackButton />
        </>
      )}
    </div>
  );
};

export default UI;