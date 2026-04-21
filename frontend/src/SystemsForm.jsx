import React, { useState } from 'react';

const SystemsForm = ({ onSave }) => {
  const [fuel, setFuel] = useState('GAS');
  const [cap, setCap] = useState('40 Gal');

  const submit = (e) => {
    e.preventDefault();
    onSave({ 
      location: `WH - ${fuel}`, 
      width: cap, 
      height: 'N/A', 
      notes: 'Mechanical Check' 
    });
  };

  return (
    <div style={{ background: '#fff', padding: '15px', borderLeft: '8px solid #3b82f6', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>⚙️ Systems</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button onClick={() => setFuel('GAS')} style={{ flex: 1, padding: '10px', background: fuel === 'GAS' ? '#3b82f6' : '#eee', color: fuel === 'GAS' ? 'white' : '#333', border: 'none', borderRadius: '4px' }}>GAS</button>
        <button onClick={() => setFuel('ELEC')} style={{ flex: 1, padding: '10px', background: fuel === 'ELEC' ? '#3b82f6' : '#eee', color: fuel === 'ELEC' ? 'white' : '#333', border: 'none', borderRadius: '4px' }}>ELEC</button>
      </div>
      <select value={cap} onChange={e => setCap(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
        <option>40 Gal</option>
        <option>50 Gal</option>
      </select>
      <button onClick={submit} style={{ width: '100%', background: '#1d4ed8', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold' }}>SAVE SYSTEM</button>
    </div>
  );
};

export default SystemsForm;
