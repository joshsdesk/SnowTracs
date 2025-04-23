// ====== Core Imports ======
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
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

function EmojiMarker({ position }: { position: LatLng }) {
  const userType = JSON.parse(localStorage.getItem('user') || '{}').userType || 'Snowboarder';
  const emoji = userType === 'Skier' ? '⛷️' : '🏂';

  const icon = new L.DivIcon({
    className: 'emoji-marker',
    html: `<div style="font-size: 24px;">${emoji}</div>`,
  });

  return <Marker position={position} icon={icon} />;
}

export default function Map() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapTarget, setMapTarget] = useState<LatLng | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [emojiPos, setEmojiPos] = useState<LatLng | null>(null);

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

    // ====== Cleanup Emoji on Unmount ======
    return () => {
      setEmojiPos(null);
    };
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
      const coords: LatLng = [lat, lon];
      setMapTarget(coords);
      setEmojiPos(coords); // Only set emoji after search
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
          {emojiPos && <EmojiMarker position={emojiPos} />}
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
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
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
    </>
  );
}
