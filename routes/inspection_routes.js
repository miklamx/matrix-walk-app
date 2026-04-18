const express = require('express');
const router = express.Router();
const { 
  processKitchenData, 
  processPlumbingData, 
  processSystemsData, 
  processPaintData, 
  processStructuralData,
  generateFinalSummary 
} = require('../models');

// POST: Create a new Matrix Walk session
router.post('/inspections/start', async (req, res) => {
  const { property_name, unit_number, inspector_name } = req.body;
  const query = `
    INSERT INTO inspections (property_name, unit_number, inspector_name)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;
  try {
    const result = await req.app.get('pool').query(query, [property_name, unit_number, inspector_name]);
    res.json({ inspection_id: result.rows[0].id, status: 'Matrix Walk Started' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Save room data (Kitchen, Bath, etc.)
router.post('/inspections/:id/room', async (req, res) => {
  const { id } = req.params;
  const { room_type, data } = req.body;
  let processedData;

  switch (room_type) {
    case 'Kitchen': processedData = processKitchenData(data); break;
    case 'Bathroom': processedData = processPlumbingData(data); break;
    case 'Systems': processedData = processSystemsData(data); break;
    case 'Paint': processedData = processPaintData(data); break;
    case 'Structural': processedData = processStructuralData(data); break;
    default: processedData = data;
  }

  const query = `
    INSERT INTO room_data (inspection_id, room_type, specifications)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    const result = await req.app.get('pool').query(query, [id, room_type, JSON.stringify(processedData)]);
    res.json({ status: 'Got it!', saved: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Final Matrix Summary
router.get('/inspections/:id/finalize', async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT room_type, specifications 
    FROM room_data 
    WHERE inspection_id = $1 
    ORDER BY id ASC;
  `;
  try {
    const result = await req.app.get('pool').query(query, [id]);
    const summaryReport = generateFinalSummary(result.rows);
    res.json({ 
      inspection_id: id, 
      generated_at: new Date().toISOString(),
      report: summaryReport 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
