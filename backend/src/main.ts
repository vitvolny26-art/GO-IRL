import Fastify from 'fastify';
import cors from '@fastify/cors';

const app = Fastify({
  logger: true,
});

await app.register(cors);

app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

app.get('/', async () => {
  return {
    name: 'GO IRL',
    mission: 'Go outside. Meet people. Live more.',
    version: '0.0.1',
  };
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
