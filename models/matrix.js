// Example logic for inserting a Kitchen walk
const saveKitchenData = async (client, inspectionId, kitchenData) => {
  const query = `
    INSERT INTO room_data (inspection_id, room_type, specifications)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  
  // kitchenData would look like: { fridge_width: 36, fridge_height: 70, finish: 'Stainless' }
  const values = [inspectionId, 'Kitchen', JSON.jsonb_build_object(kitchenData)];
  
  const res = await client.query(query, values);
  return res.rows[0];
};
