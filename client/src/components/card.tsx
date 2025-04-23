import React from 'react';
import '../styles/card.css';

type CardProps = {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  icons?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children, icons }) => {
  return (
    <div className="card-box">
      {/* === Header: Title + Icons === */}
      {(title || icons) && (
        <div className="card-header">
          {title && <h2 className="card-title">{title}</h2>}
          <div className="card-icons">
            {icons ? icons : null}
          </div>
        </div>
      )}

      {/* === Content: Stats/Info === */}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
