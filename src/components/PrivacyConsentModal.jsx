import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/PrivacyConsentModal.css';

const PrivacyConsentModal = ({ visible, onClose }) => {
  const styles = useSpring({
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
    opacity: visible ? 1 : 0,
    config: { tension: 300, friction: 30 },
  });

  if (!visible) return null;

  return (
    <div className="privacy-modal-overlay" onClick={onClose}>
      <animated.div
        className="privacy-modal-card"
        style={styles}
        onClick={e => e.stopPropagation()}
      >
        <div className="privacy-modal-header">
          <div>
            <div className="privacy-modal-agreement">AGREEMENT</div>
            <div className="privacy-modal-title">Privacy Policy</div>
            <div className="privacy-modal-updated">Last updated: July 18, 2025</div>
          </div>
          <button className="privacy-modal-closeBtn" onClick={onClose} aria-label="Close Privacy Policy Modal">
            ×
          </button>
        </div>
        <div className="privacy-modal-divider" />
        <div className="privacy-modal-content">
          <div className="privacy-modal-clauseTitle">Data Privacy Act Compliance</div>
          <div className="privacy-modal-text">
            As developers, we strictly comply with the Philippine Data Privacy Act of 2012 (RA 10173). This law protects your right to privacy and ensures that all personal information collected, processed, and stored by SIGHT-Lipa is handled lawfully, transparently, and securely.
          </div>
          <div className="privacy-modal-text">
            We only process data with your consent and for legitimate purposes. Our team implements technical, organizational, and physical safeguards to prevent unauthorized access, alteration, or disclosure of your information. You have the right to access, correct, or request deletion of your data at any time. We are committed to regular security reviews and prompt response to any privacy concerns or incidents.
          </div>
          <div className="privacy-modal-text">
            We ensure that all personal and sensitive information such as login credentials, contact details, and landmark data is handled with the highest level of confidentiality and security. For more information, visit privacy.gov.ph or contact our support team.
          </div>
          <div className="privacy-modal-clauseTitle">1. Data Collection and Usage</div>
          <div className="privacy-modal-text">We collect only the necessary information required for user authentication, landmark management, and service improvement.</div>
          <div className="privacy-modal-text">Login credentials are securely stored using industry-standard encryption and are never shared with third parties.</div>
          <div className="privacy-modal-text">Any data gathered, such as landmark details, contact information, and user activity, is used solely for the purpose of providing and enhancing our services.</div>
          <div className="privacy-modal-clauseTitle">2. Data Protection</div>
          <div className="privacy-modal-text">All personal and sensitive data is encrypted both in transit and at rest.</div>
          <div className="privacy-modal-text">Access to user data is strictly limited to authorized personnel and is protected by robust authentication mechanisms.</div>
          <div className="privacy-modal-text">Regular security audits are conducted to ensure the integrity and safety of our systems.</div>
          <div className="privacy-modal-clauseTitle">3. User Rights</div>
          <div className="privacy-modal-text">Users have the right to access, update, or request deletion of their personal information at any time.</div>
          <div className="privacy-modal-text">We do not sell, trade, or disclose user data to external parties without explicit consent, except as required by law.</div>
          <div className="privacy-modal-clauseTitle">4. Commitment to Privacy</div>
          <div className="privacy-modal-text">The development team is dedicated to maintaining the highest standards of data privacy and security.</div>
          <div className="privacy-modal-text">We continuously monitor and update our security practices to address emerging threats</div>
          <div className="privacy-modal-clauseTitle">5. Contact Information</div>
          <div className="privacy-modal-text">For any questions or concerns regarding data privacy, users may contact our support team at support@sight-lipa.com.</div>
        </div>
      </animated.div>
    </div>
  );
};

export default PrivacyConsentModal;
