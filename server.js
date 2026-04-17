const fastify = require('fastify')({ logger: true });
const path = require('path');
require('dotenv').config();

// Enable CORS so your "Cool UI" can talk to this backend
fastify.register(require('@fastify/cors'), { 
  origin: true 
});

// Basic route to test if the backend is alive
fastify.get('/', async (request, reply) => {
  return { status: 'Full Stack Customs Backend: Online' };
});

// START THE SERVER
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
