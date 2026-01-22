
import React, { useState, useEffect } from 'react';
import { RIDE_DATA, BIKE_SPECS, ICONS } from './constants';
import { getRideItinerary } from './services/geminiService';
import Countdown from './components/Countdown';
import RouteMap from './components/RouteMap';
import InteractiveMap from './components/InteractiveMap';

const App: React.FC = () => {
  const [itineraryData, setItineraryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getRideItinerary(RIDE_DATA);
      setItineraryData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-slate-950 text-slate-100 selection:bg-orange-500/30">
      {/* Enhanced Hero Header */}
      <header className="relative min-h-screen flex flex-col items-center justify-start pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30"
            alt="Motorcycle background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl w-full">
          <div className="inline-block px-4 py-1 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-400 text-sm font-bold tracking-widest uppercase mb-6 animate-pulse">
            Upcoming Expedition
          </div>
          <h1 className="text-6xl md:text-8xl font-bold font-oswald mb-4 uppercase tracking-tighter">
            Setapak <span className="text-orange-500">Jerantut</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate underbone tour featuring the <span className="font-bold text-white italic">Honda RS150</span> & <span className="font-bold text-white italic">Yamaha Y16</span>.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <Countdown targetDate={RIDE_DATA.date} />
            <div className="flex flex-col items-start gap-1">
              <span className="text-slate-400 uppercase text-xs tracking-widest font-bold">Departure Date</span>
              <span className="text-2xl font-bold flex items-center gap-2">
                {ICONS.Clock} 25 January 2026 @ 06:30 AM
              </span>
            </div>
          </div>

          {/* Motorcycle Specifications Moved Here: Below Departure Date */}
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {BIKE_SPECS.map((bike, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl hover:border-orange-500/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <i className="fa-solid fa-motorcycle text-6xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                   <span className="text-orange-500 text-sm uppercase tracking-widest">Machine {idx + 1}</span> 
                   <span className="group-hover:text-orange-400 transition-colors">{bike.model}</span>
                </h3>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                  <div className="flex flex-col">
                    <span className="text-slate-500 uppercase tracking-tighter">Engine</span>
                    <span className="font-medium text-slate-200">{bike.engine}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 uppercase tracking-tighter">Power</span>
                    <span className="font-medium text-slate-200">{bike.power}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 uppercase tracking-tighter">Fuel Tank</span>
                    <span className="font-medium text-slate-200">{bike.fuelCapacity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 uppercase tracking-tighter">Weight</span>
                    <span className="font-medium text-slate-200">{bike.weight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 -mt-10">
        
        {/* Interactive Map Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-2 bg-blue-500 rounded-full"></div>
            <h2 className="text-3xl font-bold uppercase font-oswald tracking-wide">Interactive Route Navigation</h2>
          </div>
          <InteractiveMap />
        </section>

        {/* Routes Step-by-Step */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-2 bg-slate-500 rounded-full"></div>
            <h2 className="text-3xl font-bold uppercase font-oswald tracking-wide">The Waypoints</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <RouteMap 
              title="Outbound: Setapak to Jerantut" 
              stops={RIDE_DATA.routeGo} 
              color="from-blue-500 to-cyan-400" 
            />
            <RouteMap 
              title="Return: Jerantut to Setapak" 
              stops={RIDE_DATA.routeBack} 
              color="from-orange-500 to-red-400" 
            />
          </div>
        </section>

        {/* Fuel Strategy Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-2 bg-yellow-500 rounded-full"></div>
            <h2 className="text-3xl font-bold uppercase font-oswald tracking-wide">Refuelling Strategy</h2>
          </div>

          {loading ? (
             <div className="h-40 glass-panel rounded-3xl animate-pulse flex items-center justify-center">
                <span className="text-slate-500">Analyzing station availability...</span>
             </div>
          ) : itineraryData?.fuelStations ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {itineraryData.fuelStations.map((station: any, idx: number) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl border-t-2 border-yellow-500 group hover:bg-slate-800/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-500">
                      {ICONS.Gas}
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-slate-800 px-2 py-1 rounded text-slate-400">
                      Stop {idx + 1}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{station.brand} {station.location}</h4>
                  <p className="text-xs text-slate-400 mb-3 uppercase tracking-tighter">{station.name}</p>
                  <p className="text-sm text-slate-300 italic">"{station.whyStop}"</p>
                </div>
              ))}
            </div>
          ) : null}
          
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3">
             <span className="text-yellow-500">{ICONS.Warning}</span>
             <p className="text-xs text-yellow-200/80">
               Note: RS150 & Y16 riders should refuel at <span className="font-bold">every suggested stop</span>. Range is limited to ~130km under load.
             </p>
          </div>
        </section>

        {/* Gemini Powered Itinerary & Advice */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-2 bg-emerald-500 rounded-full"></div>
            <h2 className="text-3xl font-bold uppercase font-oswald tracking-wide">Detailed Itinerary (AI Assisted)</h2>
          </div>

          {loading ? (
            <div className="glass-panel p-12 rounded-3xl flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-6"></div>
              <p className="text-lg text-slate-300">Calculating route details, fuel stops, and safety metrics...</p>
            </div>
          ) : itineraryData ? (
            <div className="space-y-8">
              <div className="glass-panel rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="p-6 font-bold uppercase text-sm text-slate-400">Checkpoint</th>
                      <th className="p-6 font-bold uppercase text-sm text-slate-400">Est. Time</th>
                      <th className="p-6 font-bold uppercase text-sm text-slate-400">Distance</th>
                      <th className="p-6 font-bold uppercase text-sm text-slate-400">Activity/Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {itineraryData.itinerary.map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="p-6 font-bold text-lg group-hover:text-orange-400 transition-colors">
                          {item.location}
                        </td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-slate-800 rounded text-orange-300 font-mono">
                            {item.time}
                          </span>
                        </td>
                        <td className="p-6 text-slate-400">
                          {item.distanceFromStart} km
                        </td>
                        <td className="p-6 italic text-slate-300">
                          {item.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-orange-500">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    {ICONS.Warning} Safety Advice
                  </h3>
                  <ul className="space-y-4">
                    {itineraryData.safetyAdvice.map((advice: string, idx: number) => (
                      <li key={idx} className="flex gap-4 items-start text-slate-300">
                        <span className="text-orange-500 font-bold">•</span>
                        {advice}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-emerald-500">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    {ICONS.Tools} Bike Maintenance & Prep
                  </h3>
                  <ul className="space-y-4">
                    {itineraryData.bikeMaintenance.map((tip: string, idx: number) => (
                      <li key={idx} className="flex gap-4 items-start text-slate-300">
                        <span className="text-emerald-500 font-bold">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center text-slate-400">
              Unable to load AI itinerary. Please check your connectivity.
            </div>
          )}
        </section>

      </main>

      {/* Persistent Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 glass-panel border-t border-slate-700/50 flex items-center justify-center z-50">
        <div className="flex gap-12 text-slate-400">
          <button className="hover:text-orange-500 transition-colors flex flex-col items-center">
            <span className="text-xl">{ICONS.Bike}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">Bikes</span>
          </button>
          <button className="text-orange-500 transition-colors flex flex-col items-center scale-110">
            <span className="text-xl">{ICONS.Compass}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">Route</span>
          </button>
          <button className="hover:text-orange-500 transition-colors flex flex-col items-center">
            <span className="text-xl">{ICONS.Gas}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">Fuel</span>
          </button>
          <button className="hover:text-orange-500 transition-colors flex flex-col items-center">
            <span className="text-xl">{ICONS.Tools}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">Prep</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
