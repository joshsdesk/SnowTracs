import React from 'react';
import '../styles/resortcard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

// ===== ResortCard Props =====
export type ResortCardProps = {
  name: string;
  trails_open: number;
  trails_total: number;
  lifts_open: number;
  lifts_total: number;
  gondolas_open: number;
  gondolas_total: number;
  snowpack_in: number;
  hours: string;
  website: string;
};

// ===== ResortCard Component =====
const ResortCard: React.FC<ResortCardProps> = ({
  name,
  trails_open,
  trails_total,
  lifts_open,
  lifts_total,
  gondolas_open,
  gondolas_total,
  snowpack_in,
  hours,
  website
}) => {
  return (
    <div className="resort-card-wrapper">
      {/* === Right: Main Content === */}
      <div className="resort-content">
        <h2 className="resort-name">{name}</h2>

        {/* === Resort Stats === */}
        <ul className="resort-stats">
          <li><strong>Snowpack:</strong> {snowpack_in}"</li>
          <li><strong>Lifts:</strong> {lifts_open} / {lifts_total}</li>
          <li><strong>Gondolas:</strong> {gondolas_open} / {gondolas_total}</li>
          <li><strong>Trails:</strong> {trails_open} / {trails_total}</li>
          <li><strong>Hours:</strong> {hours}</li>
        </ul>

        {/* === Bottom Row: Website + Icons === */}
        <div className="resort-actions">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="resort-website-button"
          >
            Visit Website
          </a>

          <div className="resort-icons">
            <FontAwesomeIcon icon={faHeart} className="resort-icon" title="Love" />
            <FontAwesomeIcon icon={faPlus} className="resort-icon" title="Add to Favorites" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortCard;
