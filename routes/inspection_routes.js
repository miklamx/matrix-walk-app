/**
 * Inspection Routes
 * Handles the communication between the UI and the Logic/Database.
 */

const { 
  processKitchenData, 
  processPlumbingData, 
  processSystemsData, 
  processPaintData, 
  processStructuralData 
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

    // Directing data to the correct "Straightforward Partner" logic
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

  // GET: Fetch the Full Unit Summary (The Signal to finish)
  fastify.get('/inspections/:id/summary', async (request, reply) => {
    const { id } = request.params;
    
    const query = `
      SELECT room_type, specifications 
      FROM room_data 
      WHERE inspection_id = $1 
      ORDER BY id ASC;
    `;
    
    const result = await fastify.pg.query(query, [id]);
    return { inspection_id: id, total_items: result.rowCount, items: result.rows };
  });
}

module.exports = inspectionRoutes;
