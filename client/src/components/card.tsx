// card.tsx
import React from 'react';
import '../styles/card.css';

type CardProps = {
  title?: string;
  children: React.ReactNode;
  icons?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children, icons }) => {
  return (
    <div className="card-box">
      <div className="card-content">
        {(title || icons) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {icons && <div className="card-icons">{icons}</div>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
