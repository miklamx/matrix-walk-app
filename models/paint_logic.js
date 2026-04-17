// models/paint_logic.js

/**
 * Logic for processing Paint and Coating specifications.
 * Handles quality tiers, sheen standardization, and cabinet frame color matching.
 */

const processPaintData = (data) => {
  const result = { ...data };

  // 1. Quote Request Logic
  // Logic: Explicitly tracking if a quote is part of the professional bid.
  result.status = data.quote_requested ? 'Quote Required' : 'Inventory Only';

  // 2. Quality Tier Logic
  // Logic: Standardizing grades for ROI and durability analysis.
  if (data.tier === 'Economy') {
    result.application_notes = "Economy grade: Optimized for budget turnovers.";
  } else if (data.tier === 'Quality') {
    result.application_notes = "Quality grade: Optimized for durability and coverage.";
  }

  // 3. Cabinet Color Matching Logic
  // Logic: If faces were replaced in Kitchen/Bath, check if frame matching is required.
  if (data.is_cabinet_matching) {
    result.match_type = "Frame-to-Face Match";
    result.requires_color_match_kit = true;
    result.instructions = `Provide ${data.sheen} finish to match new cabinet door/drawer faces.`;
  }

  // 4. Sheen Standardization
  const sheens = ['Flat', 'Eggshell', 'Satin', 'Semi-Gloss'];
  if (data.sheen && !sheens.includes(data.sheen)) {
    result.special_order = true;
    result.warning = "Non-standard sheen requested.";
  }

  return result;
};

module.exports = { processPaintData };
