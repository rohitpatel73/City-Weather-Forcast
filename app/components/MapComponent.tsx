import { useEffect, useRef } from 'react';

interface Props {
  lat: number;
  lon: number;
}

const MapComponent: React.FC<Props> = ({ lat, lon }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const L = require('leaflet');
    const map = L.map(mapRef.current).setView([lat, lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([lat, lon]).addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lon]);

  return <div ref={mapRef} className="h-64 w-full rounded shadow-md" />;
};

export default MapComponent;
