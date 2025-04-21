// user.tsx - Structured with outer sections and card containers
import React, { useState } from 'react';
import '../styles/user.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeartCircleCheck, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [activeRun, setActiveRun] = useState<number | null>(null);
  const [riderType] = useState<'skier' | 'snowboarder'>('snowboarder');

  const handleRunClick = (runId: number) => {
    setActiveRun(runId);
  };

  return (
    <div className="profile-page">
      {/* === Top Row: Avatar + Weather === */}
      <div className="top-row">
        <div className="left-column">
          <div className="profile-avatar-wrapper">
            <img
              src="/assets/images/profileIMGs/avatar3.png"
              alt="User Avatar"
              className="profile-avatar"
            />
          </div>
        </div>
        <div className="right-column">
          <div className="weather-info compact">
            <p>69°F</p>
          </div>
        </div>
      </div>

      {/* === User Info Card === */}
      <div className="user-card">
        <h2 className="section-title">JoshsBoard</h2>
        <p className="user-description">Shredding powder &amp; chasing peaks. 🏔️</p>
      </div>

      {/* === Stats to Date Section === */}
      <div className="user-stats">
        <h3 className="section-title">Stats to Date</h3>
        <div className="user-stats-card">
          <div className="stats-labels">
            <p>Runs</p>
            <p>Total Elevation</p>
            <p>Max Speed</p>
          </div>
          <div className="stats-values">
            <p>26</p>
            <p>18,200 ft</p>
            <p>72 km/h</p>
          </div>
        </div>
      </div>

      {/* === Favorite Mountains Section === */}
      <div className="fav-mtn">
        <h3 className="section-title">Favorite Mountains</h3>
        <div className="fav-mtn-card">
          <div className="fav-mtn-header">
            <h4>Snowmass</h4>
            <div className="card-actions">
              <FontAwesomeIcon icon={faHeartCircleCheck} className="resort-icon selected" title="Favorited" />
              <FontAwesomeIcon icon={faTrash} className="resort-icon delete" title="Remove from Favorites" />
            </div>
          </div>
          <div className="fav-mtn-labels">
            <p><strong>Snowpack:</strong> 45"</p>
            <p><strong>Trails:</strong> 72 / 100</p>
            <p><strong>Lifts:</strong> 10 / 12</p>
          </div>
        </div>
      </div>

      {/* === Your Tracs Section === */}
      <div className="ur-tracs">
        <h3 className="section-title">Your Tracs</h3>
        <div className="session-card">
          <div className="session-header">
            <h4>Keystone</h4>
            <FontAwesomeIcon
              icon={faEye}
              className="resort-icon session-eye"
              title="View Full Stats"
              onClick={() => window.location.href = '/stats'}
            />
          </div>
          <div className="session-info">
            <p><strong>Runs:</strong> 5</p>
            <p><strong>Elevation:</strong> 2800 ft</p>
            <p><strong>Max Speed:</strong> 62 km/h</p>
          </div>
        </div>
      </div>

      {/* === Social Icons === */}
      <div className="social-media-share">
        <FontAwesomeIcon icon={faFacebook} size="2x" color="#1877f2" />
        <FontAwesomeIcon icon={faInstagram} size="2x" color="#E4405F" />
        <FontAwesomeIcon icon={faTwitter} size="2x" color="#1DA1F2" />
      </div>
    </div>
  );
};

export default Profile;