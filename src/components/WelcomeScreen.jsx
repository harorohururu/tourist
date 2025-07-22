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

  if (!show && !fade.opacity.get()) return null;

  return (
    <animated.div className="welcome-screen" style={fade}>
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to <span>SIGHT-Lipa</span></h1>
        <h2 className="welcome-subtitle">Tourist Form</h2>
      </div>
    </animated.div>
  );
};

export default WelcomeScreen;
