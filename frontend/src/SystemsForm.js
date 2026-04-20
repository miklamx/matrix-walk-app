import React, { useState } from 'react';

const SystemsForm = ({ onSave }) => {
  const [capacity, setCapacity] = useState('40 Gal');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      location: 'Water Heater',
      width: capacity,
      height: 'N/A',
      notes: 'Mechanical Compliance'
    });
  };

  return (
    <div className="bg-white p-5 rounded shadow border-l-8 border-blue-500">
      <h3 className="font-bold text-xl mb-4">⚙️ Systems</h3>
      <select value={capacity} className="w-full p-3 border-2 rounded mb-4" onChange={(e) => setCapacity(e.target.value)}>
        <option>40 Gal</option>
        <option>50 Gal</option>
      </select>
      <button onClick={handleSubmit} className="w-full bg-blue-700 text-white p-4 rounded-xl font-black uppercase shadow-lg">Save System Data</button>
    </div>
  );
};

export default SystemsForm;
