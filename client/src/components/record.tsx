import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlay,
  faCirclePause,
  faCircleStop,
  faCamera,
  faNoteSticky,
  faLocationDot,
  faFaceSmile,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import Modal from '../components/modal';
import '../styles/map.css';
import '../styles/record.css';

export default function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleStart = () => {
    setIsRecording(true);
    setIsPaused(false);
    setSessionEnded(false);
    setShowModal(true);
  };

  const handlePauseToggle = () => {
    if (!isRecording) return;
    setIsPaused(!isPaused);
  };

  const handleFinish = () => {
    setSessionEnded(true);
    setShowModal(true);
    setIsRecording(false);
    setIsPaused(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNote('');
    setPhotoPreview(null);
    setShowNoteInput(false);
    setShowPhotoInput(false);
    navigate('/home');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="record-container">
      <div className="record-controls">
        {!isRecording && (
          <button className="record-btn" onClick={handleStart} aria-label="Start">
            <FontAwesomeIcon icon={faCirclePlay} />
          </button>
        )}

        {isRecording && !isPaused && (
          <>
            <button className="record-btn" onClick={handlePauseToggle} aria-label="Pause">
              <FontAwesomeIcon icon={faCirclePause} />
            </button>
            <button className="record-btn" onClick={handleFinish} aria-label="Stop">
              <FontAwesomeIcon icon={faCircleStop} />
            </button>
          </>
        )}

        {isRecording && isPaused && (
          <>
            <button className="record-btn" onClick={handlePauseToggle} aria-label="Resume">
              <FontAwesomeIcon icon={faCirclePlay} />
            </button>
            <button className="record-btn" onClick={handleFinish} aria-label="Stop">
              <FontAwesomeIcon icon={faCircleStop} />
            </button>
          </>
        )}
      </div>

      <Modal show={showModal} onClose={handleModalClose} title={sessionEnded ? 'Session Summary' : 'Add Details'}>
        {sessionEnded ? (
          <div className="session-summary">
            <p><strong>Duration:</strong> 23 min</p>
            <p><strong>Distance:</strong> 5.2 km</p>
            <p><strong>Top Speed:</strong> 48.6 km/h</p>
            <p><strong>Elevation Gain:</strong> 420 m</p>
            <p><strong>Runs:</strong> 3</p>
          </div>
        ) : (
          <>
            <div className="pause-icon-row">
              <button className="pause-icon-btn" onClick={() => setShowPhotoInput(!showPhotoInput)}>
                <FontAwesomeIcon icon={faCamera} />
                <span className="pause-icon-label">Photo</span>
              </button>

              <button className="pause-icon-btn" onClick={() => setShowNoteInput(!showNoteInput)}>
                <FontAwesomeIcon icon={faNoteSticky} />
                <span className="pause-icon-label">Note</span>
              </button>

              <button className="pause-icon-btn">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="pause-icon-label">Tag</span>
              </button>

              <button className="pause-icon-btn">
                <FontAwesomeIcon icon={faFaceSmile} />
                <span className="pause-icon-label">Mood</span>
              </button>
            </div>

            {showPhotoInput && (
              <div className="pause-photo-preview">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {photoPreview && <img src={photoPreview} alt="Preview" />}
              </div>
            )}

            {showNoteInput && (
              <textarea
                className="pause-note-input"
                placeholder="Add a quick note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            )}
          </>
        )}

        <button className="pause-save-btn" onClick={handleModalClose}>
          <FontAwesomeIcon icon={faCheck} /> Save
        </button>
      </Modal>
    </div>
  );
}
