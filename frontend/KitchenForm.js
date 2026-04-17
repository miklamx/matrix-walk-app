import React, { useState } from 'react';

const KitchenForm = ({ onSave }) => {
  const [specs, setSpecs] = useState({
    fridge_height_front: '',
    fridge_height_back: '',
    fridge_width: '',
    cabinet_scope: 'Faces Only',
    door_style: 'Shaker',
    drawer_style: 'Slab'
  });

  return (
    <div className="space-y-8 pb-24">
      {/* Refrigerator Section */}
      <section className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-blue-400 font-bold mb-4 uppercase text-sm tracking-widest">Refrigerator Opening</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Height (Front)</label>
            <input 
              type="text" 
              placeholder="H" 
              className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-xl"
              onChange={(e) => setSpecs({...specs, fridge_height_front: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Height (Back)</label>
            <input 
              type="text" 
              placeholder="H" 
              className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-xl"
              onChange={(e) => setSpecs({...specs, fridge_height_back: e.target.value})}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Width Opening</label>
            <input 
              type="text" 
              placeholder="W" 
              className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-xl"
              onChange={(e) => setSpecs({...specs, fridge_width: e.target.value})}
            />
          </div>
        </div>
      </section>

      {/* Cabinetry Section */}
      <section className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-blue-400 font-bold mb-4 uppercase text-sm tracking-widest">Cabinetry</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Scope</span>
            <select 
              className="bg-gray-900 p-2 rounded border border-gray-700"
              onChange={(e) => setSpecs({...specs, cabinet_scope: e.target.value})}
            >
              <option>Faces Only</option>
              <option>Full Replacement</option>
            </select>
          </div>
          {specs.cabinet_scope === 'Faces Only' && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded text-sm text-blue-300 italic">
              Defaulted to Shaker doors / Slab drawers
            </div>
          )}
        </div>
      </section>

      <button 
        onClick={() => onSave(specs)}
        className="w-full bg-green-600 py-4 rounded-xl font-bold"
      >
        Save Kitchen Data
      </button>
    </div>
  );
};

export default KitchenForm;
