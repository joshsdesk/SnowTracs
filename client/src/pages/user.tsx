import React, { useState, useEffect } from 'react';
import '../styles/user.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/card';
import Modal from '../components/modal';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: 'Guest',
    description: 'No description provided.',
    profileImage: '',
    userType: '',
  });

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(3);

  const handleOpenAvatarModal = () => {
    const match = userData.profileImage.match(/avatar(\d+)\.webp/);
    setSelectedAvatarIndex(match ? parseInt(match[1]) : 3);
    setShowAvatarModal(true);
  };

  const handleCloseAvatarModal = () => {
    setShowAvatarModal(false);
  };

  const handleSaveAvatar = () => {
    const updatedProfileImage = `/assets/images/profileIMGs/avatar${selectedAvatarIndex}.webp`;
    const currentStored = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = {
      ...currentStored,
      profileImage: updatedProfileImage,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUserData(updatedUser);
    handleCloseAvatarModal();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserData({
          username: parsed.username || 'Guest',
          description: parsed.description || 'No description provided.',
          profileImage: parsed.profileImage || '/assets/images/profileIMGs/avatar3.webp',
          userType: parsed.userType || '',
        });
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
      }
    }
  }, []);

  return (
    <div className="profile-page">
      {/* === Top Row: Avatar + Weather === */}
      <Card>
        <div className="top-row">
          <div className="left-column">
            <div className="profile-avatar-wrapper">
              <img
                src={userData.profileImage || `/assets/images/profileIMGs/avatar3.webp`}
                alt="User Avatar"
                className="profile-avatar"
              />
              <div className="avatar-settings-icon">
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className="fa-icon"
                  title="Edit Profile Picture"
                  onClick={handleOpenAvatarModal}
                />
              </div>
            </div>
          </div>
          <div className="right-column">
            <div className="weather-info compact">
              <p>69°F</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="ski-divider">
        <img src="/assets/images/UI/ski.png" alt="Divider" />
      </div>

      {/* === User Info Card === */}
      <Card title={`${userData.username}${userData.userType ? ` is a ${userData.userType}` : ''}`}>
        <p className="user-description">{userData.description}</p>
      </Card>

      <div className="ski-divider">
        <img src="/assets/images/UI/ski.png" alt="Divider" />
      </div>

      {/* === Stats to Date Section === */}
      <Card title="Stats to Date">
        <ul className="resort-stats">
          <li><strong>Runs:</strong> 26</li>
          <li><strong>Total Elevation:</strong> 18,200 ft</li>
          <li><strong>Max Speed:</strong> 72 km/h</li>
          <li><strong>Lift Time:</strong> 2 hrs</li>
          <li><strong>Hours Active:</strong> 4 hrs</li>
        </ul>
      </Card>

      <div className="ski-divider">
        <img src="/assets/images/UI/ski.png" alt="Divider" />
      </div>

      {/* === Favorite Mountains Section === */}
      <Card title="Favorite Mountains">
        <ul className="resort-stats">
          <li><strong>Snowpack:</strong> 45"</li>
          <li><strong>Trails:</strong> 72 / 100</li>
          <li><strong>Lifts:</strong> 10 / 12</li>
          <li><strong>Gondolas:</strong> 4 / 5</li>
          <li><strong>Hours:</strong> 9am - 5pm</li>
        </ul>
      </Card>

      <div className="ski-divider">
        <img src="/assets/images/UI/ski.png" alt="Divider" />
      </div>

      {/* === Your Tracs Section === */}
      <Card title="Your Tracs" icons={
        <FontAwesomeIcon icon={faEye} className="fa-icon" />
      }>
        <ul className="resort-stats">
          <li><strong>Runs:</strong> 5</li>
          <li><strong>Elevation:</strong> 2800 ft</li>
          <li><strong>Max Speed:</strong> 62 km/h</li>
          <li><strong>Lift Time:</strong> 1 hr</li>
          <li><strong>Session Time:</strong> 2 hrs</li>
        </ul>
      </Card>

    
      {/* === Social Media Icons === */}
      <div className="social-media-share">
        <FontAwesomeIcon icon={faFacebook} size="2x" color="#1877f2" />
        <FontAwesomeIcon icon={faInstagram} size="2x" color="#E4405F" />
        <FontAwesomeIcon icon={faTwitter} size="2x" color="#1DA1F2" />
      </div>

      {/* === Avatar Modal === */}
      <Modal show={showAvatarModal} onClose={handleCloseAvatarModal} title="Change Avatar">
        <div className="avatar-modal-content">
          <div className="profile-avatar-wrapper">
            <img
              src={`/assets/images/profileIMGs/avatar${selectedAvatarIndex}.webp`}
              alt="Current Avatar"
              className="profile-avatar"
            />
          </div>
          <label htmlFor="avatarSelect" className="form-label">Choose a new avatar:</label>
          <select
            id="avatarSelect"
            className="form-control"
            value={selectedAvatarIndex}
            onChange={(e) => setSelectedAvatarIndex(Number(e.target.value))}
          >
            {[...Array(9)].map((_, index) => (
              <option key={index} value={index}>
                Avatar {index}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleSaveAvatar}>Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
