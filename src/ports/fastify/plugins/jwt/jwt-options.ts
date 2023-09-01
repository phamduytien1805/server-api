import { FastifyJWTOptions } from '@fastify/jwt';
import { readFileSync } from 'fs';
import path from 'path';

type JWTProps = {
  privatePath: string;
  publicPath: string;
  algorithm: 'ES256' | 'RS256';
  expiresIn: string;
};
const jwtOptions = (props: JWTProps): FastifyJWTOptions => ({
  secret: {
    private: readFileSync(
      `${path.join(__dirname, '..', '..', 'certs', props.privatePath)}`
    ),
    public: readFileSync(
      `${path.join(__dirname, '..', '..', 'certs', props.publicPath)}`
    ),
  },
  sign: {
    algorithm: props.algorithm,
    expiresIn: props.expiresIn,
  },
});

export { jwtOptions, JWTProps };
