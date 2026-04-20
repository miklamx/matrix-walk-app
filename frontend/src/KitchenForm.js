import React, { useState } from 'react';

const KitchenForm = ({ onSave }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [scope, setScope] = useState('Faces Only');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      location: 'Kitchen Refrigerator',
      width: width || '0',
      height: height || '0',
      notes: `Scope: ${scope}`
    });
    // Clear the inputs after saving
    setWidth('');
    setHeight('');
  };

  return (
    <div className="bg-white p-5 rounded shadow border-l-8 border-orange-500">
      <h3 className="font-bold text-xl mb-4">🍳 Kitchen</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Width</label>
            <input type="text" value={width} className="w-full p-3 border-2 rounded focus:border-orange-500" onChange={(e) => setWidth(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Height</label>
            <input type="text" value={height} className="w-full p-3 border-2 rounded focus:border-orange-500" onChange={(e) => setHeight(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Cabinetry Scope</label>
          <select value={scope} className="w-full p-3 border-2 rounded bg-gray-50" onChange={(e) => setScope(e.target.value)}>
            <option>Faces Only</option>
            <option>Full Install</option>
            <option>Refinish</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white p-4 rounded-xl font-black shadow-lg uppercase">SAVE KITCHEN DATA</button>
      </form>
    </div>
  );
};

export default KitchenForm;
