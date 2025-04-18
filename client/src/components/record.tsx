import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faCircleStop } from '@fortawesome/free-solid-svg-icons';
import '../styles/map.css';
import '../styles/modal.css';

import { finishSession, Segment, TrackPoint, SessionData } from '../utils/trackSession';
import { saveSession } from '../utils/sessionStore';

export default function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [currentPoints, setCurrentPoints] = useState<TrackPoint[]>([]);
  const [segmentStart, setSegmentStart] = useState<string | null>(null);
  const [lastSession, setLastSession] = useState<SessionData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const userId = 'demo-user';

  const handleStart = () => {
    setIsRecording(true);
    setIsPaused(false);
    setCurrentPoints([]);
    setSegmentStart(new Date().toISOString());
  };

  const handlePauseToggle = () => {
    if (!isRecording) return;

    if (!isPaused && currentPoints.length > 0 && segmentStart) {
      const segment: Segment = {
        type: 'run',
        startTime: segmentStart,
        endTime: new Date().toISOString(),
        points: currentPoints
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
        points: currentPoints
      };
      setSegments((prev) => [...prev, finalSegment]);
    }

    const session = finishSession([...segments], userId);
    await saveSession(session);

    setLastSession(session);
    setIsRecording(false);
    setIsPaused(false);
    setSegments([]);
    setCurrentPoints([]);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/home');
  };

  return (
    <div className="record-container">
      <div className="record-actions">
        {!isRecording ? (
          <div onClick={handleStart} role="button" aria-label="Start">
            <FontAwesomeIcon icon={faCirclePlay} size="2x" />
          </div>
        ) : (
          <>
            <div onClick={handlePauseToggle} role="button" aria-label={isPaused ? 'Resume' : 'Pause'}>
              <FontAwesomeIcon icon={isPaused ? faCirclePlay : faCirclePause} size="2x" />
            </div>
            <div onClick={handleFinish} role="button" aria-label="Stop">
              <FontAwesomeIcon icon={faCircleStop} size="2x" />
            </div>
          </>
        )}
      </div>

      {showModal && lastSession && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Session Summary</h2>
            <p><strong>Duration:</strong> {lastSession.stats.totalDuration} min</p>
            <p><strong>Distance:</strong> {lastSession.stats.totalDistance} km</p>
            <p><strong>Top Speed:</strong> {lastSession.stats.maxSpeed} km/h</p>
            <p><strong>Elevation Gain:</strong> {lastSession.stats.elevationGain} m</p>
            <p><strong>Runs:</strong> {lastSession.stats.numRuns}</p>
            <div className="modal-buttons">
              <button onClick={handleModalClose}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
