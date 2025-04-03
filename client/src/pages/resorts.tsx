import React from 'react';
import '../styles/resort.css';
import CardList from '../components/cardList'; // This replaces the direct ResortCard import

export default function Resort() {
  return (
    <div className="resort-page">
      <div className="resort-map">[Map Placeholder]</div>
      
      {/* Replaced old carousel with scrollable resort cards */}
      <div className="resort-carousel fade-in">
        <CardList />
      </div>
    </div>
  );
}
