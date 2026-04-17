/**
 * server.js
 * The core engine for Full Stack Customs Matrix Walk App.
 */

const fastify = require('fastify')({ 
  logger: true 
});
require('dotenv').config();

// 1. Register Postgres Plugin
// This connects the backend to your database using the .env file
fastify.register(require('@fastify/postgres'), {
  connectionString: process.env.DATABASE_URL
});

// 2. Register CORS
// Allows your "Cool UI" (frontend) to communicate with this backend
fastify.register(require('@fastify/cors'), { 
  origin: true 
});

// 3. Register our Inspection Routes
// This pulls in all the logic and API endpoints we created
fastify.register(require('./routes/inspection_routes'));

// 4. Health Check Route
fastify.get('/health', async (request, reply) => {
  return { status: 'Full Stack Customs Backend: Operational' };
});

// 5. Start the Server
const start = async () => {
  try {
    // Port 3000 is standard, but will use environment variable if set
    await fastify.listen({ 
      port: process.env.PORT || 3000, 
      host: '0.0.0.0' 
    });
    console.log(`Matrix Walk API is live at http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
