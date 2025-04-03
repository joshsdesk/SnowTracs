import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCirclePlay,  faCirclePause,  faCircleStop,} from '@fortawesome/free-solid-svg-icons';
import '../styles/map.css';
import '../styles/modal.css';

export default function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleFinish = () => {
    setShowModal(true); // Show modal instead of navigating immediately
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsRecording(false);
    setIsPaused(false);
    navigate('/home');
  };

  return (
    <div className="record-container">
      <div className="record-actions">
        {!isRecording ? (
          <div onClick={() => setIsRecording(true)} role="button" aria-label="Start">
            <FontAwesomeIcon icon={faCirclePlay} size="2x" />
          </div>
        ) : (
          <>
            <div onClick={() => setIsPaused(!isPaused)} role="button" aria-label={isPaused ? 'Resume' : 'Pause'}>
              <FontAwesomeIcon icon={isPaused ? faCirclePlay : faCirclePause} size="2x" />
            </div>
            <div onClick={handleFinish} role="button" aria-label="Stop">
              <FontAwesomeIcon icon={faCircleStop} size="2x" />
            </div>
          </>
        )}
      </div>

      {/* Modal that appears on stop */}
      <Modal show={showModal} onClose={() => setShowModal(false)} title="End of Run">
        <p style={{ paddingBottom: '1rem' }}>Add your run details here!</p>
        <div className="modal-footer">
          <button onClick={() => setShowModal(false)}>Cancel</button>
          <button onClick={handleModalClose}>Save</button>
        </div>
      </Modal>
    </div>
  );
}
