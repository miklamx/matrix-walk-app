import React, { useState } from 'react';

const KitchenForm = ({ onSave }) => {
  const [w, setW] = useState('');
  const [h, setH] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSave({ location: 'Kitchen Fridge', width: w, height: h, notes: 'Vite Refresh' });
    setW(''); setH('');
  };

  return (
    <form onSubmit={submit} style={{ background: '#fff', padding: '15px', borderLeft: '5px solid orange', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h4>🍳 Kitchen</h4>
      <input type="text" placeholder="Width" value={w} onChange={e => setW(e.target.value)} style={{ width: '40%', marginRight: '5%' }} />
      <input type="text" placeholder="Height" value={h} onChange={e => setH(e.target.value)} style={{ width: '40%' }} />
      <button type="submit" style={{ width: '100%', marginTop: '10px', background: 'orange', border: 'none', padding: '10px', color: 'white', fontWeight: 'bold' }}>SAVE KITCHEN</button>
    </form>
  );
};

export default KitchenForm;
