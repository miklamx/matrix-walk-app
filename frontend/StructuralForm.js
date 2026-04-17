import React, { useState } from 'react';

const StructuralForm = ({ onSave }) => {
  const [specs, setSpecs] = useState({
    item_type: 'Door',
    door_style: '6-Panel',
    is_slab: true,
    machining_needed: true,
    lock_finish: 'Brushed Nickel',
    latch_type: 'Drive-in',
    blind_mount: 'Inside'
  });

  return (
    <div className="space-y-8 pb-24 text-white">
      {/* Doors & Machining */}
      <section className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
        <h3 className="text-blue-400 font-bold mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
          <span>🚪</span> Doors & Millwork
        </h3>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Style</span>
            <select 
              className="bg-gray-900 p-3 rounded-xl border border-gray-700 text-white"
              onChange={(e) => setSpecs({...specs, door_style: e.target.value})}
            >
              <option>6-Panel</option>
              <option>2-Panel</option>
              <option>Flush (Slab)</option>
            </select>
          </div>
          <div className="flex justify-between items-center border-t border-gray-700 pt-4">
            <span className="text-gray-300 font-medium">Machining Required?</span>
            <button 
              onClick={() => setSpecs({...specs, machining_needed: !specs.machining_needed})}
              className={`w-20 py-2 rounded-full font-black text-xs transition-all border-2 ${specs.machining_needed ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
            >
              {specs.machining_needed ? 'YES' : 'NO'}
            </button>
          </div>
        </div>
      </section>

      {/* Locksets */}
      <section className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
        <h3 className="text-blue-400 font-bold mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
          <span>🔐</span> Locksets
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Latch Style</span>
            <select 
              className="bg-gray-900 p-3 rounded-xl border border-gray-700 text-white"
              onChange={(e) => setSpecs({...specs, latch_type: e.target.value})}
            >
              <option>Drive-in</option>
              <option>Square Corner</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Finish</span>
            <select 
              className="bg-gray-900 p-3 rounded-xl border border-gray-700 text-white"
              onChange={(e) => setSpecs({...specs, lock_finish: e.target.value})}
            >
              <option>Brushed Nickel</option>
              <option>Matte Black</option>
              <option>Polished Brass</option>
            </select>
          </div>
        </div>
      </section>

      {/* Blinds */}
      <section className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
        <h3 className="text-blue-400 font-bold mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
          <span>🪟</span> Window Blinds
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-medium">Mount Style</span>
          <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
            <button 
              onClick={() => setSpecs({...specs, blind_mount: 'Inside'})}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${specs.blind_mount === 'Inside' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
            >
              INSIDE
            </button>
            <button 
              onClick={() => setSpecs({...specs, blind_mount: 'Outside'})}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${specs.blind_mount === 'Outside' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
            >
              OUTSIDE
            </button>
          </div>
        </div>
      </section>

      <button 
        onClick={() => onSave(specs)}
        className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-transform active:scale-95"
      >
        Save Structural Data
      </button>
    </div>
  );
};

export default StructuralForm;
