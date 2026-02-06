// src/App.tsx
import React from 'react';
import './App.css';
import CanvasWrapper from './components/CanvasWrapper';
import Loading from './components/Loading';
import UI from './components/UI';

const App: React.FC = () => {

  return (
    <div className="app">
      <CanvasWrapper/>
      <Loading />
      <UI />
    </div>
  );
};

export default App;