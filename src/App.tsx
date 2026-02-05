// src/App.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLanguageStore } from './stores/languageStore';
import { useNavigationStore } from './stores/navigationStore';
import SpaceScene from './components/SpaceScene';
import UI from './components/UI';
import './App.css';

const App: React.FC = () => {
  const { currentLanguage } = useLanguageStore();
  const { currentView } = useNavigationStore();

  return (
    <div className="app">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <SpaceScene />
        </Suspense>
      </Canvas>
      <UI />
    </div>
  );
};

export default App;