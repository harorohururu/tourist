import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TouristFormScreen from './components/TouristFormScreen.jsx';
import './styles/TouristFormScreen.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TouristFormScreen />
  </StrictMode>
);
