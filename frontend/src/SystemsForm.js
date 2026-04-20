import React, { useState } from 'react';

const SystemsForm = ({ onSave }) => {
  const [fuel, setFuel] = useState('GAS');
  const [capacity, setCapacity] = useState('40 Gal');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      location: `System: Water Heater (${fuel})`,
      width: capacity,
      height: 'N/A',
      notes: 'Mechanical Check'
    });
  };

  return (
    <div className="bg-white p-5 rounded shadow border-l-8 border-blue-500">
      <h3 className="font-bold text-xl mb-4">⚙️ Systems</h3>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setFuel('GAS')} className={`flex-1 p-3 rounded font-bold ${fuel === 'GAS' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>GAS</button>
          <button onClick={() => setFuel('ELEC')} className={`flex-1 p-3 rounded font-bold ${fuel === 'ELEC' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>ELEC</button>
        </div>
        <select value={capacity} className="w-full p-3 border-2 rounded" onChange={(e) => setCapacity(e.target.value)}>
          <option>40 Gal</option>
          <option>50 Gal</option>
          <option>Tankless</option>
        </select>
        <button onClick={handleSubmit} className="w-full bg-blue-700 text-white p-4 rounded-xl font-black shadow-lg uppercase">SAVE SYSTEM DATA</button>
      </div>
    </div>
  );
};

export default SystemsForm;
