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
          {/* Form Header */}
          <div className="formHeader">
            <div className="headerContent">
              <h1 className="formTitle">Tourist Information Form</h1>
              <p className="formSubtitle">Official Tourism Data Collection System</p>
              <div className="headerDivider"></div>
            </div>
          </div>

          <form className="formContainer" onSubmit={async e => {
            e.preventDefault();
            setSubmitAttempted(true);
            // Validation
            const newErrors = {};
            if (!formData.allocation) newErrors.allocation = 'Visitor classification is required.';
            if (showForeignFields) {
              if (formData.nationalities.some(n => !n)) newErrors.nationalities = 'All nationality fields must be completed.';
            }
            if (!formData.num_male) newErrors.num_male = 'Male visitor count is required.';
            if (!formData.num_female) newErrors.num_female = 'Female visitor count is required.';
            if (showForeignFields) {
              if (!formData.num_foreign_male) newErrors.num_foreign_male = 'Foreign male visitor count is required.';
              if (!formData.num_foreign_female) newErrors.num_foreign_female = 'Foreign female visitor count is required.';
            }
            if (!formData.visited_landmark) newErrors.visited_landmark = 'Destination landmark is required.';
            if (showStayDuration && !formData.stay_duration) newErrors.stay_duration = 'Accommodation duration is required.';
            if (!consentChecked) newErrors.consent = 'Privacy policy consent is mandatory.';
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;
            
            // Prepare allocation: only selected type, others null
            const allocation = formData.allocation || null;
            // Prepare nationality: join all non-empty values
            const nationality = formData.nationalities.filter(n => n).join(',') || 'None';
            // Prepare tourist counts: null if empty
            const num_male = formData.num_male !== '' && formData.num_male !== null ? parseInt(formData.num_male) : 0;
            const num_female = formData.num_female !== '' && formData.num_female !== null ? parseInt(formData.num_female) : 0;
            const num_foreign_male = formData.num_foreign_male !== '' && formData.num_foreign_male !== null ? parseInt(formData.num_foreign_male) : 0;
            const num_foreign_female = formData.num_foreign_female !== '' && formData.num_foreign_female !== null ? parseInt(formData.num_foreign_female) : 0;
            // Prepare stay_duration
            const stay_duration = formData.stay_duration !== '' && formData.stay_duration !== null ? parseInt(formData.stay_duration) : 0;
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
              alert('Error processing tourist information submission.');
            }
          }}>
            {/* Section 1: Visitor Classification */}
            <div className="formSection">
              <h2 className="sectionTitle">
                <span className="sectionNumber">01</span>
                Visitor Classification
              </h2>
              <div className="sectionDivider"></div>
              
              <div className="fieldGroup">
                <label className="fieldLabel required">
                  Allocation Type
                </label>
                <div className="fieldDescription">
                  Please select the appropriate visitor classification category for accurate data collection.
                </div>
                <div className="inputWrapper">
                  <select
                    className={`formSelect ${submitAttempted && errors.allocation && !formData.allocation ? 'inputError' : ''}`}
                    value={formData.allocation}
                    onChange={e => setFormData({ ...formData, allocation: e.target.value })}
                  >
                    <option value="">-- Select Classification Type --</option>
                    {allocationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {submitAttempted && errors.allocation && !formData.allocation && 
                    <div className="errorText">{errors.allocation}</div>}
                </div>
              </div>
            </div>

            {/* Section 2: Nationality Information */}
            {showForeignFields && (
              <div className="formSection">
                <h2 className="sectionTitle">
                  <span className="sectionNumber">02</span>
                  Nationality Information
                </h2>
                <div className="sectionDivider"></div>
                
                <div className="fieldGroup">
                  <label className="fieldLabel required">
                    Visitor Nationality
                  </label>
                  <div className="fieldDescription">
                    Specify the nationality of all foreign visitors for statistical purposes.
                  </div>
                  {formData.nationalities.map((nat, idx) => (
                    <div key={idx} className="nationalityRow">
                      <div className="inputWrapper nationalityInput">
                        <select
                          className={`formSelect ${submitAttempted && errors.nationalities && !nat ? 'inputError' : ''}`}
                          value={nat}
                          onChange={e => {
                            const newNats = [...formData.nationalities];
                            newNats[idx] = e.target.value;
                            setFormData({ ...formData, nationalities: newNats });
                          }}
                        >
                          <option value="">-- Select Nationality --</option>
                          {nationalities.map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        {submitAttempted && errors.nationalities && !nat && 
                          <div className="errorText">{errors.nationalities}</div>}
                      </div>
                      {formData.nationalities.length > 1 && (
                        <button
                          type="button"
                          className="removeButton"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              nationalities: formData.nationalities.filter((_, i) => i !== idx)
                            });
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="addButton"
                    onClick={() => setFormData({ ...formData, nationalities: [...formData.nationalities, ''] })}
                  >
                    + Add Additional Nationality
                  </button>
                </div>
              </div>
            )}

            {/* Section 3: Visitor Demographics */}
            <div className="formSection">
              <h2 className="sectionTitle">
                <span className="sectionNumber">{showForeignFields ? '03' : '02'}</span>
                Visitor Demographics
              </h2>
              <div className="sectionDivider"></div>
              
              <div className="fieldGroup">
                <label className="fieldLabel required">
                  Local Visitor Count
                </label>
                <div className="fieldDescription">
                  Enter the total number of male and female local visitors in your group.
                </div>
                <div className="countRow">
                  <div className="inputWrapper">
                    <input
                      type="number"
                      className={`formInput ${submitAttempted && errors.num_male && !formData.num_male ? 'inputError' : ''}`}
                      placeholder="Male Count"
                      min="0"
                      value={formData.num_male}
                      onChange={e => setFormData({ ...formData, num_male: e.target.value })}
                    />
                    {submitAttempted && errors.num_male && !formData.num_male && 
                      <div className="errorText">{errors.num_male}</div>}
                  </div>
                  <div className="inputWrapper">
                    <input
                      type="number"
                      className={`formInput ${submitAttempted && errors.num_female && !formData.num_female ? 'inputError' : ''}`}
                      placeholder="Female Count"
                      min="0"
                      value={formData.num_female}
                      onChange={e => setFormData({ ...formData, num_female: e.target.value })}
                    />
                    {submitAttempted && errors.num_female && !formData.num_female && 
                      <div className="errorText">{errors.num_female}</div>}
                  </div>
                </div>
              </div>

              {showForeignFields && (
                <div className="fieldGroup">
                  <label className="fieldLabel required">
                    Foreign Visitor Count
                  </label>
                  <div className="fieldDescription">
                    Enter the total number of male and female foreign visitors in your group.
                  </div>
                  <div className="countRow">
                    <div className="inputWrapper">
                      <input
                        type="number"
                        className={`formInput ${submitAttempted && errors.num_foreign_male && !formData.num_foreign_male ? 'inputError' : ''}`}
                        placeholder="Foreign Male Count"
                        min="0"
                        value={formData.num_foreign_male}
                        onChange={e => setFormData({ ...formData, num_foreign_male: e.target.value })}
                      />
                      {submitAttempted && errors.num_foreign_male && !formData.num_foreign_male && 
                        <div className="errorText">{errors.num_foreign_male}</div>}
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="number"
                        className={`formInput ${submitAttempted && errors.num_foreign_female && !formData.num_foreign_female ? 'inputError' : ''}`}
                        placeholder="Foreign Female Count"
                        min="0"
                        value={formData.num_foreign_female}
                        onChange={e => setFormData({ ...formData, num_foreign_female: e.target.value })}
                      />
                      {submitAttempted && errors.num_foreign_female && !formData.num_foreign_female && 
                        <div className="errorText">{errors.num_foreign_female}</div>}
                    </div>
                  </div>
                </div>
              )}

              <div className="totalCount">
                <div className="countLabel">Total Registered Visitors</div>
                <div className="countValue">
                  {[
                    formData.num_male,
                    formData.num_female,
                    formData.num_foreign_male,
                    formData.num_foreign_female,
                  ].map(n => (n === null || n === '' || isNaN(parseInt(n))) ? 0 : parseInt(n)).reduce((a, b) => a + b, 0)}
                </div>
              </div>
            </div>

            {/* Section 4: Destination Information */}
            <div className="formSection">
              <h2 className="sectionTitle">
                <span className="sectionNumber">{showForeignFields ? '04' : '03'}</span>
                Destination Information
              </h2>
              <div className="sectionDivider"></div>
              
              <div className="fieldGroup">
                <label className="fieldLabel required">
                  Current Landmark/Destination
                </label>
                <div className="fieldDescription">
                  Select the primary landmark or establishment you are currently visiting.
                </div>
                <div className="inputWrapper">
                  <select
                    className={`formSelect ${submitAttempted && errors.visited_landmark && !formData.visited_landmark ? 'inputError' : ''}`}
                    value={formData.visited_landmark}
                    onChange={e => setFormData({ ...formData, visited_landmark: e.target.value })}
                  >
                    <option value="">-- Select Destination --</option>
                    {landmarks.map(lm => (
                      <option key={lm.info_id} value={lm.info_id}>
                        {lm.name} ({lm.type_name})
                      </option>
                    ))}
                  </select>
                  {submitAttempted && errors.visited_landmark && !formData.visited_landmark && 
                    <div className="errorText">{errors.visited_landmark}</div>}
                </div>
              </div>

              {showStayDuration && (
                <div className="fieldGroup">
                  <label className="fieldLabel required">
                    Accommodation Duration
                  </label>
                  <div className="fieldDescription">
                    Specify the total number of days you will be staying at this accommodation.
                  </div>
                  <div className="inputWrapper">
                    <input
                      type="number"
                      className={`formInput ${submitAttempted && errors.stay_duration && !formData.stay_duration ? 'inputError' : ''}`}
                      placeholder="Number of Days"
                      min="1"
                      value={formData.stay_duration}
                      onChange={e => setFormData({ ...formData, stay_duration: e.target.value })}
                    />
                    {submitAttempted && errors.stay_duration && !formData.stay_duration && 
                      <div className="errorText">{errors.stay_duration}</div>}
                  </div>
                </div>
              )}
            </div>

            {/* Privacy Consent Section */}
            <div className="consentSection">
              <h3 className="consentTitle">Data Privacy & Consent</h3>
              <div className="consentBox">
                <div className="consentRow">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={() => setConsentChecked(!consentChecked)}
                    id="consentCheckbox"
                    className="consentCheckbox"
                  />
                  <label htmlFor="consentCheckbox" className="consentLabel">
                    I hereby acknowledge that I have read, understood, and agree to the{' '}
                    <span className="privacyLink" onClick={() => setPrivacyVisible(true)}>
                      Privacy Policy and Terms of Data Collection
                    </span>
                    . I consent to the collection, processing, and storage of the information provided 
                    in this form for official tourism statistics and regulatory compliance purposes.
                  </label>
                </div>
                {submitAttempted && errors.consent && !consentChecked && 
                  <div className="errorText consentError">{errors.consent}</div>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="submitSection">
              <button
                type="submit"
                className="submitButton"
                disabled={!consentChecked}
              >
                Submit Tourist Information
              </button>
              <div className="submitNote">
                By submitting this form, you confirm that all information provided is accurate and complete.
              </div>
            </div>
          </form>
          
          <PrivacyConsentModal visible={privacyVisible} onClose={() => setPrivacyVisible(false)} />
        </div>
      )}
      <ThankYouScreen show={showThankYou} />
    </>
  );
};

export default TouristFormScreen;