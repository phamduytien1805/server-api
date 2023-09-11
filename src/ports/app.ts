import * as configurationProvider from '@libraries/configuration-provider';
import { $adapter as $postgres } from '@data-access/pg/adapter';
import { GRACEFUL_DELAY } from './fastify/constants';
import { binding } from './fastify/server';
import * as configurationSchema from './config';

async function startWebServer() {
  configurationProvider.initializeAndValidate(configurationSchema);

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
