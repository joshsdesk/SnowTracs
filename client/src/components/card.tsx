// Card.tsx
import React from 'react';
import '../styles/card.css'; // Generic card styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Example icon for close button

type CardProps = {
  onClose?: () => void;  // Close button function
  children: React.ReactNode;  // Content passed down to the card
};

const Card: React.FC<CardProps> = ({ onClose, children }) => {
  return (
    <div className="card-box">
      {/* Card Header (Top-right for icons like Close) */}
      <div className="card-header">
        {onClose && (
          <FontAwesomeIcon
            icon={faTimes}
            className="fa-icon fa-card-icon"
            title="Close"
            onClick={onClose}  // Close button logic
          />
        )}
      </div>

      <div className="card-content">
        {children} {/* Render passed content inside the card */}
      </div>
    </div>
  );
};

export default Card;
