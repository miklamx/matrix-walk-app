// models/structural_logic.js

/**
 * Logic for Interior Doors, Locksets, Millwork, and Window Coverings.
 * Handles slab machining, latch types, and mounting configurations.
 */

const processStructuralData = (data) => {
  const result = { ...data };

  // 1. Door & Machining Logic
  if (data.item_type === 'Door') {
    // Logic: Determining if the client needs us to cut the bores and hinges
    result.is_machined = data.door_type === 'Slab' && data.machining_required;
    result.style_category = data.style; // '2-Panel', '6-Panel', 'Flush'
  }

  // 2. Lockset & Latch Logic
  if (data.item_type === 'Lockset') {
    // Logic: Drive-in vs Square latch is critical for older vs newer retrofits
    result.latch_compatibility = data.latch_type === 'Drive-in' ? 'Retrofit-Friendly' : 'Standard-Mortise';
    result.function = data.lock_function; // 'Privacy', 'Passage', 'Dummy'
  }

  // 3. Window Covering Logic
  if (data.item_type === 'Blinds' || data.item_type === 'Verticals') {
    // Logic: Inside mount vs Outside mount changes the measurement deduction math
    result.mount_type = data.is_inside_mount ? 'Inside Mount' : 'Outside Mount';
    result.material = data.material_type; // '2" Faux Wood', '1" Vinyl', etc.
  }

  // 4. Millwork & Shims
  if (data.item_type === 'Millwork') {
    result.total_linear_feet = (parseFloat(data.length) || 0) * (parseInt(data.quantity) || 1);
    result.requires_shims = data.include_shims || false;
  }

  return result;
};

module.exports = { processStructuralData };
