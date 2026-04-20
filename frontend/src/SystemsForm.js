import React, { useState } from 'react';

const SystemsForm = ({ onSave }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      location: `System: ${type}`,
      width: width,
      height: height,
      notes: 'Mechanical/Plumbing'
    });
    setWidth(''); setHeight(''); setType('');
  };

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-blue-400">
      <h3 className="font-bold text-lg mb-2">⚙️ Systems</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="System Type (WH, HVAC)" value={type} className="w-full p-2 border rounded" onChange={(e) => setType(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Width" value={width} className="p-2 border rounded" onChange={(e) => setWidth(e.target.value)} />
          <input type="text" placeholder="Height" value={height} className="p-2 border rounded" onChange={(e) => setHeight(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded font-bold">SAVE SYSTEMS</button>
      </form>
    </div>
  );
};

export default SystemsForm;
