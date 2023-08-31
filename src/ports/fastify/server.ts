import * as configurationProvider from '@libraries/configuration-provider';
import configurationSchema from '@config';
import fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { GRACEFUL_DELAY, envToLogger } from './constants';
import { corsOptions } from './plugins/cors/cors-options';
import errorHandler from './factories/errors/error-handler';

async function startWebServer() {
  configurationProvider.initializeAndValidate(configurationSchema);
  const nodeEnv = configurationProvider.getValue('nodeEnv');

  const fastifyApp = fastify({
    logger:
      envToLogger({
        prettyLogger: configurationProvider.getValue('logger.prettyPrint'),
        levelLogger: configurationProvider.getValue('logger.level'),
      })[nodeEnv] || true,
  });

  let isTerminating = false;
  const gracefulShutdown = () => {
    fastifyApp.log.info('starting termination');
    isTerminating = true;
    setTimeout(async () => {
      await fastifyApp.close();
      process.exit();
    }, GRACEFUL_DELAY);
  };
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);

  await fastifyApp
    .setErrorHandler(errorHandler)
    .register(helmet)
    .register(cors, corsOptions)
    .register(cookie, {
      secret: configurationProvider.getValue('cookieSecret'),
    });
}
