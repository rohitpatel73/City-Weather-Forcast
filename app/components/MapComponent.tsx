'use client';

import { useEffect, useRef } from 'react';

interface Props {
  lat: number;
  lon: number;
}

const MapComponent: React.FC<Props> = ({ lat, lon }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let mapInstance: any;

    const initializeMap = async () => {
      const L = await import('leaflet');

      // Prevent multiple map initializations
      if (mapRef.current && !mapRef.current.dataset.mapInitialized) {
        mapInstance = L.map(mapRef.current).setView([lat, lon], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstance);

        L.marker([lat, lon]).addTo(mapInstance);

        mapRef.current.dataset.mapInitialized = 'true';
      }
    };

    initializeMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [lat, lon]);

  return <div ref={mapRef} className="h-64 w-full rounded shadow-md" />;
};

export default MapComponent;
