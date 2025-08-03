import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/WelcomeScreen.css';

const WelcomeScreen = ({ show, onFadeOut }) => {
  const fade = useSpring({
    opacity: show ? 1 : 0,
    config: { duration: 800 },
    onRest: () => {
      if (!show && onFadeOut) onFadeOut();
    }
  });

  const slideUp = useSpring({
    transform: show ? 'translateY(0px)' : 'translateY(30px)',
    opacity: show ? 1 : 0,
    config: { tension: 280, friction: 60 },
    delay: show ? 200 : 0
  });

  const logoAnimation = useSpring({
    transform: show ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-5deg)',
    opacity: show ? 1 : 0,
    config: { tension: 200, friction: 20 },
    delay: show ? 400 : 0
  });

  if (!show && !fade.opacity.get()) return null;

  return (
    <animated.div className="welcome-screen" style={fade}>
      <div className="welcome-background">
        <div className="background-pattern"></div>
        <div className="background-overlay"></div>
      </div>
      
      <div className="welcome-content">
        {/* Official Header */}
        <animated.div className="welcome-header" style={slideUp}>
          <div className="official-seal">🏛️</div>
          <div className="department-title">REPUBLIC OF THE PHILIPPINES</div>
          <div className="office-title">CITY GOVERNMENT OF LIPA</div>
          <div className="division-title">TOURISM INFORMATION DIVISION</div>
        </animated.div>

        {/* Main Logo Section */}
        <animated.div className="welcome-logo-section" style={logoAnimation}>
          <div className="system-logo">
            <div className="logo-circle">
              <div className="logo-inner">
                <span className="logo-icon">📊</span>
              </div>
            </div>
          </div>
          
          <h1 className="welcome-title">
            Welcome to{' '}
            <span className="system-name">
              SIGHT-<span className="lipa-red">Lipa</span>
            </span>
          </h1>
          
          <div className="system-full-name">
            Systematic Information Gathering for Heritage Tourism - Lipa
          </div>
        </animated.div>

        {/* Form Section */}
        <animated.div className="welcome-form-section" style={slideUp}>
          <div className="form-type-badge">OFFICIAL FORM</div>
          <h2 className="welcome-subtitle">Tourist Information Collection System</h2>
          <div className="form-description">
            Please prepare to provide accurate information for statistical compilation
            and tourism planning purposes in accordance with local government requirements.
          </div>
        </animated.div>

        {/* Footer */}
        <animated.div className="welcome-footer" style={slideUp}>
          <div className="loading-indicator">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="loading-text">Initializing Form...</div>
          </div>
          <div className="version-info">Version 2.1 | Document ID: TIS-FORM-2025</div>
        </animated.div>
      </div>
    </animated.div>
  );
};

export default WelcomeScreen;