import React, { useState } from 'react';
import KitchenForm from './KitchenForm';
import BathroomForm from './BathroomForm';
import SystemsForm from './SystemsForm';
import StructuralForm from './StructuralForm';

function App() {
  const [walkData, setWalkData] = useState([]);
  const [status, setStatus] = useState('Connected');

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJRzqHbAOmX7FSt88NLqq0_np4T7Ux5MBg7hGzRPZwiPbZkHMbbm49nmcAR9evpguDrg/exec';

  const handleSaveItem = async (details) => {
    const newItem = {
      location: details.location || 'General',
      width: details.width || '0',
      height: details.height || '0',
      notes: details.notes || ''
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      setWalkData(prev => [...prev, newItem]);
      setStatus('Saved!');
      setTimeout(() => setStatus('Connected'), 2000);
    } catch (error) {
      console.error("Save Error:", error);
      setStatus('Error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen font-sans">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900 text-center">Full Stack Customs</h1>
        <div className="flex justify-between items-center bg-white p-3 rounded shadow-sm border mt-2">
          <span className="font-semibold">Matrix Walk Live</span>
          <span className="text-green-600 font-bold">● {status}</span>
        </div>
      </header>

      <div className="space-y-6">
        <KitchenForm onSave={handleSaveItem} />
        <BathroomForm onSave={handleSaveItem} />
        <SystemsForm onSave={handleSaveItem} />
        <StructuralForm onSave={handleSaveItem} />
      </div>

      <div className="mt-8 p-4 bg-white rounded shadow-inner border">
        <h2 className="font-bold border-b mb-3">Running List (W × H)</h2>
        {walkData.length === 0 ? <p className="text-gray-400 italic text-sm">No measurements yet.</p> : (
          <ul className="text-sm space-y-1">
            {walkData.map((item, index) => (
              <li key={index} className="border-b pb-1 last:border-0">
                <strong>{item.location}:</strong> {item.width} × {item.height}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
