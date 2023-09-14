import { $adapter as $postgres } from '@data-access/pg/adapter';
import { GRACEFUL_DELAY } from './fastify/constants';
import { binding } from './fastify/server';

async function startWebServer() {
  // const postgres = await $postgres();

  const fastifyApp = await binding();

  const gracefulShutdown = () => {
    setTimeout(async () => {
      await fastifyApp.close();
      process.exit();
    }, GRACEFUL_DELAY);
  };
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}

export { startWebServer };
