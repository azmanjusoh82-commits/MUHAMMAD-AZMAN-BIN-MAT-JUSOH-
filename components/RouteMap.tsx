
import React from 'react';
import { ICONS } from '../constants';

interface RouteMapProps {
  stops: string[];
  title: string;
  color: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ stops, title, color }) => {
  return (
    <div className="relative p-6 glass-panel rounded-2xl overflow-hidden">
      <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
        {ICONS.Road} {title}
      </h3>
      
      <div className="relative flex flex-col space-y-12 pl-8">
        {/* Animated Line */}
        <div className={`absolute left-[13px] top-4 bottom-4 w-1 bg-gradient-to-b ${color} opacity-30 rounded-full`}></div>
        
        {stops.map((stop, index) => (
          <div key={index} className="relative flex items-center group">
            <div className={`absolute left-[-26px] w-5 h-5 rounded-full border-4 border-slate-900 ${color.replace('from-', 'bg-').split(' ')[0]} z-10 shadow-lg shadow-orange-500/20 group-hover:scale-125 transition-transform`}></div>
            <div className="flex flex-col">
              <span className="text-lg font-bold group-hover:text-orange-400 transition-colors">{stop}</span>
              <span className="text-xs text-slate-400 uppercase tracking-tighter">
                {index === 0 ? 'Starting Point' : index === stops.length - 1 ? 'Final Destination' : `Checkpoint ${index}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteMap;
