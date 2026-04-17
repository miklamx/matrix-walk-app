// models/kitchen_logic.js

/**
 * Logic for processing Kitchen walkthrough data.
 * Focuses on Cabinetry, Appliances, and Plumbing specs.
 */

const processKitchenData = (data) => {
  const result = { ...data };

  // 1. Cabinetry Style & Scope Logic
  if (data.cabinet_scope === 'Faces Only') {
    // Applying your preferred default: Shaker doors with Slab drawers
    result.door_style = data.door_style || 'Shaker';
    result.drawer_style = data.drawer_style || 'Slab';
    
    // Logic: If faces are being replaced, hinge boring and drawer box 
    // requirements must be explicitly tracked.
    result.requires_hinge_boring = true;
    result.frame_paint_match_required = data.provide_matching_paint || false;
  }

  // 2. Refrigerator Precision Logic
  if (data.appliance_type === 'Refrigerator') {
    // Capturing your "front and back" height requirement
    const hFront = parseFloat(data.height_to_cabinet_front);
    const hBack = parseFloat(data.height_to_cabinet_back);
    
    // Automatically flagging cabinet sag or floor issues
    if (Math.abs(hFront - hBack) > 0.125) {
      result.clearance_warning = "Variance detected in cabinet height (Front vs Back). Verify level.";
    }

    // Handing logic - simple string storage for order accuracy
    result.door_handing = data.handing === 'LH' ? 'Left-Hand' : 'Right-Hand';
  }

  // 3. Range Specification Logic
  if (data.appliance_type === 'Range') {
    // Logic: Ranges do not require Ultra Low NOx (only Water Heaters)
    result.is_gas = data.power_source === 'Gas';
    result.cooktop_style = data.surface_type; // 'Smooth' or 'Coil'
  }

  // 4. Countertop Integration
  if (data.countertop_material) {
    // Customization logic: We sell sections, but install includes customization
    result.is_custom_install = data.request_install || false;
    result.edge_profile = data.wants_bullnose ? 'Bullnose' : 'Standard';
  }

  return result;
};

module.exports = { processKitchenData };
