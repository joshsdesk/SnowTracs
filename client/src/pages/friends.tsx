import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faMagnifyingGlass, faEllipsisVertical,
  faUsers, faMountainSun, faArrowUp, faGaugeHigh
} from '@fortawesome/free-solid-svg-icons';
import '../styles/friends.css';
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

const mockFriends: Friend[] = [
  { id: '1', name: 'Charlie S.', avatarUrl: '/assets/images/profileIMGs/avatar1.webp', status: 'On the slopes', runs: 14, elevation: 8900, maxSpeed: 47 },
  { id: '2', name: 'Maya L.', avatarUrl: '/assets/images/profileIMGs/avatar3.webp', status: 'Offline', runs: 9, elevation: 7000, maxSpeed: 60 },
  { id: '3', name: 'Liam K.', avatarUrl: '/assets/images/profileIMGs/avatar4.webp', status: 'Resting', runs: 11, elevation: 7600, maxSpeed: 52 },
  { id: '4', name: 'Sofia P.', avatarUrl: '/assets/images/profileIMGs/avatar5.webp', status: 'Exploring', runs: 6, elevation: 4500, maxSpeed: 40 }
];

const Friends: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [filtered, setFiltered] = useState<Friend[]>(mockFriends);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(friends);
    } else {
      setFiltered(
        friends.filter(f =>
          f.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, friends]);

  const currentUserAvatar = '/assets/images/profileIMGs/avatar3.webp';

  return (
    <div className="friends-page">
      {/* === Top Bar === */}
      <div className="friends-topbar">
        <div className="topbar-left" onClick={() => navigate('/user')}>
          <img src={currentUserAvatar} alt="You" className="profile-avatar" />
        </div>
        <h4 className="topbar-title">Mountain Mates</h4>
        <div className="topbar-right">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-icon" title="Search" />
          <FontAwesomeIcon icon={faUserPlus} className="fa-icon" title="Add Friend" />
        </div>
      </div>

      {/* === Search Bar === */}
      <div className="friends-search">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      </div>

      {/* === Friends List === */}
      {filtered.length === 0 ? (
        <div className="friends-empty">
          <FontAwesomeIcon icon={faUsers} />
          <p>No friends yet—tap plus to add.</p>
        </div>
      ) : (
        <ul className="friends-list">
          {filtered.map(friend => (
            <li key={friend.id}>
              <Card
                title={friend.name}
                icons={<FontAwesomeIcon icon={faEllipsisVertical} />}
              >
                <div className="friend-header">
                  <img src={friend.avatarUrl} alt={friend.name} className="friend-avatar" />
                </div>
                <div className="friend-stats">
                  {friend.runs !== undefined && (
                    <span><FontAwesomeIcon icon={faMountainSun} /> <strong>Runs:</strong> {friend.runs}</span>
                  )}
                  {friend.elevation !== undefined && (
                    <span><FontAwesomeIcon icon={faArrowUp} /> <strong>Elevation:</strong> {friend.elevation} ft</span>
                  )}
                  {friend.maxSpeed !== undefined && (
                    <span><FontAwesomeIcon icon={faGaugeHigh} /> <strong>Max Speed:</strong> {friend.maxSpeed} mph</span>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Friends;
