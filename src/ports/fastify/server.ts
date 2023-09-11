import * as configurationProvider from '@libraries/configuration-provider';
import fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import { envToLogger } from './constants';
import errorHandler from './factories/errors/error-handler';
import { corsOptions } from './plugins/cors/cors-options';
import { JWTProps, jwtOptions } from './plugins/jwt/jwt-options';

export async function binding() {
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

  fastifyApp.listen(
    { port: Number(configurationProvider.getValue('port')) },
    (error, address) => {
      if (error) {
        fastifyApp.log.error(error);
        process.exit(1);
      }
      fastifyApp.log.info('Fastify app listening');
    }
  );
  return fastifyApp;
}
