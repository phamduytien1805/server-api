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
  const nodeEnv = process.env.NODE_ENV;

  const fastifyApp = fastify({
    logger:
      envToLogger({
        prettyLogger: process.env.PRETTY_PRINT_LOG || '',
        levelLogger: process.env.LOGGER_LEVEL,
      })[nodeEnv] || true,
  });

  await fastifyApp
    .setErrorHandler(errorHandler)
    .register(helmet)
    .register(cors, corsOptions)
    .register(cookie, {
      secret: process.env.COOKIE_SECRET,
    })
    .register(
      jwt,
      jwtOptions({
        privatePath: process.env.JWT_PRIVATE_PATH,
        publicPath: process.env.JWT_PUBLIC_PATH,
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.EXPIRES_IN,
      })
    );

  fastifyApp.listen({ port: Number(process.env.PORT) }, (error, address) => {
    if (error) {
      fastifyApp.log.error(error);
      process.exit(1);
    }
    fastifyApp.log.info('Fastify app listening');
  });
  return fastifyApp;
}
