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
          <div className="card-header">
            {title && <h2 className="card-title">{title}</h2>}
            {/* Always render the icon space, even if no icons */}
            <div className="card-icons">
              {icons ? icons : null}
            </div>
          </div>
        )}

        {/* Always expect children to be stats/info in grid */}
        {children}
      </div>
    </div>
  );
};

export default Card;
