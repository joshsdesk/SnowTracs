import React from 'react';
import mountain from './assets/mtns.png'; // adjust path as needed
import './styles/eggs.css';

const Eggs: React.FC = () => {
  return (
    <div
      className="eggs-container"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      <div className="yeti-track">
        <div className="yeti">🏂</div>
      </div>
    </div>
  );
};

export default Eggs;
