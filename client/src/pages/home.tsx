import { useState } from 'react';
import Map from '../components/map';
import Nav from '../components/nav';
import '../styles/home.css';

export default function Home() {
  const [altitude, setAltitude] = useState(0);
  const [runs, setRuns] = useState(0);
  const [vertical, setVertical] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [activeButton, setActiveButton] = useState('friends');

  const handleButtonClick = (button: string) => {
    setActiveButton(button);

    if (button === 'friends') {
      setAltitude(500);
      setRuns(3);
      setVertical(1500);
      setSpeed(20);
    } else if (button === 'stats') {
      setAltitude(1000);
      setRuns(5);
      setVertical(2000);
      setSpeed(30);
    } else if (button === 'skiPatrol') {
      setAltitude(200);
      setRuns(2);
      setVertical(700);
      setSpeed(25);
    }
  };

  return (
    <div className="home-page">
      <div className="map-section">
        <Map />
      </div>

      <div className="info-panel">
        <div className="action-buttons">
          <button
            className={`action-btn ${activeButton === 'friends' ? 'active' : ''}`}
            onClick={() => handleButtonClick('friends')}
          >
            Friends
          </button>
          <button
            className={`action-btn ${activeButton === 'stats' ? 'active' : ''}`}
            onClick={() => handleButtonClick('stats')}
          >
            Stats
          </button>
          <button
            className={`action-btn ${activeButton === 'skiPatrol' ? 'active ski-patrol' : ''}`}
            onClick={() => handleButtonClick('skiPatrol')}
          >
            Ski Patrol
          </button>
        </div>

        <div className="stats-info">
          <div className="stat-item">
            <strong>Altitude</strong> {altitude} FT
          </div>
          <div className="stat-item">
            <strong>Runs</strong> {runs}
          </div>
          <div className="stat-item">
            <strong>Vertical</strong> {vertical} FT
          </div>
          <div className="stat-item">
            <strong>Speed</strong> {speed} MPH
          </div>
        </div>
      </div>

      <Nav />
    </div>
  );
}
