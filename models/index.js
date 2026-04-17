/**
 * Models Entry Point (index.js)
 * Consolidates all room-specific logic and the finalization engine.
 */

const { processKitchenData } = require('./kitchen_logic');
const { processPlumbingData } = require('./plumbing_logic');
const { processSystemsData } = require('./systems_logic');
const { processPaintData } = require('./paint_logic');
const { processStructuralData } = require('./structural_logic');
const { generateFinalSummary } = require('./finalize_logic');

module.exports = {
  processKitchenData,
  processPlumbingData,
  processSystemsData,
  processPaintData,
  processStructuralData,
  generateFinalSummary
};
