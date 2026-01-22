
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { RIDE_DATA, STOP_COORDS, ICONS } from '../constants';

const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView([3.7, 102.1], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Outbound Route
    const goCoords = RIDE_DATA.routeGo.map(stop => STOP_COORDS[stop]);
    const goLine = L.polyline(goCoords, { color: '#3b82f6', weight: 4, dashArray: '10, 10' }).addTo(mapRef.current);
    
    // Return Route
    const backCoords = RIDE_DATA.routeBack.map(stop => STOP_COORDS[stop]);
    const backLine = L.polyline(backCoords, { color: '#f97316', weight: 4, opacity: 0.7 }).addTo(mapRef.current);

    // Add Markers
    const allStops = Array.from(new Set([...RIDE_DATA.routeGo, ...RIDE_DATA.routeBack]));
    allStops.forEach(stop => {
      const coords = STOP_COORDS[stop];
      if (coords) {
        L.circleMarker(coords, {
          radius: 6,
          fillColor: '#ffffff',
          color: '#1e293b',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(mapRef.current!)
          .bindPopup(`<b class="text-slate-900">${stop}</b>`);
      }
    });

    // Fit bounds
    const group = L.featureGroup([goLine, backLine]);
    mapRef.current.fitBounds(group.getBounds().pad(0.1));

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative glass-panel rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
         <div className="px-3 py-1 bg-blue-600/90 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">Outbound (Go)</div>
         <div className="px-3 py-1 bg-orange-600/90 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">Return (Back)</div>
      </div>
      <div ref={mapContainerRef} className="h-[500px] w-full" />
    </div>
  );
};

export default InteractiveMap;
