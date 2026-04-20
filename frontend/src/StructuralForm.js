import React, { useState } from 'react';

const StructuralForm = ({ onSave }) => {
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      location: 'Structural/Notes',
      width: 'N/A',
      height: 'N/A',
      notes: notes
    });
    setNotes('');
  };

  return (
    <div className="bg-white p-5 rounded shadow border-l-8 border-gray-700">
      <h3 className="font-bold text-xl mb-4">🏠 Structural</h3>
      <textarea 
        placeholder="Enter door styles, lock configs, or blind mounting details..." 
        value={notes}
        className="w-full p-3 border-2 rounded h-24 mb-4"
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={handleSubmit} className="w-full bg-gray-800 text-white p-4 rounded-xl font-black shadow-lg uppercase">SAVE STRUCTURAL DATA</button>
    </div>
  );
};

export default StructuralForm;
