import React, { useState } from 'react';

const KitchenForm = ({ onSave }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [scope, setScope] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      location: 'Kitchen - Fridge Opening',
      width: width,
      height: height,
      notes: `Scope: ${scope}`
    });
    setWidth(''); setHeight(''); setScope('');
  };

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-orange-400">
      <h3 className="font-bold text-lg mb-2">🍳 Kitchen</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Width" value={width} className="p-2 border rounded" onChange={(e) => setWidth(e.target.value)} />
          <input type="text" placeholder="Height" value={height} className="p-2 border rounded" onChange={(e) => setHeight(e.target.value)} />
        </div>
        <input type="text" placeholder="Scope (Reface/Install)" value={scope} className="w-full p-2 border rounded" onChange={(e) => setScope(e.target.value)} />
        <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded font-bold">SAVE KITCHEN</button>
      </form>
    </div>
  );
};

export default KitchenForm;
