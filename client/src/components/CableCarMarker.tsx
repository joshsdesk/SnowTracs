// components/CableCarMarker.tsx
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCableCar } from '@fortawesome/free-solid-svg-icons';
import ReactDOMServer from 'react-dom/server';

export default function CableCarMarker({
  position,
  onClick,
}: {
  position: [number, number];
  onClick: () => void;
}) {
  const iconHTML = ReactDOMServer.renderToString(
    <div className="shake-marker">
      <FontAwesomeIcon icon={faCableCar} />
    </div>
  );

  const icon = L.divIcon({
    html: iconHTML,
    className: '', // prevent Leaflet from adding default styling
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return <Marker position={position} icon={icon} eventHandlers={{ click: onClick }} />;
}

