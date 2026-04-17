import React, { useState } from 'react';
import KitchenForm from './KitchenForm'; // Importing your new form

const MatrixWalkUI = () => {
  const [activeRoom, setActiveRoom] = useState('Overview');
  
  const handleSave = (data) => {
    console.log("Saving data for:", activeRoom, data);
    // This is where the UI sends data to your backend server.js
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
        <h1 className="text-xl font-bold tracking-tight text-blue-400">Full Stack Customs</h1>
        <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded">Live Sync</span>
      </header>

      <main className="p-4">
        {activeRoom === 'Overview' ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {rooms.map((room) => (
              <button 
                key={room.name}
                onClick={() => setActiveRoom(room.name)}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all text-center"
              >
                <div className="text-3xl mb-2">{room.icon}</div>
                <div className="font-semibold">{room.name}</div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setActiveRoom('Overview')}
              className="text-blue-400 mb-4 flex items-center gap-2"
            >
              ← Back to Overview
            </button>
            <h2 className="text-2xl font-bold mb-6">{activeRoom}</h2>
            
            {/* Logic: Show the specific form based on what button was clicked */}
            {activeRoom === 'Kitchen' && <KitchenForm onSave={handleSave} />}
            
            {activeRoom !== 'Kitchen' && (
              <div className="text-gray-500 text-center py-20">
                Form for {activeRoom} coming soon...
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full p-4 bg-gray-900 border-t border-gray-800">
        <button className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg shadow-lg">
          Finalize Matrix Walk
        </button>
      </footer>
    </div>
  );
};

export default MatrixWalkUI;
