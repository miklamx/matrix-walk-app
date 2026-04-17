// Logic for handling Refrigerator entry
const validateFridgeEntry = (data) => {
  const requirements = [
    'width_opening', 
    'height_to_cabinet_front', 
    'height_to_cabinet_back',
    'handing', // Left or Right
    'electrical_wire_count' // 3 or 4
  ];
  
  // Ensure the logic checks for BOTH heights as you requested
  if (data.height_to_cabinet_front !== data.height_to_cabinet_back) {
    console.log("Alert: Sagging cabinet detected based on height variance.");
  }
  
  return requirements.every(field => data.hasOwnProperty(field));
};
