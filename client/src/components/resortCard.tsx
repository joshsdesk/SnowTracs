import React from 'react';
import '../styles/resortcard.css';

export type ResortCardProps = {
  name: string;
  trailsOpen: number;
  trailsTotal: number;
  liftsOpen: number;
  liftsTotal: number;
  snowpack: {
    baseDepthInches: number;
    newSnow24hInches: number;
  };
  hours: string;
  condition: string;
  terrainParkOpen: boolean;
  website: string;
  imageUrl: string;
};

const ResortCard: React.FC<ResortCardProps> = ({
  name,
  trailsOpen,
  trailsTotal,
  liftsOpen,
  liftsTotal,
  snowpack,
  hours,
  condition,
  terrainParkOpen,
  website,
  imageUrl
}) => {
  return (
    <div className="resort-card-wrapper">
      <div className="resort-image">
        <img src={imageUrl} alt={`${name} logo`} />
      </div>

      <div className="resort-content">
        <h2 className="resort-name">{name}</h2>

        <ul className="resort-stats">
          <li><strong>Snowpack:</strong> {snowpack.baseDepthInches}" base, {snowpack.newSnow24hInches}" new</li>
          <li><strong>Lifts:</strong> {liftsOpen} / {liftsTotal}</li>
          <li><strong>Trails:</strong> {trailsOpen} / {trailsTotal}</li>
          <li><strong>Conditions:</strong> {condition}</li>
          <li><strong>Terrain Park:</strong> {terrainParkOpen ? 'Open' : 'Closed'}</li>
          <li><strong>Hours:</strong> {hours}</li>
        </ul>

        <div className="resort-link">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="resort-website-button"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResortCard;
