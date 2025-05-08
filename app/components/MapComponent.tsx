'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

interface Props {
  lat: number;
  lon: number;
}

const MapComponent: React.FC<Props> = ({ lat, lon }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null); // ✅ No `any`

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const L = await import('leaflet');

      const map = L.map(mapRef.current).setView([lat, lon], 10);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      L.marker([lat, lon]).addTo(map);
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon]);

  return <div ref={mapRef} className="h-64 w-full rounded shadow-md" />;
};

export default MapComponent;
