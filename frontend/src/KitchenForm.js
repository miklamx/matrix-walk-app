import React, { useState } from 'react';

const KitchenForm = ({ onSave }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [scope, setScope] = useState('Faces Only');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      location: 'Kitchen - Refrigerator',
      width: width || '0',
      height: height || '0',
      notes: `Scope: ${scope}`
    });
    setWidth(''); setHeight('');
  };

  return (
    <div className="bg-white p-5 rounded shadow border-l-8 border-orange-500">
      <h3 className="font-bold text-xl mb-4">🍳 Kitchen</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Width" value={width} className="p-3 border-2 rounded" onChange={(e) => setWidth(e.target.value)} />
          <input type="text" placeholder="Height" value={height} className="p-3 border-2 rounded" onChange={(e) => setHeight(e.target.value)} />
        </div>
        <select value={scope} className="w-full p-3 border-2 rounded" onChange={(e) => setScope(e.target.value)}>
          <option>Faces Only</option>
          <option>Full Install</option>
        </select>
        <button type="submit" className="w-full bg-orange-500 text-white p-4 rounded-xl font-black uppercase shadow-lg">Save Kitchen Data</button>
      </form>
    </div>
  );
};

export default KitchenForm;
