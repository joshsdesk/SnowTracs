// ====== Core Imports ======
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';

// ====== Types ======
type LatLng = [number, number];

function FlyToLocation({ coordinates }: { coordinates: LatLng | null }) {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 13, { duration: 2 });
    }
  }, [coordinates, map]);
  return null;
}

export default function Map() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapTarget, setMapTarget] = useState<LatLng | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  // ====== Set User Location on Load ======
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: LatLng = [position.coords.latitude, position.coords.longitude];
        setUserLocation(coords);
        setMapTarget(coords);
      },
      () => {
        const fallback: LatLng = [39.7392, -104.9903];
        setUserLocation(fallback);
        setMapTarget(fallback);
      }
    );
  }, []);

  // ====== Geocode Search Input ======
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (geoData.length > 0) {
      const firstResult = geoData[0];
      const lat = parseFloat(firstResult.lat);
      const lon = parseFloat(firstResult.lon);
      setMapTarget([lat, lon]);
    }
  };

  // ====== UI Render ======
  return (
    <>
      {/* ====== Map View ====== */}
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

      {/* ====== Search Overlay ====== */}
      <div className="search-overlay">
        <input
          type="text"
          placeholder="Search for any location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* ====== Record Controls ====== */}
      <div className="record-overlay">
        {!isRecording ? (
          <div className="record-button" onClick={() => setIsRecording(true)} role="button" aria-label="Start">
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
              <FontAwesomeIcon icon={faCirclePlay} />
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
    </>
  );
}
