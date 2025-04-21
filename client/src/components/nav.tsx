import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUserFriends,
  faUser,
  faMountainCity,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/nav.css';

export default function Nav() {
  return (
    <nav className="bottom-nav">
      <Link to="/settings" aria-label="Settings">
        <FontAwesomeIcon icon={faSliders} size="lg" />
      </Link>
      <Link to="/resorts" aria-label="Resorts">
        <FontAwesomeIcon icon={faMountainCity} size="lg" />
      </Link>
      <Link to="/home" aria-label="Home">
        <FontAwesomeIcon icon={faHome} size="lg" />
      </Link>
      <Link to="/friends" aria-label="Friends">
        <FontAwesomeIcon icon={faUserFriends} size="lg" />
      </Link>
      <Link to="/user" aria-label="User">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </Link>
    </nav>
  );
}
