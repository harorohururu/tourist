import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/ThankYouScreen.css';

const ThankYouScreen = ({ show }) => {
  const fade = useSpring({
    opacity: show ? 1 : 0,
    config: { duration: 700 }
  });
  if (!show && !fade.opacity.get()) return null;
  return (
    <animated.div className="thankyou-screen" style={fade}>
      <div className="thankyou-content">
        <h1 className="thankyou-title">Thank You!</h1>
        <h2 className="thankyou-subtitle">Your response has been recorded.</h2>
      </div>
    </animated.div>
  );
};

export default ThankYouScreen;
