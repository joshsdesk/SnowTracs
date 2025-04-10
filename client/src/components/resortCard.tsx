import React from 'react';
import '../styles/resortcard.css';

type ResortCardProps = {
  name: string;
  trailsOpen: number;
  trailsTotal: number;
  liftsOpen: number;
  liftsTotal: number;
  snowDepth: {
    baseDepthInches: number;
    newSnow24hInches: number;
  };
  condition: string;
  terrainParkOpen: boolean;
  website: string;
};

const ResortCard: React.FC<ResortCardProps> = ({
  name,
  trailsOpen,
  trailsTotal,
  liftsOpen,
  liftsTotal,
  snowDepth,
  condition,
  terrainParkOpen,
  website
}) => {
  return (
    <div className="resort-card-wrapper">
      <div className="resort-content">
        <h2 className="resort-name">{name}</h2>
        
        <ul className="resort-stats">
          <li><strong>Snowpack:</strong> {snowDepth.baseDepthInches}\" base, {snowDepth.newSnow24hInches}\" new</li>
          <li><strong>Lifts:</strong> {liftsOpen} / {liftsTotal}</li>
          <li><strong>Trails:</strong> {trailsOpen} / {trailsTotal}</li>
          <li><strong>Conditions:</strong> {condition}</li>
          <li><strong>Terrain Park:</strong> {terrainParkOpen ? 'Open' : 'Closed'}</li>
        </ul>

        <div className="resort-link">
          <a href={website} target="_blank" rel="noopener noreferrer">
            More Info
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResortCard;
