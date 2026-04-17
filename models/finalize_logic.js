/**
 * Finalize Logic
 * Aggregates all room data and calculates totals for the final summary.
 */

const generateFinalSummary = (allRooms) => {
  const summary = {
    total_items_recorded: 0,
    categories_covered: [],
    premium_hardware_count: 0,
    warnings: [],
    full_inventory: []
  };

  allRooms.forEach(room => {
    const specs = room.specifications;
    summary.total_items_recorded += 1;
    
    // Track categories
    if (!summary.categories_covered.includes(room.room_type)) {
      summary.categories_covered.push(room.room_type);
    }

    // Logic: Track Premium Hardware (The Large Thumb Screws)
    if (specs.is_premium_hardware || specs.is_premium) {
      summary.premium_hardware_count += 1;
    }

    // Logic: Aggregate Warnings (Like the Fridge Sag)
    if (specs.clearance_warning || specs.warning) {
      summary.warnings.push({
        location: room.room_type,
        issue: specs.clearance_warning || specs.warning
      });
    }

    // Add to the running list
    summary.full_inventory.push({
      room: room.room_type,
      details: specs
    });
  });

  return summary;
};

module.exports = { generateFinalSummary };
