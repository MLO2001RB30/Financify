import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'dashboard'
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('financify_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setCurrentView('dashboard');
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('financify_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Cmd/Ctrl + K to open search (future feature)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        console.log('Search shortcut pressed - feature coming soon!');
      }
      

      
      // Escape to close modals
      if (event.key === 'Escape') {
        if (showAuthModal) {
          setShowAuthModal(false);
        }
      }
      
      // Cmd/Ctrl + L to focus on login (on landing page)
      if ((event.metaKey || event.ctrlKey) && event.key === 'l' && currentView === 'landing') {
        event.preventDefault();
        handleLoginClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentView, showAuthModal]);

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
    setShowAuthModal(false);
    
    // Save user data to localStorage for persistence
    localStorage.setItem('financify_user', JSON.stringify(userData));
    
    // Add welcome animation or notification here if needed
    console.log('Welcome to Financify!', userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    localStorage.removeItem('financify_user');
  };



  // Loading screen
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">📊 Financify</div>
          <div className="loading-spinner">⏳</div>
          <p>Loading your financial workspace...</p>
        </div>
      </div>
    );
  }

  // Render based on current view
  return (
    <div className="app">
      {currentView === 'landing' && (
        <LandingPage 
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
        />
      )}

      {currentView === 'dashboard' && user && (
        <Dashboard 
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onAuth={handleAuthSuccess}
      />

      {/* Global Notifications (if needed) */}
      {/* <NotificationCenter /> */}
    </div>
  );
}

export default App; 