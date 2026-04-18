const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Import your routes
const inspectionRoutes = require('./routes/inspection_routes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middleware
app.use(cors()); // Allows your Vercel frontend to talk to this Render backend
app.use(express.json()); // Allows the server to read the JSON data from your forms

// 2. Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// 3. The "One Last Tweak"
// This makes the database 'pool' available inside your routes/inspection_routes.js file
app.set('pool', pool);

// Test the database connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Connected to the Matrix Database');
  }
});

// 4. Connect the "Drain Pipes" (Routes)
app.use('/api', inspectionRoutes);

// Health check to confirm the server is live
app.get('/', (req, res) => {
  res.send('Matrix Walk Server is Live and Operational!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
