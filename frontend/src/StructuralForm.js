import React, { useState } from 'react';

const StructuralForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    doorStyle: '',
    lockLatchConfig: '',
    windowBlindMount: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // This matches the format for your Google Sheet: Location, Width, Height, Notes
    onSave({
      location: `Structural: ${formData.doorStyle}`,
      width: formData.lockLatchConfig, // Using your W x H format logic
      height: formData.windowBlindMount,
      notes: formData.notes
    });
  };

  return (
    <div className="p-4 border rounded bg-gray-50 shadow-sm">
      <h3 className="text-lg font-bold mb-3">Structural Details</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text" 
          placeholder="Door Style (e.g. 6-Panel)" 
          className="w-full p-2 border"
          onChange={(e) => setFormData({...formData, doorStyle: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Lock/Latch Config" 
          className="w-full p-2 border"
          onChange={(e) => setFormData({...formData, lockLatchConfig: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Blind Mount (Inside/Outside)" 
          className="w-full p-2 border"
          onChange={(e) => setFormData({...formData, windowBlindMount: e.target.value})}
        />
        <textarea 
          placeholder="Additional Notes" 
          className="w-full p-2 border"
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Save Structural
        </button>
      </form>
    </div>
  );
};

export default StructuralForm;
