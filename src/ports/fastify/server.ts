import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import * as configurationProvider from '@configuration-provider';
import configurationSchema from '../../config';
import { envToLogger } from './constants';

async function startWebServer() {
  configurationProvider.initializeAndValidate(configurationSchema);

  const fastifyApp = fastify({
    logger:
      envToLogger({
        prettyLog: configurationProvider.getValue('logger.prettyPrint'),
        level: configurationProvider.getValue('logger.level'),
      })[configurationProvider.getValue('env')] || true,
  });
  fastifyApp.register(fastifyCors);
  fastifyApp.register(fastifyHelmet);
}
