import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background-color var(--transition-base), color var(--transition-base)' }}>
      <Navbar />
      <main className="app-main" style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <AppRoutes />
      </main>
      {isLandingPage && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
