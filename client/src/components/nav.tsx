import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faUser, faMountainCity, faSliders } from '@fortawesome/free-solid-svg-icons';
import '../styles/nav.css';

export default function Nav() {
  return (
    <nav className="bottom-nav">
      <Link to="/settings">
        <FontAwesomeIcon icon={faSliders} size="lg" />
      </Link>
      <Link to="/resorts">
        <FontAwesomeIcon icon={faMountainCity} size="lg" />
      </Link>
      <Link to="/home">
        <FontAwesomeIcon icon={faHome} size="lg" />
      </Link>
      <Link to="/friends">
        <FontAwesomeIcon icon={faUserFriends} size="lg" />
      </Link>
      <Link to="/user">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </Link>
    </nav>
  );
}
