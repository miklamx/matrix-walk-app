// models/plumbing_logic.js

/**
 * Logic for processing Plumbing and Bathroom fixture data.
 * Handles supply line grades, valve configurations, and finishes.
 */

const processPlumbingData = (data) => {
  const result = { ...data };

  // 1. Supply Line & Nut Style Logic
  // Logic: "Large Thumb Screw" is a premium labor-saver.
  if (data.supply_line_type) {
    result.is_premium_hardware = data.nut_style === 'Large Thumb Screw';
    result.material_grade = data.material === 'Braided Stainless' ? 'High' : 'Standard';
    
    // Flagging for labor ROI analysis
    if (result.is_premium_hardware) {
      result.installation_notes = "Premium hardware selected: Reduced labor time expected.";
    }
  }

  // 2. Bathroom Valve & Trim Logic
  // Logic: Determining if we are doing a surface-level update or a wall-entry replacement.
  if (data.fixture_type === 'Shower/Tub') {
    result.scope = data.replace_entire_valve ? 'Full Valve Replacement' : 'Trim Kit Only';
    result.requires_tub_shoe = data.wants_tub_shoe || false;
  }

  // 3. Faucet Configuration
  if (data.fixture_type === 'Faucet') {
    // Logic: Single-hole faucets often need a deck plate for 3-hole retrofits.
    result.is_3_hole_adaptable = data.hole_config === 'Single' && data.adapter_plate_needed;
  }

  // 4. Finish Standardization
  const validFinishes = ['Brushed Nickel', 'Matte Black', 'Chrome', 'Polished Brass'];
  if (data.finish && !validFinishes.includes(data.finish)) {
    result.finish_warning = "Non-standard finish selected. Verify lead times.";
  }

  return result;
};

module.exports = { processPlumbingData };
