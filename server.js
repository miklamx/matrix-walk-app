const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Import your route "extension"
const inspectionRoutes = require('./routes/inspection_routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // The "security badge" that lets Vercel talk to Render
app.use(express.json()); // Lets the server read the data you send from your phone

// The Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the database connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Connected to the Matrix Database');
  }
});

// "Plug in" the routes
// This makes sure your save buttons actually work!
app.use('/api', inspectionRoutes);

// A simple health check to make sure the server is alive
app.get('/', (req, res) => {
  res.send('Matrix Walk Server is Running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
