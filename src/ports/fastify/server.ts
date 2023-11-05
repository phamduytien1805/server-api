import HttpStatus from 'http-status-codes';
import fastify, { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import { AppError, errorHandler } from '@lib/error-handling';
import { logger } from '@lib/logger';
import { corsOptions } from './plugins/cors/cors-options';
import { jwtOptions } from './plugins/jwt/jwt-options';

export async function binding() {
  const fastifyApp = fastify();

  await fastifyApp
    .setErrorHandler(_errorHandler)
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
      logger.error(error.message, error);
      process.exit(1);
    }
    errorHandler.listenToErrorEvents(fastifyApp.server);
    logger.info('Fastify app listening');
  });
  return fastifyApp;
}

function _errorHandler(
  error: FastifyError & AppError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error && typeof error === 'object') {
    if (error.isTrusted === undefined || error.isTrusted === null) {
      error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
    }
  }
  errorHandler.handleError(error);
  reply.code(error?.HTTPStatus || HttpStatus.INTERNAL_SERVER_ERROR).send({
    name: error.name,
    message: error.message,
  });
}
