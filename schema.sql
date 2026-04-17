-- 1. Table for the main Inspection Session
CREATE TABLE IF NOT EXISTS inspections (
    id SERIAL PRIMARY KEY,
    property_name TEXT NOT NULL,
    unit_number TEXT NOT NULL,
    inspector_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table for the individual Room Data
-- This stores the 'Thinking and Doing' logic results as JSON
CREATE TABLE IF NOT EXISTS room_data (
    id SERIAL PRIMARY KEY,
    inspection_id INTEGER REFERENCES inspections(id) ON DELETE CASCADE,
    room_type TEXT NOT NULL,
    specifications JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
