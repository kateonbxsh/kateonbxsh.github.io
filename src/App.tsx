// src/App.tsx
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import './App.css';
import SpaceScene from './components/SpaceScene';
import UI from './components/UI';

const App: React.FC = () => {

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