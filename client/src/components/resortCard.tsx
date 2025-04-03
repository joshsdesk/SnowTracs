import React from 'react';
import '../styles/resortcard.css';

type ResortCardProps = {
  name: string;
  location: string;
  temperature: number;
  snowDepth: string;
  liftsOpen: string;
  trailsOpen: string;
  firstLiftTime: string;
  imageUrl: string;
  website: string;
};

const ResortCard: React.FC<ResortCardProps> = ({
  name,
  location,
  temperature,
  snowDepth,
  liftsOpen,
  trailsOpen,
  firstLiftTime,
  imageUrl,
  website
}) => {
  return (
    <div className="resort-card-wrapper">
      <div className="resort-image">
        <img src={imageUrl} alt={`${name} Resort`} />
      </div>

      <div className="resort-content">
        <div className="resort-top">
          <div className="resort-title">
            <h2 className="resort-name">{name}</h2>
            <p className="resort-detail">{location}</p>
          </div>
          <div className="resort-temp">{temperature}°</div>
        </div>

        <ul className="resort-stats">
          <li>Snowpack: {snowDepth}</li>
          <li>Lifts Open: {liftsOpen}</li>
          <li>Trails Open: {trailsOpen}</li>
          <li>First Lift: {firstLiftTime}</li>
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
