import React, { useState } from 'react';

const BathroomForm = ({ onSave }) => {
  const [vanityScope, setVanityScope] = useState('Faces Only');
  const [faucetType, setFaucetType] = useState('Single Handle');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      location: 'Bathroom Vanity',
      width: faucetType,
      height: 'N/A',
      notes: `Scope: ${vanityScope}`
    });
  };

  return (
    <div className="bg-white p-5 rounded shadow border-l-8 border-teal-500">
      <h3 className="font-bold text-xl mb-4">🛁 Bathrooms</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-xs font-bold text-gray-500 uppercase">Vanity Scope</label>
        <select value={vanityScope} className="w-full p-3 border-2 rounded" onChange={(e) => setVanityScope(e.target.value)}>
          <option>Faces Only</option>
          <option>New Cabinet</option>
        </select>
        <label className="text-xs font-bold text-gray-500 uppercase">Faucet Configuration</label>
        <select value={faucetType} className="w-full p-3 border-2 rounded" onChange={(e) => setFaucetType(e.target.value)}>
          <option>Single Handle</option>
          <option>Centerset</option>
          <option>Widespread</option>
        </select>
        <button type="submit" className="w-full bg-teal-600 text-white p-4 rounded-xl font-black shadow-lg uppercase">SAVE BATHROOM DATA</button>
      </form>
    </div>
  );
};

export default BathroomForm;
