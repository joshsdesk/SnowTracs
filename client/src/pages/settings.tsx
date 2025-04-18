import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/settings.css';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔐 Clear JWT token from localStorage
    localStorage.removeItem('token');

    // 🔄 Redirect user to login screen
    navigate('/login');
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <h2 className="text-center">Settings</h2>

        <div className="settings-row">
          <label htmlFor="darkModeToggle">Dark Mode</label>
          <input type="checkbox" id="darkModeToggle" defaultChecked />
        </div>

        <div className="settings-row">
          <label htmlFor="offlineToggle">Offline Mode</label>
          <input type="checkbox" id="offlineToggle" />
        </div>

        <div className="settings-row">
          <label htmlFor="weatherUnit">Weather Units</label>
          <select id="weatherUnit">
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
          </select>
        </div>

        <div className="settings-row">
          <label htmlFor="notificationsToggle">Weather Alerts</label>
          <input type="checkbox" id="notificationsToggle" defaultChecked />
        </div>

        <button className="settings-logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
