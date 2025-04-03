import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faCircleStop } from '@fortawesome/free-solid-svg-icons';
import '../styles/map.css';

export default function Map() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="map-placeholder">
      {/* Search Bar Overlay */}
      <div className="search-overlay fade-in">
        <input
          type="text"
          placeholder="Search for a resort"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => console.log(`Searching for: ${searchQuery}`)}>Search</button>
      </div>

      {/* Map content (API or static placeholder) */}
      <div className="map-content">[ MAP GOES HERE ]</div>

      {/* Record Button Overlay (inside the same container) */}
      <div className="record-overlay fade-in">
        {!isRecording ? (
          <div
            className="record-button"
            onClick={() => setIsRecording(true)}
            role="button"
            aria-label="Start"
          >
            <FontAwesomeIcon icon={faCirclePlay} />
          </div>
        ) : (
          <>
            <div
              className="record-button"
              onClick={() => setIsPaused(!isPaused)}
              role="button"
              aria-label={isPaused ? 'Resume' : 'Pause'}
            >
              <FontAwesomeIcon icon={isPaused ? faCirclePlay : faCirclePause} />
            </div>
            <div
              className="record-button"
              onClick={() => {
                setIsRecording(false);
                setIsPaused(false);
              }}
              role="button"
              aria-label="Stop"
            >
              <FontAwesomeIcon icon={faCircleStop} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
