import React, { useEffect, useState } from 'react';
import ResortCard from '../components/resortCard';
import '../styles/resort.css';

type Resort = {
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
  website: string;
  imageUrl: string;
};

type CardListProps = {
  search: string;
};

const CardList: React.FC<CardListProps> = ({ search }) => {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/resort/resorts')
      .then((res) => res.json())
      .then((data) => setResorts(data))
      .catch((err) => console.error('Failed to load resorts from API:', err));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setUserLocation(position.coords),
      (error) => console.warn('Location access denied:', error)
    );
  }, []);

  const filteredResorts = search.trim()
    ? resorts.filter((resort) => resort.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const nearbyResorts = userLocation && !search.trim()
    ? resorts.slice(0, 3) // future: filter by distance from userLocation
    : [];

  const featuredResort = !userLocation && !search.trim()
    ? resorts.find((resort) => resort.name.toLowerCase() === 'vail')
    : null;

  return (
    <div className="cardlist-wrapper">
      {!search.trim() && (
        <div className="no-results-message fade-in">
          <p>🔍 Start typing to search for a resort.</p>
        </div>
      )}

      {search.trim() && filteredResorts.length > 0 && (
        filteredResorts.map((resort, index) => (
          <div key={index} className="resort-card">
            <ResortCard {...resort} />
          </div>
        ))
      )}

      {!search.trim() && userLocation && nearbyResorts.length > 0 && (
        <>
          <h3 className="fade-in">🏔️ Resorts Near You</h3>
          {nearbyResorts.map((resort, index) => (
            <div key={index} className="resort-card">
              <ResortCard {...resort} />
            </div>
          ))}
        </>
      )}

      {!search.trim() && !userLocation && featuredResort && (
        <>
          <h3 className="fade-in">🌟 Featured Resort</h3>
          <div className="resort-card">
            <ResortCard {...featuredResort} />
          </div>
        </>
      )}
    </div>
  );
};

export default CardList;
