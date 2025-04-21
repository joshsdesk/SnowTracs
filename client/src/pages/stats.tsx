import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faTrash,
  faDownload,
  faShareFromSquare,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

import Modal from '../components/modal';
import Card from '../components/card'; // Import the Card component
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
        console.log('GraphQL raw JSON:', raw);
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

      <div className="overall-stats-card card-box">
        <Card>
          <div className="stat-header">
            <h2 className="heading-2">{`Stats to Date`}</h2>
            <div className="stat-icons">
              <FontAwesomeIcon
                icon={faChartLine}
                title="View Chart"
                className="icon-btn"
                onClick={() => setShowOverallModal(true)}
              />
            </div>
          </div>
          <div className="stat-info">
            <div className="stat-labels">
              <span className="stat-label">Total Runs</span>
              <span className="stat-value">32</span>
            </div>
            <div className="stat-labels">
              <span className="stat-label">Total Distance</span>
              <span className="stat-value">56.3 mi</span>
            </div>
            <div className="stat-labels">
              <span className="stat-label">Elevation Gain</span>
              <span className="stat-value">5,640 ft</span>
            </div>
          </div>
        </Card>
      </div>

      {latestSession && (
        <div className="stat-card card-box">
          <Card>
            <div className="stat-header">
              <h2 className="heading-2">
                {(latestSession.resort?.name || 'Unknown Resort')} – {latestSession.date}
              </h2>
              <div className="stat-icons">
                <FontAwesomeIcon
                  icon={faEye}
                  title="View Full Stats"
                  className="icon-btn"
                  onClick={() => setSelectedSession(latestSession)}
                />
                <FontAwesomeIcon
                  icon={faDownload}
                  title="Download Session"
                  className="icon-btn"
                />
                <FontAwesomeIcon
                  icon={faShareFromSquare}
                  title="Share Session"
                  className="icon-btn share-icon"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  title="Delete Session"
                  className="icon-btn"
                />
              </div>
            </div>
            <div className="stat-info">
              <div className="stat-labels">
                <span className="stat-label">Runs</span>
                <span className="stat-value">{latestSession.runCount}</span>
              </div>
              <div className="stat-labels">
                <span className="stat-label">Max Speed</span>
                <span className="stat-value">{latestSession.topSpeed} mph</span>
              </div>
              <div className="stat-labels">
                <span className="stat-label">Elevation</span>
                <span className="stat-value">{latestSession.elevationGain} ft</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="history-section">
        <h2 className="heading-3">Past Sessions</h2>
        {pastSessions.map(session => (
          <div key={session._id} className="history-card card-box fade-in">
            <div className="stat-header">
              <h3 className="heading-3">
                {(session.resort?.name || 'Unknown Resort')} – {session.date}
              </h3>
              <div className="stat-icons">
                <FontAwesomeIcon
                  icon={faEye}
                  title="View Full Stats"
                  className="icon-btn"
                  onClick={() => setSelectedSession(session)}
                />
                <FontAwesomeIcon
                  icon={faDownload}
                  title="Download Session"
                  className="icon-btn"
                />
                <FontAwesomeIcon
                  icon={faShareFromSquare}
                  title="Share Session"
                  className="icon-btn share-icon"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  title="Delete Session"
                  className="icon-btn"
                />
              </div>
            </div>
            <div className="stat-info">
              <div className="stat-labels">
                <span className="stat-label">Runs</span>
                <span className="stat-value">{session.runCount}</span>
              </div>
              <div className="stat-labels">
                <span className="stat-label">Max Speed</span>
                <span className="stat-value">{session.topSpeed} mph</span>
              </div>
            </div>
          </div>
        ))}
        {sessions.length > 3 && (
          <div className="history-toggle-wrapper">
            <button className="history-toggle-btn" onClick={handleShowMore}>
              {visibleCount < sessions.length ? 'Show More' : 'Show Less'}
            </button>
          </div>
        )}
      </div>

      {selectedSession && (
        <Modal show={!!selectedSession} onClose={() => setSelectedSession(null)}>
          <div className="stats-modal-grid">
            <div className="stat-detail-card">
              <p className="stat-label">Runs</p>
              <p className="stat-value">{selectedSession.runCount}</p>
            </div>
            <div className="stat-detail-card">
              <p className="stat-label">Max Speed</p>
              <p className="stat-value">{selectedSession.topSpeed} mph</p>
            </div>
            <div className="stat-detail-card">
              <p className="stat-label">Elevation</p>
              <p className="stat-value">{selectedSession.elevationGain} ft</p>
            </div>
          </div>

          <textarea className="stat-notes" defaultValue={selectedSession.notes || ''}></textarea>

          <div className="share-row">
            <FontAwesomeIcon icon={faShareFromSquare} title="Share Session" className="share-icon" />
          </div>

          <div className="modal-footer">
            <button onClick={() => setSelectedSession(null)}>Close</button>
          </div>
        </Modal>
      )}

      {showOverallModal && (
        <Modal show={showOverallModal} onClose={() => setShowOverallModal(false)}>
          <div className="overall-modal-grid">
            <div className="overall-detail-card">
              <p className="overall-label">Total Runs</p>
              <p className="overall-value">32</p>
            </div>
            <div className="overall-detail-card">
              <p className="overall-label">Total Distance</p>
              <p className="overall-value">56.3 mi</p>
            </div>
            <div className="overall-detail-card">
              <p className="overall-label">Total Elevation</p>
              <p className="overall-value">5,640 ft</p>
            </div>
          </div>

          <div className="share-row">
            <FontAwesomeIcon icon={faShareFromSquare} title="Share All Stats" className="share-icon" />
          </div>

          <div className="modal-footer">
            <button onClick={() => setShowOverallModal(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
