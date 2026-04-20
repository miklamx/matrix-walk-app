import React, { useState } from 'react';
import KitchenForm from './KitchenForm';
import BathroomForm from './BathroomForm';
import SystemsForm from './SystemsForm';
import StructuralForm from './StructuralForm';

function App() {
  const [walkData, setWalkData] = useState([]);
  const [status, setStatus] = useState('Connected');

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJRzqHbAOmX7FSt88NLqq0_np4T7Ux5MBg7hGzRPZwiPbZkHMbbm49nmcAR9evpguDrg/exec';

  const handleSaveItem = async (newItem) => {
    // Immediately show the data in the running list
    setWalkData(prev => [...prev, newItem]);
    setStatus('Saving...');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      setStatus('Saved!');
      setTimeout(() => setStatus('Connected'), 2000);
    } catch (error) {
      console.error("Save Error:", error);
      setStatus('Error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen font-sans">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-black text-blue-900">Full Stack Customs</h1>
        <div className="flex justify-between items-center bg-white p-3 rounded shadow-sm border mt-4">
          <span className="font-bold">Matrix Walk Live</span>
          <span className="text-green-600 font-bold">● {status}</span>
        </div>
      </header>

      <div className="space-y-8">
        <KitchenForm onSave={handleSaveItem} />
        <BathroomForm onSave={handleSaveItem} />
        <SystemsForm onSave={handleSaveItem} />
        <StructuralForm onSave={handleSaveItem} />
      </div>

      <div className="mt-10 p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-900">
        <h2 className="font-black text-xl mb-4 border-b pb-2 text-blue-900">Session Log (W × H)</h2>
        {walkData.length === 0 ? (
          <p className="text-gray-400 italic">No measurements recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {walkData.map((item, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded border text-sm">
                <div className="font-bold text-blue-800">{item.location}</div>
                <div className="text-lg font-mono">{item.width} × {item.height}</div>
                {item.notes && <div className="text-gray-500 text-xs mt-1 italic">{item.notes}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
