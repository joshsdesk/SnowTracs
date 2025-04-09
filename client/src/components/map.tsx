import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';

// ====== FlyTo Component: Controls map movement ======
function FlyToLocation({ coordinates }: { coordinates: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 13, { duration: 2 });
    }
  }, [coordinates, map]);

  return null;
}

// ====== Main Map Component ======
export default function Map() {
  // ====== State: UI Control ======
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ display_name: string }[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapTarget, setMapTarget] = useState<[number, number] | null>(null);

  // ====== Init: Get User's Location on Load ======
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(coords);
        setMapTarget(coords);
      },
      (error) => {
        console.error('Geolocation error:', error);
        const fallback: [number, number] = [39.7392, -104.9903]; // Denver
        setUserLocation(fallback);
        setMapTarget(fallback);
      }
    );
  }, []);

  // ====== Handler: Search via Nominatim API ======
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.length > 0) {
        const firstResult = data[0];
        const lat = parseFloat(firstResult.lat);
        const lon = parseFloat(firstResult.lon);

        setMapTarget([lat, lon]);
        setSearchResults(data); // future use for modals or overlays
      } else {
        console.warn('No results found.');
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Geosearch failed:', err);
    }
  };

  return (
    <div className="map-placeholder">

      {/* ====== Search Overlay ====== */}
      <div className="search-overlay fade-in">
        <input
          type="text"
          placeholder="Search for any location or resort"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          
          // ====== Keyboard Support: Trigger search on Enter key ======
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* ====== Map Display ====== */}
      <div className="map-content">
        {mapTarget && (
          <MapContainer
            center={mapTarget}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', zIndex: 1 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <FlyToLocation coordinates={mapTarget} />
          </MapContainer>
        )}
      </div>

      {/* ====== Recording Controls ====== */}
      <div className="record-overlay fade-in">
        {!isRecording ? (
          <div
            className="record-button"
            onClick={() => setIsRecording(true)}
            role="button"
            aria-label="Start"
          >
            <FontAwesomeIcon icon={faCirclePlay} />
          </div>
        ) : (
          <>
            <div
              className="record-button"
              onClick={() => setIsPaused(!isPaused)}
              role="button"
              aria-label={isPaused ? 'Resume' : 'Pause'}
            >
              <FontAwesomeIcon icon={isPaused ? faCirclePlay : faCirclePause} />
            </div>
            <div
              className="record-button"
              onClick={() => {
                setIsRecording(false);
                setIsPaused(false);
              }}
              role="button"
              aria-label="Stop"
            >
              <FontAwesomeIcon icon={faCircleStop} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
