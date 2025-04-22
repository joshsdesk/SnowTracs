import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faTrash, faDownload, faShareFromSquare, faChartLine
} from '@fortawesome/free-solid-svg-icons';

import Modal from '../components/modal';
import Card from '../components/card';
import '../styles/stats.css';

interface SessionData {
  _id: string;
  resort?: { name: string };
  date: string;
  runCount: number;
  totalDistance: number;
  elevationGain: number;
  topSpeed: number;
  notes?: string;
}

export default function Stats() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [showOverallModal, setShowOverallModal] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                sessions {
                  _id
                  resort { name }
                  date
                  runCount
                  totalDistance
                  elevationGain
                  topSpeed
                }
              }
            `
          })
        });

        const raw = await response.json();
        setSessions(raw?.data?.sessions || []);
      } catch (err) {
        console.error('Failed to fetch sessions:', err);
      }
    };

    fetchSessions();
  }, []);

  const latestSession = sessions[0];
  const pastSessions = sessions.slice(1, visibleCount);

  const handleShowMore = () => {
    if (visibleCount < sessions.length) setVisibleCount(prev => prev + 3);
    else setVisibleCount(3);
  };

  return (
    <div className="stats-page">
      <h1 className="heading-1">Stats</h1>

      {/* === Overall Stats Card === */}
      <Card title="Stats to Date" icons={
        <FontAwesomeIcon icon={faChartLine} className="fa-icon" onClick={() => setShowOverallModal(true)} />
      }>
        <ul className="resort-stats">
          <li><strong>Total Runs:</strong> 32</li>
          <li><strong>Total Distance:</strong> 56.3 mi</li>
          <li><strong>Elevation Gain:</strong> 5,640 ft</li>
        </ul>
      </Card>

      <div className="ski-divider">
        <img src="/assets/images/UI/ski.png" alt="Divider" />
      </div>

      {/* === Latest Session === */}
      {latestSession && (
        <>
          <Card title={`${latestSession.resort?.name || 'Unknown Resort'}`} icons={
            <>
              <FontAwesomeIcon icon={faEye} className="fa-icon" onClick={() => setSelectedSession(latestSession)} />
              <FontAwesomeIcon icon={faDownload} className="fa-icon" />
              <FontAwesomeIcon icon={faShareFromSquare} className="fa-icon" />
              <FontAwesomeIcon icon={faTrash} className="fa-icon" />
            </>
          }>
            <ul className="resort-stats">
              <li><strong>Runs:</strong> {latestSession.runCount}</li>
              <li><strong>Max Speed:</strong> {latestSession.topSpeed} mph</li>
              <li><strong>Elevation:</strong> {latestSession.elevationGain} ft</li>
            </ul>
          </Card>

          <div className="ski-divider">
            <img src="/assets/images/UI/ski.png" alt="Divider" />
          </div>
        </>
      )}

      {/* === Past Sessions === */}
      <h2 className="heading-3">Past Sessions</h2>
      {pastSessions.map(session => (
        <>
          <Card key={session._id} title={`${session.resort?.name || 'Unknown Resort'}`} icons={
            <>
              <FontAwesomeIcon icon={faEye} className="fa-icon" onClick={() => setSelectedSession(session)} />
              <FontAwesomeIcon icon={faDownload} className="fa-icon" />
              <FontAwesomeIcon icon={faShareFromSquare} className="fa-icon" />
              <FontAwesomeIcon icon={faTrash} className="fa-icon" />
            </>
          }>
            <ul className="resort-stats">
              <li><strong>Runs:</strong> {session.runCount}</li>
              <li><strong>Max Speed:</strong> {session.topSpeed} mph</li>
            </ul>
          </Card>

          <div className="ski-divider">
            <img src="/assets/images/UI/ski.png" alt="Divider" />
          </div>
        </>
      ))}

      {/* === Show More Button === */}
      {sessions.length > 3 && (
        <div className="history-toggle-wrapper">
          <button className="history-toggle-btn" onClick={handleShowMore}>
            {visibleCount < sessions.length ? 'Show More' : 'Show Less'}
          </button>
        </div>
      )}

      {/* === Modal for Latest Session === */}
      {selectedSession && (
        <Modal show={!!selectedSession} onClose={() => setSelectedSession(null)}>
          <ul className="resort-stats">
            <li><strong>Runs:</strong> {selectedSession.runCount}</li>
            <li><strong>Max Speed:</strong> {selectedSession.topSpeed} mph</li>
            <li><strong>Elevation:</strong> {selectedSession.elevationGain} ft</li>
          </ul>
          <textarea className="stat-notes" defaultValue={selectedSession.notes || ''}></textarea>
          <div className="share-row">
            <FontAwesomeIcon icon={faShareFromSquare} className="fa-icon" />
          </div>
          <div className="modal-footer">
            <button onClick={() => setSelectedSession(null)}>Close</button>
          </div>
        </Modal>
      )}

      {/* === Overall Modal === */}
      {showOverallModal && (
        <Modal show={showOverallModal} onClose={() => setShowOverallModal(false)}>
          <ul className="resort-stats">
            <li><strong>Total Runs:</strong> 32</li>
            <li><strong>Total Distance:</strong> 56.3 mi</li>
            <li><strong>Total Elevation:</strong> 5,640 ft</li>
          </ul>
          <div className="share-row">
            <FontAwesomeIcon icon={faShareFromSquare} className="fa-icon" />
          </div>
          <div className="modal-footer">
            <button onClick={() => setShowOverallModal(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
