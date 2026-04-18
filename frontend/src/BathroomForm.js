import React, { useState } from 'react';

const BathroomForm = ({ onSave }) => {
  const [specs, setSpecs] = useState({
    vanity_scope: 'Faces Only',
    faucet_style: 'Single Handle',
    supply_line_nut: 'Standard',
    valve_replacement: false,
    tub_shoe_required: false
  });

  return (
    <div className="space-y-8 pb-24 text-white">
      {/* Vanity & Hardware */}
      <section className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-blue-400 font-bold mb-4 uppercase text-sm tracking-widest">Vanity & Faucet</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Vanity Scope</span>
            <select 
              className="bg-gray-900 p-2 rounded border border-gray-700"
              onChange={(e) => setSpecs({...specs, vanity_scope: e.target.value})}
            >
              <option>Faces Only</option>
              <option>Full Replacement</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Faucet Type</span>
            <select 
              className="bg-gray-900 p-2 rounded border border-gray-700"
              onChange={(e) => setSpecs({...specs, faucet_style: e.target.value})}
            >
              <option>Single Handle</option>
              <option>Double Handle</option>
            </select>
          </div>
        </div>
      </section>

      {/* Plumbing Specs */}
      <section className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-blue-400 font-bold mb-4 uppercase text-sm tracking-widest">Plumbing Hardware</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Supply Nut Style</span>
            <select 
              className="bg-gray-900 p-2 rounded border border-gray-700 text-orange-400 font-bold"
              onChange={(e) => setSpecs({...specs, supply_line_nut: e.target.value})}
            >
              <option>Standard</option>
              <option>Large Thumb Screw</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center border-t border-gray-700 pt-4">
            <span className="text-gray-300">Full Valve Replacement?</span>
            <button 
              onClick={() => setSpecs({...specs, valve_replacement: !specs.valve_replacement})}
              className={`px-4 py-2 rounded font-bold ${specs.valve_replacement ? 'bg-red-600' : 'bg-gray-700'}`}
            >
              {specs.valve_replacement ? 'YES' : 'NO'}
            </button>
          </div>
        </div>
      </section>

      <button 
        onClick={() => onSave(specs)}
        className="w-full bg-blue-600 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20"
      >
        Save Bathroom Data
      </button>
    </div>
  );
};

export default BathroomForm;
