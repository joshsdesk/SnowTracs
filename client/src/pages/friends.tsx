import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faMagnifyingGlass,
  faEllipsisVertical,
  faUserMinus,
  faEye,
  faCircleCheck,
  faCircleXmark,
  faUsers,
  faMountainSun,
  faArrowUp,
  faGaugeHigh
} from '@fortawesome/free-solid-svg-icons';
import '../styles/friends.css';
import Modal from '../components/modal';

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
  { id: '1', name: 'Charlie S.', avatarUrl: '/assets/images/profile1.jpg', status: 'On the slopes', runs: 14, elevation: 8900, maxSpeed: 47 },
  { id: '2', name: 'Maya L.',    avatarUrl: '/assets/images/profile2.jpg', status: 'Offline',       runs: 9,  elevation: 7000, maxSpeed: 60 }
];

const mockRequests: Request[] = [
  { id: 'r1', name: 'Jordan P.', avatarUrl: '/assets/images/profile3.jpg' },
  { id: 'r2', name: 'Alex R.',   avatarUrl: '/assets/images/profile4.jpg' }
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
    setFiltered(
      friends.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
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
      setFriends(prev => [{
        id: req.id,
        name: req.name,
        avatarUrl: req.avatarUrl || '',
        status: 'Offline'
      }, ...prev]);
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

  const currentUserAvatar = '/assets/images/default-profile.png';

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
        <ul className="list-unstyled mb-0">
          {filtered.map(friend => (
            <li key={friend.id}>
              <FriendCard friend={friend} onUnfriend={handleUnfriend} onViewStats={handleViewStats} />
            </li>
          ))}
        </ul>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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

const FriendCard: React.FC<{ friend: Friend; onUnfriend: (id: string) => void; onViewStats: (id: string) => void }> = ({ friend, onUnfriend, onViewStats }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="friend-card" onClick={() => navigate(`/user/${friend.id}`)}>
      <img src={friend.avatarUrl} alt={friend.name} width={48} height={48} className="rounded-circle" />
      <div>
        <div className="friend-header">
          <h5 className="friend-name">{friend.name}</h5>
          <FontAwesomeIcon icon={faEllipsisVertical} onClick={e => { e.stopPropagation(); setShowMenu(!showMenu); }} />
        </div>
        {friend.status && <small>{friend.status}</small>}
        <div className="friend-info">
          {friend.runs !== undefined && <span><FontAwesomeIcon icon={faMountainSun} /> {friend.runs} Runs</span>}
          {friend.elevation !== undefined && <span><FontAwesomeIcon icon={faArrowUp} /> {friend.elevation} ft</span>}
          {friend.maxSpeed !== undefined && <span><FontAwesomeIcon icon={faGaugeHigh} /> {friend.maxSpeed} mph</span>}
        </div>
      </div>
      {showMenu && (
        <div className="friend-menu">
          <div onClick={() => onUnfriend(friend.id)}><FontAwesomeIcon icon={faUserMinus} /> Unfriend</div>
          <div onClick={() => onViewStats(friend.id)}><FontAwesomeIcon icon={faEye} /> View Stats</div>
        </div>
      )}
    </div>
  );
};

export default Friends;
