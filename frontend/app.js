import React, { useState } from 'react';
import KitchenForm from './KitchenForm';
import BathroomForm from './BathroomForm';
import SystemsForm from './SystemsForm'; // New Import

const MatrixWalkUI = () => {
  const [activeRoom, setActiveRoom] = useState('Overview');
  
  const handleSave = (data) => {
    console.log("Saving data for:", activeRoom, data);
    setActiveRoom('Overview');
  };

  const rooms = [
    { name: 'Entry', icon: '🚪' },
    { name: 'Kitchen', icon: '🍳' },
    { name: 'Bathrooms', icon: '🛁' },
    { name: 'Systems', icon: '⚙️' },
    { name: 'Structural', icon: '🏠' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-blue-400 uppercase italic">Full Stack Customs</h1>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Active Link</span>
        </div>
      </header>

      <main className="p-4 mb-24">
        {activeRoom === 'Overview' ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {rooms.map((room) => (
              <button 
                key={room.name}
                onClick={() => setActiveRoom(room.name)}
                className="bg-gray-800 p-8 rounded-3xl border border-gray-700 active:scale-90 transition-all text-center shadow-xl"
              >
                <div className="text-5xl mb-4">{room.icon}</div>
                <div className="font-black text-gray-100 uppercase text-xs tracking-widest">{room.name}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button 
              onClick={() => setActiveRoom('Overview')}
              className="text-blue-500 mb-6 flex items-center gap-2 font-black text-sm uppercase"
            >
              ← Back
            </button>
            
            <h2 className="text-4xl font-black mb-8 text-white tracking-tighter">{activeRoom}</h2>
            
            {activeRoom === 'Kitchen' && <KitchenForm onSave={handleSave} />}
            {activeRoom === 'Bathrooms' && <BathroomForm onSave={handleSave} />}
            {activeRoom === 'Systems' && <SystemsForm onSave={handleSave} />}
            
            {activeRoom !== 'Kitchen' && activeRoom !== 'Bathrooms' && activeRoom !== 'Systems' && (
              <div className="bg-gray-800/50 border border-dashed border-gray-700 rounded-3xl py-20 text-center">
                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Awaiting Structural Logic</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/90 backdrop-blur-xl border-t border-gray-800 z-50">
        <button 
          className="w-full bg-blue-600 py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl active:scale-95 transition-transform"
          onClick={() => alert("Reviewing all unit data...")}
        >
          Finalize Walk
        </button>
      </footer>
    </div>
  );
};

export default MatrixWalkUI;
