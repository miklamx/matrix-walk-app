import React, { useState } from 'react';
import KitchenForm from './KitchenForm';
import BathroomForm from './BathroomForm';
import SystemsForm from './SystemsForm';
import StructuralForm from './StructuralForm';

const MatrixWalkUI = () => {
  const [activeRoom, setActiveRoom] = useState('Overview');
  const [isSaving, setIsSaving] = useState(false);
  
  // POINTING TO YOUR LIVE ENGINE
  const API_BASE_URL = "https://matrix-walk-app.onrender.com";

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      // Logic: Sending data to the specific inspection record (defaulting to ID 1 for now)
      const response = await fetch(`${API_BASE_URL}/inspections/1/room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_type: activeRoom,
          data: formData
        }),
      });

      if (response.ok) {
        console.log(`Successfully saved ${activeRoom}`);
        setActiveRoom('Overview');
      } else {
        alert("Server received the data but failed to save. Check database connection.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Cannot reach the backend. Ensure Render is 'Live'.");
    } finally {
      setIsSaving(false);
    }
  };

  const rooms = [
    { name: 'Entry', icon: '🚪' },
    { name: 'Kitchen', icon: '🍳' },
    { name: 'Bathrooms', icon: '🛁' },
    { name: 'Systems', icon: '⚙️' },
    { name: 'Structural', icon: '🏠' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <header className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
            Full Stack <span className="text-blue-500">Customs</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Matrix Walk Live</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700">
          <span className={`w-2 h-2 rounded-full ${isSaving ? 'bg-yellow-500 animate-ping' : 'bg-green-500 animate-pulse'}`}></span>
          <span className="text-gray-300 text-[10px] font-black uppercase tracking-widest">
            {isSaving ? 'Saving...' : 'Connected'}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 max-w-md mx-auto mb-32">
        {activeRoom === 'Overview' ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {rooms.map((room) => (
              <button 
                key={room.name}
                onClick={() => setActiveRoom(room.name)}
                className="bg-gray-900 aspect-square rounded-[2rem] border border-gray-800 active:scale-90 transition-all duration-200 text-center shadow-2xl flex flex-col items-center justify-center group hover:border-blue-500"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{room.icon}</div>
                <div className="font-black text-gray-400 uppercase text-[10px] tracking-widest">{room.name}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={() => setActiveRoom('Overview')}
              className="text-blue-500 mb-8 flex items-center gap-2 font-black text-xs uppercase tracking-widest"
            >
              <span className="text-lg">←</span> Back to Menu
            </button>
            
            <div className="mb-10">
              <h2 className="text-5xl font-black text-white tracking-tighter">{activeRoom}</h2>
              <div className="h-1.5 w-12 bg-blue-600 mt-2 rounded-full"></div>
            </div>
            
            {activeRoom === 'Kitchen' && <KitchenForm onSave={handleSave} />}
            {activeRoom === 'Bathrooms' && <BathroomForm onSave={handleSave} />}
            {activeRoom === 'Systems' && <SystemsForm onSave={handleSave} />}
            {activeRoom === 'Structural' && <StructuralForm onSave={handleSave} />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-950 via-gray-950 to-transparent pt-20">
        <div className="max-w-md mx-auto">
          <button 
            className="w-full bg-blue-600 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-transform"
            onClick={async () => {
                const res = await fetch(`${API_BASE_URL}/inspections/1/finalize`);
                const summary = await res.json();
                console.log("FINAL SUMMARY:", summary);
                alert("Matrix Walk Finalized. Summary generated in logs.");
            }}
          >
            Finalize Walk
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MatrixWalkUI;
