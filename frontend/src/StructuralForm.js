import React, { useState } from 'react';

const StructuralForm = ({ onSave }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      location: `Structural: ${desc}`,
      width: width,
      height: height,
      notes: 'Door/Window/Lock'
    });
    setWidth(''); setHeight(''); setDesc('');
  };

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-gray-600">
      <h3 className="font-bold text-lg mb-2">🏠 Structural</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Item (Door, Blind, Lock)" value={desc} className="w-full p-2 border rounded" onChange={(e) => setDesc(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Width" value={width} className="p-2 border rounded" onChange={(e) => setWidth(e.target.value)} />
          <input type="text" placeholder="Height" value={height} className="p-2 border rounded" onChange={(e) => setHeight(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-gray-700 text-white p-2 rounded font-bold">SAVE STRUCTURAL</button>
      </form>
    </div>
  );
};

export default StructuralForm;
