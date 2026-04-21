import React, { useState } from 'react';

const KitchenForm = ({ onSave }) => {
  const [w, setW] = useState('');
  const [h, setH] = useState('');
  const [scope, setScope] = useState('Faces Only');

  const submit = (e) => {
    e.preventDefault();
    if(!w || !h) return;
    onSave({ 
      location: 'Kitchen - Fridge', 
      width: w, 
      height: h, 
      notes: `Scope: ${scope}` 
    });
    setW(''); setH('');
  };

  return (
    <form onSubmit={submit} style={{ background: '#fff', padding: '15px', borderLeft: '8px solid #f97316', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>🍳 Kitchen</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input type="text" placeholder="Width" value={w} onChange={e => setW(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input type="text" placeholder="Height" value={h} onChange={e => setH(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
      </div>
      <select value={scope} onChange={e => setScope(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
        <option>Faces Only</option>
        <option>Full Install</option>
      </select>
      <button type="submit" style={{ width: '100%', background: '#f97316', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold' }}>SAVE KITCHEN</button>
    </form>
  );
};

export default KitchenForm;
