import React, { useState } from 'react';
import KitchenForm from './KitchenForm.jsx';

function App() {
  const [walkData, setWalkData] = useState([]);
  const [status, setStatus] = useState('Connected');
  const GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbyfnVxpFXMVrqd39j-WhCLr9O-pUMPocPv3snk5RHv4sAFBFhlIluTIT1d4iszeKcv0xg/exec';

  const handleSave = async (data) => {
    setWalkData(prev => [...prev, data]);
    setStatus('Saving...');
    try {
      await fetch(GOOGLE_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
      });
      setStatus('Saved!');
      setTimeout(() => setStatus('Connected'), 2000);
    } catch (e) {
      setStatus('Error');
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1e3a8a', textAlign: 'center' }}>Full Stack Customs</h1>
      <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', background: '#fff' }}>
        <strong>Matrix Walk Live</strong>
        <span style={{ color: 'green', fontWeight: 'bold' }}>● {status}</span>
      </div>
      <KitchenForm onSave={handleSave} />
      <div style={{ marginTop: '30px', borderTop: '3px solid #1e3a8a', paddingTop: '10px' }}>
        <h3>Session Log (W × H)</h3>
        {walkData.map((item, i) => (
          <div key={i} style={{ padding: '10px', background: '#fff', border: '1px solid #eee', borderRadius: '5px', marginBottom: '10px' }}>
            <div style={{ fontWeight: 'bold', color: '#1e3a8a' }}>{item.location}</div>
            <div>{item.width} × {item.height}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
