import { FastifyCorsOptions } from '@fastify/cors';

const corsOptions: FastifyCorsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
};

export { corsOptions };
