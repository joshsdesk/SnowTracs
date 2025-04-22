import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faMagnifyingGlass, faEllipsisVertical,
  faUserMinus, faEye, faCircleCheck, faCircleXmark,
  faUsers, faMountainSun, faArrowUp, faGaugeHigh
} from '@fortawesome/free-solid-svg-icons';
import '../styles/friends.css';
import Modal from '../components/modal';
import Card from '../components/card';

interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  status?: string;
  runs?: number;
  elevation?: number;
  maxSpeed?: number;
}

interface Request {
  id: string;
  name: string;
  avatarUrl?: string;
}

const mockFriends: Friend[] = [
  { id: '1', name: 'Charlie S.', avatarUrl: '/assets/images/avatar1.webp', status: 'On the slopes', runs: 14, elevation: 8900, maxSpeed: 47 },
  { id: '2', name: 'Maya L.', avatarUrl: '/assets/images/avatar3.webp', status: 'Offline', runs: 9, elevation: 7000, maxSpeed: 60 },
  { id: '3', name: 'Liam K.', avatarUrl: '/assets/images/avatar4.webp', status: 'Resting', runs: 11, elevation: 7600, maxSpeed: 52 },
  { id: '4', name: 'Sofia P.', avatarUrl: '/assets/images/avatar5.webp', status: 'Exploring', runs: 6, elevation: 4500, maxSpeed: 40 },
  { id: '5', name: 'Daniel W.', avatarUrl: '/assets/images/avatar6.webp', status: 'Offline', runs: 17, elevation: 10000, maxSpeed: 65 },
  { id: '6', name: 'Olivia M.', avatarUrl: '/assets/images/avatar7.webp', status: 'On the slopes', runs: 13, elevation: 8500, maxSpeed: 55 },
  { id: '7', name: 'Ethan B.', avatarUrl: '/assets/images/avatar8.webp', status: 'In Lodge', runs: 5, elevation: 3200, maxSpeed: 38 },
  { id: '8', name: 'Emma J.', avatarUrl: '/assets/images/avatar9.webp', status: 'Offline', runs: 12, elevation: 9100, maxSpeed: 50 },
];

const mockRequests: Request[] = [
  { id: 'r1', name: 'Jordan P.', avatarUrl: '/assets/images/avatar1.webp' },
  { id: 'r2', name: 'Alex R.', avatarUrl: '/assets/images/avatar3.webp' }
];

const Friends: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [filtered, setFiltered] = useState<Friend[]>(mockFriends);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [newRequestName, setNewRequestName] = useState<string>('');

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(friends); // Show all friends by default
    } else {
      setFiltered(
        friends.filter(f =>
          f.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, friends]);

  const handleUnfriend = (id: string) => {
    setFriends(prev => prev.filter(f => f.id !== id));
  };

  const handleViewStats = (id: string) => {
    navigate(`/stats/${id}`);
  };

  const handleAccept = (id: string) => {
    const req = requests.find(r => r.id === id);
    if (req) {
      setFriends(prev => [ { id: req.id, name: req.name, avatarUrl: req.avatarUrl || '', status: 'Offline' }, ...prev ]);
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleDecline = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleSendRequest = () => {
    if (!newRequestName.trim()) return;
    setRequests(prev => [
      { id: Date.now().toString(), name: newRequestName.trim() },
      ...prev
    ]);
    setNewRequestName('');
  };

  const currentUserAvatar = '/assets/images/avatar2.webp';

  return (
    <div className="friends-page">
      <div className="friends-topbar">
        <img src={currentUserAvatar} alt="You" width={32} height={32} className="rounded-circle" />
        <h4>Friends</h4>
        <FontAwesomeIcon icon={faUserPlus} onClick={() => setShowModal(true)} className="cursor-pointer" />
      </div>
      <div className="friends-search">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      </div>
      {filtered.length === 0 ? (
        <div className="friends-empty">
          <FontAwesomeIcon icon={faUsers} />
          <p>No friends yet—tap plus to add.</p>
        </div>
      ) : (
        <ul className="friends-list">
          {filtered.map(friend => (
            <li key={friend.id}>
              <Card title={friend.name} icons={
                <FontAwesomeIcon icon={faEllipsisVertical} onClick={e => { e.stopPropagation(); }} />
              }>
                <div className="friend-info">
                  <img src={friend.avatarUrl} alt={friend.name} width={48} height={48} className="rounded-circle" />
                  {friend.status && <small>{friend.status}</small>}
                  <div className="friend-info">
                    {friend.runs !== undefined && <span><FontAwesomeIcon icon={faMountainSun} /> {friend.runs} Runs</span>}
                    {friend.elevation !== undefined && <span><FontAwesomeIcon icon={faArrowUp} /> {friend.elevation} ft</span>}
                    {friend.maxSpeed !== undefined && <span><FontAwesomeIcon icon={faGaugeHigh} /> {friend.maxSpeed} mph</span>}
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h5>Friend Requests</h5>
        {requests.map(req => (
          <div key={req.id} className="d-flex align-items-center justify-content-between mb-2">
            <span>{req.name}</span>
            <div>
              <FontAwesomeIcon icon={faCircleCheck} onClick={() => handleAccept(req.id)} className="me-2 cursor-pointer" />
              <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleDecline(req.id)} className="cursor-pointer" />
            </div>
          </div>
        ))}
        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter name to add"
            value={newRequestName}
            onChange={e => setNewRequestName(e.target.value)}
          />
          <button onClick={handleSendRequest} className="btn btn-primary mt-2">Send</button>
        </div>
      </Modal>
    </div>
  );
};

export default Friends;
