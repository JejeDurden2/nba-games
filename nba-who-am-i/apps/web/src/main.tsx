import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { UniverseProvider } from './contexts/UniverseContext';
import { UniverseTheme } from './components/ui/UniverseTheme';
import { detectUniverse } from './lib/universe';
import './index.css';

/**
 * Universe-aware routing wrapper
 * Handles /:universe routes and provides universe context
 */
function UniverseRoutes() {
  return (
    <Routes>
      {/* Root path - redirect to detected universe */}
      <Route
        path="/"
        element={<Navigate to={`/${detectUniverse()}`} replace />}
      />

      {/* Universe-specific routes */}
      <Route
        path="/:universe/*"
        element={
          <UniverseProvider>
            <UniverseTheme>
              <App />
            </UniverseTheme>
          </UniverseProvider>
        }
      />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UniverseRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
