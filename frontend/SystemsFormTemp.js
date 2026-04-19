import React, { useState } from 'react';

const SystemsForm = ({ onSave }) => {
  const [specs, setSpecs] = useState({
    system_type: 'Water Heater',
    fuel_source: 'Gas',
    capacity_gallons: '40',
    recovery_type: 'Standard',
    connection_style: 'SharkBite',
    laundry_vented: true
  });

  return (
    <div className="space-y-8 pb-24 text-white">
      {/* Water Heater Section */}
      <section className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-inner">
        <h3 className="text-blue-400 font-bold mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
          <span>🔥</span> Water Heater Specs
        </h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Fuel Source</span>
            <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
              <button 
                onClick={() => setSpecs({...specs, fuel_source: 'Gas'})}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${specs.fuel_source === 'Gas' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'}`}
              >
                GAS
              </button>
              <button 
                onClick={() => setSpecs({...specs, fuel_source: 'Electric'})}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${specs.fuel_source === 'Electric' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'}`}
              >
                ELEC
              </button>
            </div>
          </div>

          {specs.fuel_source === 'Gas' && (
            <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <p className="text-xs text-orange-300 leading-tight">
                <strong>Regional Compliance:</strong> Ultra Low NOx Burner will be automatically specified for this Gas unit.
              </p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Capacity (Gal)</span>
            <select 
              className="bg-gray-900 p-3 rounded-xl border border-gray-700 text-white w-24"
              value={specs.capacity_gallons}
              onChange={(e) => setSpecs({...specs, capacity_gallons: e.target.value})}
            >
              <option>30</option>
              <option>40</option>
              <option>50</option>
              <option>75</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">Connector Style</span>
            <select 
              className="bg-gray-900 p-3 rounded-xl border border-gray-700 text-white"
              value={specs.connection_style}
              onChange={(e) => setSpecs({...specs, connection_style: e.target.value})}
            >
              <option>SharkBite</option>
              <option>ProPress Copper</option>
              <option>Flex Hose</option>
            </select>
          </div>
        </div>
      </section>

      {/* Laundry Section */}
      <section className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
        <h3 className="text-blue-400 font-bold mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
          <span>🧺</span> Laundry Setup
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-medium">Vented Outlet?</span>
          <button 
            onClick={() => setSpecs({...specs, laundry_vented: !specs.laundry_vented})}
            className={`w-20 py-2 rounded-full font-black text-xs transition-all border-2 ${specs.laundry_vented ? 'bg-green-600/20 border-green-500 text-green-400' : 'bg-red-600/20 border-red-500 text-red-400'}`}
          >
            {specs.laundry_vented ? 'YES' : 'NO'}
          </button>
        </div>
      </section>

      <button 
        onClick={() => onSave(specs)}
        className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-tighter shadow-2xl active:scale-[0.98] transition-transform"
      >
        Save System Data
      </button>
    </div>
  );
};

export default SystemsForm;
