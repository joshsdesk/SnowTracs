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
import { finishSession, Segment, TrackPoint, SessionData } from '../utils/trackSession';
import { saveSession } from '../utils/sessionStore';

import '../styles/map.css';
import '../styles/record.css';

export default function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [currentPoints, setCurrentPoints] = useState<TrackPoint[]>([]);
  const [segmentStart, setSegmentStart] = useState<string | null>(null);
  const [lastSession, setLastSession] = useState<SessionData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const navigate = useNavigate();
  const userId = 'demo-user';

  const handleStart = () => {
    setIsRecording(true);
    setIsPaused(false);
    setSegmentStart(new Date().toISOString());
    setShowModal(true);

    const mockPoints: TrackPoint[] = Array.from({ length: 20 }, (_, i) => ({
      latitude: 39.605 + i * 0.0001,
      longitude: -105.943 + i * 0.0001,
      elevation: 11500 - i * 10,
      timestamp: new Date(Date.now() + i * 1000).toISOString(),
      speed: 10 + i,
      heading: 90,
    }));

    setCurrentPoints(mockPoints);
  };

  const handlePauseToggle = () => {
    if (!isRecording) return;

    if (!isPaused && currentPoints.length > 0 && segmentStart) {
      const segment: Segment = {
        type: 'run',
        startTime: segmentStart,
        endTime: new Date().toISOString(),
        points: currentPoints,
      };

      setSegments((prev) => [...prev, segment]);
      setCurrentPoints([]);
      setSegmentStart(null);
    }

    setIsPaused(!isPaused);
    if (!isPaused) setSegmentStart(new Date().toISOString());
  };

  const handleFinish = async () => {
    if (!userId) return;

    if (!isPaused && currentPoints.length > 0 && segmentStart) {
      const finalSegment: Segment = {
        type: 'run',
        startTime: segmentStart,
        endTime: new Date().toISOString(),
        points: currentPoints,
      };
      setSegments((prev) => [...prev, finalSegment]);
    }

    const session = finishSession([...segments], userId);
    await saveSession(session);

    setLastSession(session);
    setShowModal(true);
    setIsRecording(false);
    setIsPaused(false);
    setSegments([]);
    setCurrentPoints([]);
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

      <Modal show={showModal} onClose={handleModalClose} title={lastSession ? 'Session Summary' : 'Add Details'}>
        {lastSession ? (
          <div className="session-summary">
            <p><strong>Duration:</strong> {lastSession.stats.totalDuration} min</p>
            <p><strong>Distance:</strong> {lastSession.stats.totalDistance} km</p>
            <p><strong>Top Speed:</strong> {lastSession.stats.maxSpeed} km/h</p>
            <p><strong>Elevation Gain:</strong> {lastSession.stats.elevationGain} m</p>
            <p><strong>Runs:</strong> {lastSession.stats.numRuns}</p>
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
