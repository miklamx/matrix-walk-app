import React, { useState } from 'react';
import KitchenForm from './KitchenForm';
import BathroomForm from './BathroomForm'; // New Import

const MatrixWalkUI = () => {
  const [activeRoom, setActiveRoom] = useState('Overview');
  
  const handleSave = (data) => {
    console.log("Saving data for:", activeRoom, data);
    // Logic: In the final step, this will 'fetch' to your server.js
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
      {/* Header */}
      <header className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-blue-400">Full Stack Customs</h1>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-gray-400 text-xs uppercase tracking-widest">Live Sync</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 mb-24">
        {activeRoom === 'Overview' ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {rooms.map((room) => (
              <button 
                key={room.name}
                onClick={() => setActiveRoom(room.name)}
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700 active:scale-95 active:bg-gray-700 transition-all text-center shadow-lg"
              >
                <div className="text-4xl mb-3">{room.icon}</div>
                <div className="font-bold text-gray-200">{room.name}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button 
              onClick={() => setActiveRoom('Overview')}
              className="text-blue-400 mb-6 flex items-center gap-2 font-medium"
            >
              ← Back to Overview
            </button>
            
            <h2 className="text-3xl font-extrabold mb-8 text-white">{activeRoom}</h2>
            
            {/* Dynamic Form Loading */}
            {activeRoom === 'Kitchen' && <KitchenForm onSave={handleSave} />}
            {activeRoom === 'Bathrooms' && <BathroomForm onSave={handleSave} />}
            
            {/* Placeholder for remaining rooms */}
            {activeRoom !== 'Kitchen' && activeRoom !== 'Bathrooms' && (
              <div className="bg-gray-800/50 border border-dashed border-gray-700 rounded-2xl py-20 text-center">
                <p className="text-gray-500 italic">Form for {activeRoom} is being prepared...</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Persistent Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
        <button 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 py-4 rounded-xl font-black text-lg uppercase tracking-wider shadow-xl"
          onClick={() => alert("Finalizing Matrix Walk and generating summary...")}
        >
          Finalize Matrix Walk
        </button>
      </footer>
    </div>
  );
};

export default MatrixWalkUI;
