import * as configurationProvider from '@libraries/configuration-provider';
import configurationSchema from '@config';
import fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import { GRACEFUL_DELAY, envToLogger } from './constants';
import { corsOptions } from './plugins/cors/cors-options';
import errorHandler from './factories/errors/error-handler';
import { JWTProps, jwtOptions } from './plugins/jwt/jwt-options';

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

  await fastifyApp
    .setErrorHandler(errorHandler)
    .register(helmet)
    .register(cors, corsOptions)
    .register(cookie, {
      secret: configurationProvider.getValue('cookieSecret'),
    })
    .register(
      jwt,
      jwtOptions({
        privatePath: configurationProvider.getValue('JWT.privatePath'),
        publicPath: configurationProvider.getValue('JWT.publicPath'),
        algorithm: configurationProvider.getValue(
          'JWT.algorithm'
        ) as JWTProps['algorithm'],
        expiresIn: configurationProvider.getValue('JWT.expires'),
      })
    );

  const gracefulShutdown = () => {
    fastifyApp.log.info('starting termination');
    setTimeout(async () => {
      await fastifyApp.close();
      process.exit();
    }, GRACEFUL_DELAY);
  };
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}
