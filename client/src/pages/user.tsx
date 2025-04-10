import React, { useState } from 'react';
import '../styles/user.css';  // Assuming this is where your styles are handled
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Import FontAwesome social icons

const Profile = () => {
  const [activeRun, setActiveRun] = useState<number | null>(null); // State for active run

  const handleRunClick = (runId: number) => {
    setActiveRun(runId); // Open modal with specific run details
  };

  return (
    <div className="profile-page">
      <div className="top-row">
        {/* Left Column: Profile Image and Info */}
        <div className="left-column">
          <div className="profile-header">
            <img src="user-avatar.jpg" alt="User Avatar" className="profile-avatar" />
            <h2>Anne Hathaway</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vel egestas tempus.</p>
          </div>
        </div>

        {/* Right Column: Map and Other Info */}
        <div className="right-column">
          <div className="map-section">
            <img src="map-placeholder.png" alt="Map" />
          </div>

          {/* Weather and Stats Section */}
          <div className="info-section">
            <div className="weather-info">
              <h3>Today's Weather</h3>
              <p>Temperature: -5°C</p>
              <p>Snowfall: 10 cm</p>
              <p>Wind Speed: 20 km/h</p>
            </div>

            <div className="stats-info">
              <h3>Today's Stats</h3>
              <p>Total Distance: 10 km</p>
              <p>Max Speed: 50 km/h</p>
              <p>Total Elevation: 1200 m</p>
            </div>
          </div>

          {/* List of Runs */}
          <div className="runs-list">
            <h3>Other Runs</h3>
            <div className="run-summary" onClick={() => handleRunClick(1)}>
              <p>Run 1: 3 km | 45 km/h | 500 m elevation</p>
            </div>
            <div className="run-summary" onClick={() => handleRunClick(2)}>
              <p>Run 2: 4 km | 55 km/h | 600 m elevation</p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="social-media-share">
            <FontAwesomeIcon icon={faFacebook} size="2x" color="#1877f2" />
            <FontAwesomeIcon icon={faInstagram} size="2x" color="#E4405F" />
            <FontAwesomeIcon icon={faTwitter} size="2x" color="#1DA1F2" />
          </div>
        </div>
      </div>

      {/* Modal for Run Details */}
      {activeRun && (
        <div className="run-details-modal">
          <h3>Run {activeRun} Details</h3>
          <p>Distance: 3 km</p>
          <p>Max Speed: 45 km/h</p>
          <p>Elevation Gain: 500 m</p>
          <button onClick={() => setActiveRun(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
