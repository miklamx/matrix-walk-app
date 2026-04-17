-- Main table for the property/unit being inspected
CREATE TABLE inspections (
    id SERIAL PRIMARY KEY,
    property_name VARCHAR(255) NOT NULL,
    unit_number VARCHAR(50),
    inspector_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for the room-by-room data
CREATE TABLE room_data (
    id SERIAL PRIMARY KEY,
    inspection_id INTEGER REFERENCES inspections(id) ON DELETE CASCADE,
    room_type VARCHAR(100), -- 'Kitchen', 'Bathroom', etc.
    
    -- This is where we store the complex data like sizes, finishes, and specs
    -- It allows for "Width x Height" and "Left/Right Handing" in one place
    specifications JSONB NOT NULL, 
    
    status VARCHAR(50) DEFAULT 'Pending',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
