import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
import { nationalities } from '../data/nationalities';

import PrivacyConsentModal from './PrivacyConsentModal';
import WelcomeScreen from './WelcomeScreen';
import ThankYouScreen from './ThankYouScreen';
import '../styles/TouristFormScreen.css';

const allocationTypes = [
  'Lipa Residency',
  'Lipa Residency with Foreign',
  'Other Province',
  'Other Province with Foreign',
  'Foreign Residency',
];

const TouristFormScreen = () => {
  const [formData, setFormData] = useState({
    allocation: '',
    nationalities: [''],
    num_male: '',
    num_female: '',
    num_foreign_male: '',
    num_foreign_female: '',
    visited_landmark: '',
    stay_duration: '',
    landmark_type: '',
  });
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [landmarks, setLandmarks] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/landmarks_dropdown`)
      .then(res => res.json())
      .then(data => {
        setLandmarks(data);
      })
      .catch(() => setLandmarks([]));
  }, []);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        setTimeout(() => setShowForm(true), 800); // match fade duration
      }, 1800); // show welcome for 1.8s
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Logic for showing nationality and foreign visitor fields
  const showForeignFields = [
    'Lipa Residency with Foreign',
    'Other Province with Foreign',
    'Foreign Residency',
  ].includes(formData.allocation);

  // Logic for showing stay duration if landmark type is Hotel or Resort
  const selectedLandmark = landmarks.find(lm => lm.info_id == formData.visited_landmark);
  const showStayDuration = selectedLandmark && (selectedLandmark.type_name === 'Hotel' || selectedLandmark.type_name === 'Resort');

  return (
    <>
      <WelcomeScreen show={showWelcome} onFadeOut={() => setShowForm(true)} />
      {showForm && !showThankYou && (
        <div className="keyboardAvoiding">
          <form className="formContainer" onSubmit={async e => {
            e.preventDefault();
            setSubmitAttempted(true);
            // Validation
            const newErrors = {};
            if (!formData.allocation) newErrors.allocation = 'Allocation type is required.';
            if (showForeignFields) {
              if (formData.nationalities.some(n => !n)) newErrors.nationalities = 'All nationality fields are required.';
            }
            if (!formData.num_male) newErrors.num_male = 'Male count is required.';
            if (!formData.num_female) newErrors.num_female = 'Female count is required.';
            if (showForeignFields) {
              if (!formData.num_foreign_male) newErrors.num_foreign_male = 'Foreign male count is required.';
              if (!formData.num_foreign_female) newErrors.num_foreign_female = 'Foreign female count is required.';
            }
            if (!formData.visited_landmark) newErrors.visited_landmark = 'Landmark is required.';
            if (showStayDuration && !formData.stay_duration) newErrors.stay_duration = 'Stay duration is required.';
            if (!consentChecked) newErrors.consent = 'You must agree to the privacy policy.';
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;
            // Prepare allocation: only selected type, others null
            const allocation = formData.allocation || null;
            // Prepare nationality: join all non-empty values
            const nationality = formData.nationalities.filter(n => n).join(',') || null;
            // Prepare tourist counts: null if empty
            const num_male = formData.num_male !== '' ? parseInt(formData.num_male) : null;
            const num_female = formData.num_female !== '' ? parseInt(formData.num_female) : null;
            const num_foreign_male = formData.num_foreign_male !== '' ? parseInt(formData.num_foreign_male) : null;
            const num_foreign_female = formData.num_foreign_female !== '' ? parseInt(formData.num_foreign_female) : null;
            // Prepare stay_duration
            const stay_duration = formData.stay_duration !== '' ? parseInt(formData.stay_duration) : null;
            // Prepare landmark_info
            const landmark_info = formData.visited_landmark || null;
            // Prepare form_date
            const form_date = new Date().toISOString();

            // Send to backend
            const res = await fetch(`${API_BASE_URL}/api/tourist`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                allocation,
                nationality,
                stay_duration,
                landmark_info,
                form_date,
                num_male,
                num_female,
                num_foreign_male,
                num_foreign_female
              })
            });
            if (res.ok) {
              setShowThankYou(true);
            } else {
              alert('Error saving tourist info.');
            }
          }}>
            <h2 className="sectionTitle">Tourist Form</h2>
            <label className="label">Allocation Type</label>
            <div className="helperText">Select the type of residency or visitor allocation for this tourist.</div>
            <div className="inputWrapper">
              <select
                className="picker"
                value={formData.allocation}
                onChange={e => setFormData({ ...formData, allocation: e.target.value })}
              >
                <option value="">Select type...</option>
                {allocationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {submitAttempted && errors.allocation && !formData.allocation && <div className="errorText">{errors.allocation}</div>}
            </div>
            {showForeignFields && (
              <>
                <label className="label">Nationality</label>
                {formData.nationalities.map((nat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div className="inputWrapper" style={{ flex: 1 }}>
                      <select
                        className="picker"
                        value={nat}
                        onChange={e => {
                          const newNats = [...formData.nationalities];
                          newNats[idx] = e.target.value;
                          setFormData({ ...formData, nationalities: newNats });
                        }}
                      >
                        <option value="">Select nationality...</option>
                        {nationalities.map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      {submitAttempted && errors.nationalities && !nat && <div className="errorText">{errors.nationalities}</div>}
                    </div>
                    {formData.nationalities.length > 1 && (
                      <button
                        type="button"
                        style={{ padding: '4px 10px', fontSize: 13, borderRadius: 6, background: '#eee', border: 'none', cursor: 'pointer' }}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            nationalities: formData.nationalities.filter((_, i) => i !== idx)
                          });
                        }}
                      >Remove</button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="saveButton"
                  style={{ marginBottom: 12, maxWidth: 180, fontSize: 14, padding: '8px 0' }}
                  onClick={() => setFormData({ ...formData, nationalities: [...formData.nationalities, ''] })}
                >
                  Add Nationality
                </button>
              </>
            )}
            <label className="label">Visitor Count</label>
            <div className="helperText">Enter the number of male and female visitors. For foreign visitors, fill in the respective fields.</div>
            <div className="inputWrapper">
              <input
                type="number"
                className="input"
                placeholder="Male"
                min="0"
                value={formData.num_male}
                onChange={e => setFormData({ ...formData, num_male: e.target.value })}
              />
              {submitAttempted && errors.num_male && !formData.num_male && <div className="errorText">{errors.num_male}</div>}
            </div>
            <div className="inputWrapper">
              <input
                type="number"
                className="input"
                placeholder="Female"
                min="0"
                value={formData.num_female}
                onChange={e => setFormData({ ...formData, num_female: e.target.value })}
              />
              {submitAttempted && errors.num_female && !formData.num_female && <div className="errorText">{errors.num_female}</div>}
            </div>
            {showForeignFields && (
              <>
                <div className="inputWrapper">
                  <input
                    type="number"
                    className="input"
                    placeholder="Foreign Male"
                    min="0"
                    value={formData.num_foreign_male}
                    onChange={e => setFormData({ ...formData, num_foreign_male: e.target.value })}
                  />
                  {submitAttempted && errors.num_foreign_male && !formData.num_foreign_male && <div className="errorText">{errors.num_foreign_male}</div>}
                </div>
                <div className="inputWrapper">
                  <input
                    type="number"
                    className="input"
                    placeholder="Foreign Female"
                    min="0"
                    value={formData.num_foreign_female}
                    onChange={e => setFormData({ ...formData, num_foreign_female: e.target.value })}
                  />
                  {submitAttempted && errors.num_foreign_female && !formData.num_foreign_female && <div className="errorText">{errors.num_foreign_female}</div>}
                </div>
              </>
            )}
            <div className="touristCount">
              <span>Tourist Count: </span>
              <span>{[
                formData.num_male,
                formData.num_female,
                formData.num_foreign_male,
                formData.num_foreign_female,
              ].map(n => parseInt(n) || 0).reduce((a, b) => a + b, 0)}</span>
            </div>
            <label className="label">Current Landmark</label>
            <div className="helperText">Select the landmark currently being visited by the tourist.</div>
            <div className="inputWrapper">
              <select
                className="picker"
                value={formData.visited_landmark}
                onChange={e => setFormData({ ...formData, visited_landmark: e.target.value })}
              >
                <option value="">Select landmark...</option>
                {landmarks.map(lm => (
                  <option key={lm.info_id} value={lm.info_id}>
                    {lm.name} ({lm.type_name})
                  </option>
                ))}
              </select>
              {submitAttempted && errors.visited_landmark && !formData.visited_landmark && <div className="errorText">{errors.visited_landmark}</div>}
            </div>
            {showStayDuration && (
              <>
                <label className="label">Stay Duration</label>
                <div className="inputWrapper">
                  <input
                    type="number"
                    className="input"
                    placeholder="Number of Days"
                    min="1"
                    value={formData.stay_duration}
                    onChange={e => setFormData({ ...formData, stay_duration: e.target.value })}
                  />
                  {submitAttempted && errors.stay_duration && !formData.stay_duration && <div className="errorText">{errors.stay_duration}</div>}
                </div>
              </>
            )}
            <div className="consentRow">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={() => setConsentChecked(!consentChecked)}
                id="consentCheckbox"
              />
              <label htmlFor="consentCheckbox" className="consentLabel">
                I have read and agree to the{' '}
                <span className="privacyLink" onClick={() => setPrivacyVisible(true)}>
                  Privacy Policy
                </span>
                {' '}and consent to the collection and processing of my data.
              </label>
            </div>
            {submitAttempted && errors.consent && !consentChecked && <div className="errorText">{errors.consent}</div>}
            <button
              type="submit"
              className="saveButton"
              disabled={!consentChecked}
            >
              Submit
            </button>
          </form>
          <PrivacyConsentModal visible={privacyVisible} onClose={() => setPrivacyVisible(false)} />
        </div>
      )}
      <ThankYouScreen show={showThankYou} />
    </>
  );
};

export default TouristFormScreen;
