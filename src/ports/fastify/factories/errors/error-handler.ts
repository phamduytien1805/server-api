import HttpStatus from 'http-status-codes';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import UnauthorizedError from './error-instances/unauthorized-error';
import ValidationError from './error-instances/validation-error';

const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  request.log.error(error);
  if (error instanceof ValidationError) {
    reply.code(HttpStatus.CONFLICT).send({
      errors: error.errors,
    });
  } else if (error instanceof UnauthorizedError) {
    reply.code(HttpStatus.UNAUTHORIZED).send({
      errors: error.errors,
    });
  } else {
    reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
      name: error.name,
      message: error.message,
    });
  }
};

export default errorHandler;
