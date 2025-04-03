import React from 'react';
import ResortCard from '../components/resortCard';
import '../styles/resort.css';

const CardList: React.FC = () => {
  const resorts = [
    {
      name: 'Keystone Resort',
      location: 'Colorado, USA',
      temperature: 28,
      snowDepth: '56 in',
      liftsOpen: '21/23',
      trailsOpen: '115/120',
      firstLiftTime: '8:30 AM',
      imageUrl: '../src/assets/placeholder.png',
      website: 'https://www.keystoneresort.com/',
    },
    {
      name: 'Park City',
      location: 'Utah, USA',
      temperature: 31,
      snowDepth: '48 in',
      liftsOpen: '30/34',
      trailsOpen: '290/300',
      firstLiftTime: '9:00 AM',
      imageUrl: '../src/assets/placeholder.png',
      website: 'https://www.parkcitymountain.com/',
    },
  ];

  return (
    <div className="cardlist-wrapper">
      {resorts.map((resort, index) => (
        <div key={index} className="resort-card">
          <ResortCard {...resort} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
