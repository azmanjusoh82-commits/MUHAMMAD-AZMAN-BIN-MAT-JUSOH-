
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { RIDE_DATA, STOP_COORDS, ICONS } from '../constants';

const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false
    }).setView([3.7, 102.1], 8);

    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(mapRef.current);

    // Styling
    const outboundStyle = { color: '#3b82f6', weight: 4, dashArray: '8, 12', opacity: 0.8 };
    const returnStyle = { color: '#f97316', weight: 4, opacity: 0.6 };

    // Outbound Route
    const goCoords = RIDE_DATA.routeGo.map(stop => STOP_COORDS[stop]).filter(c => c !== undefined);
    const goLine = L.polyline(goCoords, outboundStyle).addTo(mapRef.current);
    
    // Return Route
    const backCoords = RIDE_DATA.routeBack.map(stop => STOP_COORDS[stop]).filter(c => c !== undefined);
    const backLine = L.polyline(backCoords, returnStyle).addTo(mapRef.current);

    // Markers
    const allStops = Array.from(new Set([...RIDE_DATA.routeGo, ...RIDE_DATA.routeBack]));
    allStops.forEach(stop => {
      const coords = STOP_COORDS[stop];
      if (coords) {
        const isTarget = stop === 'Jerantut';
        L.circleMarker(coords, {
          radius: isTarget ? 8 : 5,
          fillColor: isTarget ? '#f97316' : '#ffffff',
          color: '#020617',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        }).addTo(mapRef.current!)
          .bindPopup(`
            <div class="p-2 font-sans">
              <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Waypoint</div>
              <div class="text-lg font-bold text-slate-900">${stop}</div>
            </div>
          `, { className: 'custom-popup' });
      }
    });

    // Fit bounds
    const group = L.featureGroup([goLine, backLine]);
    mapRef.current.fitBounds(group.getBounds().pad(0.1));

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      mapRef.current?.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative glass-panel rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group">
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
         <div className="px-4 py-2 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/5 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Outbound: Setapak &rarr; Jerantut</span>
         </div>
         <div className="px-4 py-2 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/5 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Return: Jerantut &rarr; Setapak</span>
         </div>
      </div>
      
      <div className="absolute bottom-6 left-6 z-[1000] glass-panel px-4 py-3 rounded-2xl border border-white/10 hidden md:block">
        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Convoy Speed Goal</div>
        <div className="text-xl font-bold text-white font-oswald">90 - 110 KM/H</div>
      </div>

      <div ref={mapContainerRef} className="h-[600px] w-full" />
    </div>
  );
};

export default InteractiveMap;
