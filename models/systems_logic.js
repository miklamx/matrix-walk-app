// models/systems_logic.js

/**
 * Logic for processing HVAC, Water Heaters, and Laundry systems.
 * Handles Ultra Low NOx compliance and high-recovery capacity rules.
 */

const processSystemsData = (data) => {
  const result = { ...data };

  // 1. Water Heater Compliance & Capacity Logic
  if (data.system_type === 'Water Heater') {
    // Logic: Ultra Low NOx is mandatory for Gas units (per regional compliance)
    // Note: This does not apply to Electric units.
    if (data.fuel_source === 'Gas') {
      result.compliance_label = 'Ultra Low NOx Required';
    } else {
      result.compliance_label = 'Standard Electric';
    }

    // Capacity & Recovery Logic
    if (data.capacity_gallons > 50) {
      result.is_high_recovery = data.recovery_type === 'High Recovery';
    }

    // Connection Type Logic
    result.connection_method = data.connection_style; // 'SharkBite' or 'ProPress'
  }

  // 2. Laundry Configuration Logic
  if (data.system_type === 'Laundry') {
    // Logic: Determining if the space allows for external venting
    result.venting_setup = data.is_vented ? 'Vented' : 'Ventless (Heat Pump/Condenser)';
    
    // Hose material selection
    result.hose_type = data.hose_material === 'Braided Stainless' ? 'Premium' : 'Standard Nylon';
  }

  // 3. HVAC Filter & Safety Logic
  if (data.system_type === 'HVAC') {
    result.filter_size = `${data.filter_width} x ${data.filter_height} x ${data.filter_depth}`;
    result.safety_check = data.smoke_co_batteries_verified ? 'Passed' : 'Pending';
  }

  return result;
};

module.exports = { processSystemsData };
