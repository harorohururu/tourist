import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/PrivacyConsentModal.css';

const PrivacyConsentModal = ({ visible, onClose }) => {
  const styles = useSpring({
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
    opacity: visible ? 1 : 0,
    config: { tension: 280, friction: 35 },
  });

  if (!visible) return null;

  return (
    <div className="privacy-modal-overlay" onClick={onClose}>
      <animated.div
        className="privacy-modal-card"
        style={styles}
        onClick={e => e.stopPropagation()}
      >
        {/* Official Header */}
        <div className="privacy-modal-header">
          <div className="privacy-modal-header-content">
            <div className="privacy-modal-classification">OFFICIAL DOCUMENT</div>
            <div className="privacy-modal-title">Privacy Policy & Data Protection Notice</div>
            <div className="privacy-modal-subtitle">Tourism Information Collection System</div>
            <div className="privacy-modal-updated">Last Updated: July 27, 2025 | Document Version 2.1</div>
          </div>
          <button 
            className="privacy-modal-closeBtn" 
            onClick={onClose} 
            aria-label="Close Privacy Policy Modal"
            title="Close Document"
          >
            <span className="close-icon">✕</span>
          </button>
        </div>
        
        <div className="privacy-modal-divider" />
        
        {/* Content Body */}
        <div className="privacy-modal-content">
          {/* Executive Summary */}
          <div className="privacy-modal-section">
            <div className="privacy-modal-section-header">
              <span className="section-number">00</span>
              <span className="section-title">Executive Summary</span>
            </div>
            <div className="privacy-modal-text highlight-text">
              This document outlines the comprehensive data protection framework governing the collection, 
              processing, and storage of personal information within the Tourism Information Collection System, 
              in strict compliance with applicable privacy legislation and regulatory requirements.
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="privacy-modal-section">
            <div className="privacy-modal-section-header">
              <span className="section-number">01</span>
              <span className="section-title">Legal Compliance & Regulatory Framework</span>
            </div>
            <div className="privacy-modal-subsection">
              <div className="privacy-modal-subsection-title">Data Privacy Act Compliance</div>
              <div className="privacy-modal-text">
                Our organization operates in full compliance with the Philippine Data Privacy Act of 2012 
                (Republic Act No. 10173) and its implementing rules and regulations. This comprehensive 
                framework ensures the protection of all personal and sensitive personal information processed 
                through our systems.
              </div>
            </div>
            <div className="privacy-modal-subsection">
              <div className="privacy-modal-subsection-title">Regulatory Oversight</div>
              <div className="privacy-modal-text">
                All data processing activities are subject to oversight by the National Privacy Commission (NPC) 
                and are conducted in accordance with established data protection principles including lawfulness, 
                fairness, transparency, purpose limitation, data minimization, and accountability.
              </div>
            </div>
          </div>

          {/* Data Collection Practices */}
          <div className="privacy-modal-section">
            <div className="privacy-modal-section-header">
              <span className="section-number">02</span>
              <span className="section-title">Data Collection & Processing Practices</span>
            </div>
            <div className="privacy-modal-subsection">
              <div className="privacy-modal-subsection-title">Information Collected</div>
              <div className="privacy-modal-text">
                We collect only information that is necessary and directly relevant to the provision of tourism 
                services, including visitor demographics, nationality information, accommodation details, and 
                destination preferences. All collection is based on explicit consent and legitimate interest.
              </div>
            </div>
            <div className="privacy-modal-subsection">
              <div className="privacy-modal-subsection-title">Processing Purposes</div>
              <div className="privacy-modal-text">
                Personal information is processed exclusively for: (a) tourism statistical compilation, 
                (b) service delivery enhancement, (c) regulatory compliance reporting, and (d) public safety 
                and security measures as required by law.
              </div>
            </div>
          </div>

          {/* Security Measures */}
          <div className="privacy-modal-section">
            <div className="privacy-modal-section-header">
              <span className="section-number">03</span>
              <span className="section-title">Security Measures & Data Protection</span>
            </div>
            <div className="privacy-modal-subsection">
              <div className="privacy-modal-subsection-title">Technical Safeguards</div>
              <div className="privacy-modal-text">
                All personal data is protected through industry-standard encryption protocols (AES-256), 
                secure transmission channels (TLS 1.3), and multi-factor authentication systems. Access 
                controls are implemented on a need-to-know basis with comprehensive audit logging.
              </div>
            </div>
            <div className="privacy-modal-subsection">
              <div className="privacy-modal-subsection-title">Organizational Measures</div>
              <div className="privacy-modal-text">
                Our personnel undergo mandatory data privacy training and are bound by confidentiality 
                agreements. Regular security assessments, vulnerability testing, and compliance audits 
                are conducted to maintain the highest protection standards.
              </div>
            </div>
          </div>

          {/* Individual Rights */}
          <div className="privacy-modal-section">
            <div className="privacy-modal-section-header">
              <span className="section-number">04</span>
              <span className="section-title">Individual Rights & Data Subject Protections</span>
            </div>
            <div className="privacy-modal-subsection">
              <div className="privacy-modal-subsection-title">Fundamental Rights</div>
              <div className="privacy-modal-text">
                Data subjects are entitled to: (a) access their personal information, (b) request correction 
                of inaccurate data, (c) object to processing, (d) request data portability, (e) lodge complaints 
                with supervisory authorities, and (f) seek damages for violations of their privacy rights.
              </div>
            </div>
            <div className="privacy-modal-subsection">
              <div className="privacy-modal-subsection-title">Exercise of Rights</div>
              <div className="privacy-modal-text">
                Requests regarding data subject rights will be processed within the statutory timeframe 
                of fifteen (15) days. Identity verification may be required to prevent unauthorized disclosure 
                of personal information.
              </div>
            </div>
          </div>

          {/* Data Sharing & Disclosure */}
          <div className="privacy-modal-section">
            <div className="privacy-modal-section-header">
              <span className="section-number">05</span>
              <span className="section-title">Data Sharing & Third-Party Disclosure</span>
            </div>
            <div className="privacy-modal-text">
              Personal information is not sold, traded, or disclosed to third parties except: (a) with explicit 
              consent, (b) as required by law or court order, (c) for legitimate government functions, or 
              (d) to authorized service providers under strict confidentiality agreements and data processing 
              agreements.
            </div>
          </div>

          {/* Contact & Grievance */}
          <div className="privacy-modal-section">
            <div className="privacy-modal-section-header">
              <span className="section-number">06</span>
              <span className="section-title">Contact Information & Grievance Mechanism</span>
            </div>
            <div className="privacy-modal-contact-info">
              <div className="contact-item">
                <div className="contact-label">Data Protection Officer:</div>
                <div className="contact-value">dpo@sight-lipa.gov.ph</div>
              </div>
              <div className="contact-item">
                <div className="contact-label">Privacy Concerns Hotline:</div>
                <div className="contact-value">+63 (43) 756-PRIV (7748)</div>
              </div>
              <div className="contact-item">
                <div className="contact-label">Mailing Address:</div>
                <div className="contact-value">Tourism Data Privacy Office, City Hall, Lipa City, Batangas 4217</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="privacy-modal-footer">
            <div className="footer-seal">🏛️</div>
            <div className="footer-text">
              This document constitutes an official government publication and is subject to regular review 
              and updates to ensure continued compliance with evolving privacy legislation and best practices.
            </div>
            <div className="footer-reference">
              Reference: TIS-PP-2025-001 | Classification: Public Document
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default PrivacyConsentModal;