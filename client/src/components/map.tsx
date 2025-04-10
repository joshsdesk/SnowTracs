import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faCircleStop, faCableCar } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';
import Modal from './modal';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';
import ReactDOMServer from 'react-dom/server';

// ====== Types ======
type LatLng = [number, number];

interface Resort {
  name: string;
  region: string;
  country: string;
  snowBase?: number;
  snowfall24h?: number;
  liftsOpen?: number;
  liftsTotal?: number;
  trailsOpen?: number;
  trailsTotal?: number;
  conditions?: string;
  lastUpdated?: string;
}

// ====== FlyTo Component: Controls map movement ======
function FlyToLocation({ coordinates }: { coordinates: LatLng | null }) {
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
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapTarget, setMapTarget] = useState<LatLng | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [resortMarker, setResortMarker] = useState<LatLng | null>(null);
  const [currentResortSlug, setCurrentResortSlug] = useState<string | null>(null);

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
      setResortMarker([lat, lon]);
    }
  };

  const handleMarkerClick = () => {
    setShowModal(true);
  };

  const cableCarIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <div className="shake-marker">
        <FontAwesomeIcon icon={faCableCar} />
      </div>
    ),
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <div className="map-placeholder">
      {/* ====== Search Bar Overlay ====== */}
      <div className="search-overlay fade-in">
        <input
          type="text"
          placeholder="Search for any location or resort"
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
            {resortMarker && (
              <Marker position={resortMarker} icon={cableCarIcon} eventHandlers={{ click: handleMarkerClick }} />
            )}
          </MapContainer>
        )}
      </div>

      {/* ====== Recording Controls ====== */}
      <div className="record-overlay fade-in">
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

      {/* ====== Resort Info Modal ====== */}
      <Modal show={showModal} onClose={() => setShowModal(false)} title="Resort Info">
        <p>This is where the resort website will go later.</p>
      </Modal>
    </div>
  );
}
