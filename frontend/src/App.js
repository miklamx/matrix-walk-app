import React, { useState } from 'react';
import KitchenForm from './KitchenForm';
import BathroomForm from './BathroomForm';
import SystemsForm from './SystemsForm';
import StructuralForm from './StructuralForm';

function App() {
  const [walkData, setWalkData] = useState([]);
  const [status, setStatus] = useState('Connected');

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJRzqHbAOmX7FSt88NLqq0_np4T7Ux5MBg7hGzRPZwiPbZkHMbbm49nmcAR9evpguDrg/exec';

  const handleSaveItem = async (type, details) => {
    const newItem = {
      location: details.location || type,
      width: details.width || '0',
      height: details.height || '0',
      notes: details.notes || ''
    };

    try {
      // Send directly to Google Sheets
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      setWalkData([...walkData, newItem]);
      console.log("Data sent to Sheet!");
    } catch (error) {
      console.error("Error saving to Sheet:", error);
      setStatus('Error Saving');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Full Stack Customs</h1>
        <div className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
          <span className="font-semibold text-gray-700">Matrix Walk Live</span>
          <span className="text-green-600 text-sm">● {status}</span>
        </div>
      </header>

      <div className="space-y-6">
        <KitchenForm onSave={(data) => handleSaveItem('Kitchen', data)} />
        <BathroomForm onSave={(data) => handleSaveItem('Bathroom', data)} />
        <SystemsForm onSave={(data) => handleSaveItem('Systems', data)} />
        <StructuralForm onSave={(data) => handleSaveItem('Structural', data)} />
      </div>

      <div className="mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="font-bold mb-2">Current Walk List</h2>
        {walkData.length === 0 ? <p className="text-gray-500 italic">No items recorded yet.</p> : (
          <ul className="divide-y">
            {walkData.map((item, index) => (
              <li key={index} className="py-2 text-sm">
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
