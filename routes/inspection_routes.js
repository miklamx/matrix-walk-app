/**
 * Inspection Routes
 * Handles the communication between the UI and the Logic/Database.
 */

const { 
  processKitchenData, 
  processPlumbingData, 
  processSystemsData, 
  processPaintData, 
  processStructuralData,
  generateFinalSummary 
} = require('../models');

async function inspectionRoutes(fastify, options) {
  
  // POST: Create a new Matrix Walk session
  fastify.post('/inspections/start', async (request, reply) => {
    const { property_name, unit_number, inspector_name } = request.body;
    
    const query = `
      INSERT INTO inspections (property_name, unit_number, inspector_name)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    
    const result = await fastify.pg.query(query, [property_name, unit_number, inspector_name]);
    return { inspection_id: result.rows[0].id, status: 'Matrix Walk Started' };
  });

  // POST: Save room data (Kitchen, Bath, etc.)
  fastify.post('/inspections/:id/room', async (request, reply) => {
    const { id } = request.params;
    const { room_type, data } = request.body;
    let processedData;

    switch (room_type) {
      case 'Kitchen':
        processedData = processKitchenData(data);
        break;
      case 'Bathroom':
        processedData = processPlumbingData(data);
        break;
      case 'Systems':
        processedData = processSystemsData(data);
        break;
      case 'Paint':
        processedData = processPaintData(data);
        break;
      case 'Structural':
        processedData = processStructuralData(data);
        break;
      default:
        processedData = data;
    }

    const query = `
      INSERT INTO room_data (inspection_id, room_type, specifications)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await fastify.pg.query(query, [id, room_type, JSON.stringify(processedData)]);
    return { status: 'Got it!', saved: result.rows[0] };
  });

  // GET: Final Matrix Summary
  // This route triggers the finalize_logic to aggregate and total everything
  fastify.get('/inspections/:id/finalize', async (request, reply) => {
    const { id } = request.params;
    
    // 1. Fetch all raw data for this inspection
    const query = `
      SELECT room_type, specifications 
      FROM room_data 
      WHERE inspection_id = $1 
      ORDER BY id ASC;
    `;
    
    const result = await fastify.pg.query(query, [id]);
    
    // 2. Run the data through the Finalize Engine
    const summaryReport = generateFinalSummary(result.rows);
    
    return { 
      inspection_id: id, 
      generated_at: new Date().toISOString(),
      report: summaryReport 
    };
  });
}

module.exports = inspectionRoutes;
