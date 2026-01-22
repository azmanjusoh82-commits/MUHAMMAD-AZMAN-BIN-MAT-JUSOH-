
import React, { useState, useEffect } from 'react';
import { RIDE_DATA, BIKE_SPECS, ICONS } from './constants';
import { getRideItinerary } from './services/geminiService';
import Countdown from './components/Countdown';
import RouteMap from './components/RouteMap';
import InteractiveMap from './components/InteractiveMap';

const App: React.FC = () => {
  const [itineraryData, setItineraryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getRideItinerary(RIDE_DATA);
      setItineraryData(data);
      setLoading(false);
    };
    fetchData();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const checklistItems = [
    { label: "Full Service (Engine Oil & Filter)", category: "Bike" },
    { label: "Chain Tension & Lube", category: "Bike" },
    { label: "Brake Pad Thickness Check", category: "Safety" },
    { label: "Tire Pressure (29-33 PSI)", category: "Performance" },
    { label: "Rain Gear Packaged", category: "Gear" },
    { label: "First Aid Kit", category: "Safety" },
    { label: "Offline Maps Downloaded", category: "Digital" }
  ];

  return (
    <div className="min-h-screen pb-24 bg-slate-950 text-slate-100 selection:bg-orange-500/30">
      {/* Dynamic Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${scrolled ? 'glass-panel bg-slate-950/90' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-oswald font-bold text-2xl tracking-tighter flex items-center gap-2">
            <span className="text-orange-500">{ICONS.Bike}</span> RIDE<span className="text-orange-500">2026</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <button onClick={() => scrollToSection('machines')} className="hover:text-white transition-colors">Machines</button>
            <button onClick={() => scrollToSection('route')} className="hover:text-white transition-colors">Route</button>
            <button onClick={() => scrollToSection('itinerary')} className="hover:text-white transition-colors">Itinerary</button>
            <button onClick={() => scrollToSection('fuel')} className="hover:text-white transition-colors">Fuel</button>
          </div>
          <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-orange-600/20">
            Join Group Chat
          </button>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20"
            alt="Motorcycle journey"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl w-full">
          <div className="inline-block px-4 py-1 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-400 text-[10px] font-bold tracking-widest uppercase mb-8 animate-bounce">
            Expedition Confirmed
          </div>
          <h1 className="text-7xl md:text-9xl font-bold font-oswald mb-6 uppercase tracking-tighter leading-none">
            SETAPAK<br/><span className="text-orange-500">JERANTUT</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-20 bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
            <Countdown targetDate={RIDE_DATA.date} />
            <div className="h-px w-20 bg-slate-800 md:h-12 md:w-px"></div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black">Departure Phase</span>
              <span className="text-2xl font-bold text-white flex items-center gap-3">
                {ICONS.Clock} 25 JAN 2026 @ 06:30
              </span>
            </div>
          </div>

          {/* Motorcycle Specifications Section */}
          <div id="machines" className="grid md:grid-cols-2 gap-8 text-left scroll-mt-32">
            {BIKE_SPECS.map((bike, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-[2rem] hover:border-orange-500/50 transition-all group relative overflow-hidden ring-1 ring-white/5">
                <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-all group-hover:-translate-x-4 group-hover:translate-y-4">
                  <i className="fa-solid fa-motorcycle text-8xl"></i>
                </div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-orange-500 text-[10px] uppercase font-black tracking-[0.3em] block mb-1">Squad Member 0{idx + 1}</span> 
                    <h3 className="text-3xl font-bold group-hover:text-orange-400 transition-colors font-oswald">{bike.model}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
                    {ICONS.Bike}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Drivetrain</span>
                    <span className="text-sm font-semibold text-slate-200">{bike.engine}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Performance</span>
                    <span className="text-sm font-semibold text-slate-200">{bike.power}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Range</span>
                    <span className="text-sm font-semibold text-slate-200">{bike.fuelCapacity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Mass</span>
                    <span className="text-sm font-semibold text-slate-200">{bike.weight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        
        {/* Interactive Map Section */}
        <section id="route" className="mb-24 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-2 bg-blue-500 rounded-full"></div>
              <h2 className="text-4xl font-bold uppercase font-oswald tracking-wide">Route Command</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md">Interactive visual tracking for the 350KM+ round trip from urban Setapak to the gates of Taman Negara.</p>
          </div>
          <InteractiveMap />
        </section>

        {/* Refuelling Strategy */}
        <section id="fuel" className="mb-24 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-2 bg-yellow-500 rounded-full"></div>
            <h2 className="text-4xl font-bold uppercase font-oswald tracking-wide">Refuelling Strategy</h2>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => <div key={i} className="h-48 glass-panel rounded-3xl animate-pulse"></div>)}
             </div>
          ) : itineraryData?.fuelStations ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {itineraryData.fuelStations.map((station: any, idx: number) => (
                <div key={idx} className="glass-panel p-6 rounded-3xl border-b-4 border-yellow-500/30 group hover:border-yellow-500 transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 text-xl border border-yellow-500/20">
                      {ICONS.Gas}
                    </div>
                    <span className="text-[10px] font-black uppercase bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-500 border border-yellow-500/20">
                      Phase {idx + 1}
                    </span>
                  </div>
                  <h4 className="font-bold text-xl mb-1 text-white">{station.brand}</h4>
                  <p className="text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-widest">{station.location}</p>
                  <p className="text-sm text-slate-400 leading-relaxed italic">"{station.whyStop}"</p>
                </div>
              ))}
            </div>
          ) : null}
          
          <div className="mt-8 p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex flex-col md:flex-row md:items-center gap-4">
             <div className="h-10 w-10 shrink-0 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-950 font-bold">!</div>
             <p className="text-sm text-yellow-200/70 leading-relaxed">
               <span className="font-bold text-yellow-500">CRITICAL RANGE ADVISORY:</span> Both RS150 and Y16 are running small-capacity fuel systems. Refuelling at <span className="underline decoration-yellow-500/50 underline-offset-4">every marked station</span> is mandatory to maintain convoy speed and safety.
             </p>
          </div>
        </section>

        {/* AI Itinerary */}
        <section id="itinerary" className="mb-24 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-2 bg-emerald-500 rounded-full"></div>
            <h2 className="text-4xl font-bold uppercase font-oswald tracking-wide">Expedition Log</h2>
          </div>

          {loading ? (
            <div className="glass-panel p-20 rounded-[3rem] flex flex-col items-center justify-center text-center">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-emerald-500">{ICONS.Map}</div>
              </div>
              <p className="mt-8 text-xl font-bold text-slate-200 font-oswald uppercase tracking-widest">Optimizing Route Data</p>
              <p className="text-slate-500 mt-2 max-w-xs">Synching checkpoints and estimating arrival windows for the convoy...</p>
            </div>
          ) : itineraryData ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {itineraryData.itinerary.map((item: any, idx: number) => (
                  <div key={idx} className="glass-panel p-6 rounded-2xl flex items-center gap-6 hover:bg-slate-800/30 transition-all border-l-4 border-l-emerald-500/50 group">
                    <div className="text-center min-w-[80px]">
                      <div className="text-xs font-bold text-emerald-500 uppercase tracking-tighter mb-1">Time</div>
                      <div className="text-xl font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">{item.time}</div>
                    </div>
                    <div className="h-12 w-px bg-slate-800"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-lg text-white">{item.location}</h4>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{item.distanceFromStart} KM</span>
                      </div>
                      <p className="text-sm text-slate-400 italic line-clamp-1 group-hover:line-clamp-none transition-all">{item.notes}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                 <div className="glass-panel p-8 rounded-3xl border-t-4 border-orange-500">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 font-oswald uppercase tracking-wider">
                      {ICONS.Warning} Convoy Safety
                    </h3>
                    <ul className="space-y-4">
                      {itineraryData.safetyAdvice.map((advice: string, idx: number) => (
                        <li key={idx} className="flex gap-4 items-start text-sm text-slate-300">
                          <span className="text-orange-500 text-lg">•</span>
                          {advice}
                        </li>
                      ))}
                    </ul>
                 </div>
                 
                 <div className="glass-panel p-8 rounded-3xl border-t-4 border-emerald-500">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 font-oswald uppercase tracking-wider">
                      {ICONS.Tools} Tech Checklist
                    </h3>
                    <div className="space-y-3">
                      {checklistItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-white/5">
                           <input type="checkbox" className="w-4 h-4 rounded accent-emerald-500 bg-slate-800 border-slate-700" />
                           <div className="flex flex-col">
                             <span className="text-xs font-bold text-slate-100">{item.label}</span>
                             <span className="text-[9px] uppercase tracking-widest text-slate-500">{item.category}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          ) : null}
        </section>

      </main>

      {/* Persistent Dock-style Nav Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="glass-panel px-6 py-3 rounded-full flex items-center gap-10 shadow-2xl border border-white/10 ring-1 ring-white/5">
          {[
            { id: 'machines', icon: ICONS.Bike, label: 'Machines' },
            { id: 'route', icon: ICONS.Compass, label: 'Route' },
            { id: 'itinerary', icon: ICONS.Map, label: 'Logs' },
            { id: 'fuel', icon: ICONS.Gas, label: 'Fuel' }
          ].map((nav) => (
            <button 
              key={nav.id} 
              onClick={() => scrollToSection(nav.id)}
              className="flex flex-col items-center gap-1 group"
            >
              <span className="text-lg text-slate-400 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300">{nav.icon}</span>
              <span className="text-[8px] uppercase font-black tracking-widest text-slate-500 group-hover:text-white transition-colors">{nav.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <footer className="max-w-7xl mx-auto px-8 py-20 text-center text-slate-500">
        <div className="flex justify-center gap-6 mb-8 text-xl">
          <i className="fa-brands fa-instagram hover:text-orange-500 transition-colors cursor-pointer"></i>
          <i className="fa-brands fa-youtube hover:text-orange-500 transition-colors cursor-pointer"></i>
          <i className="fa-brands fa-tiktok hover:text-orange-500 transition-colors cursor-pointer"></i>
        </div>
        <p className="text-[10px] uppercase font-bold tracking-[0.5em] mb-2">Setapak to Jerantut 2026</p>
        <p className="text-[10px] uppercase tracking-widest">&copy; All Rights Reserved. Ride Safe.</p>
      </footer>
    </div>
  );
};

export default App;
