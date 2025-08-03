import React from 'react';
import '../styles/ThankYouScreen.css';

const ThankYouScreen = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className={`thankyou-screen ${show ? 'show' : ''}`}>
      <div className="thankyou-background">
        <div className="thankyou-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="thankyou-content">
        <div className="thankyou-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#850000" strokeWidth="2" fill="none"/>
            <path d="m9 12 2 2 4-4" stroke="#850000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="thankyou-title">Thank You!</h1>
        <h2 className="thankyou-subtitle">Your response has been recorded successfully.</h2>
        
        <div className="thankyou-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dot"></div>
          <div className="decoration-line"></div>
        </div>
      </div>
    </div>
  );
};
export default ThankYouScreen;