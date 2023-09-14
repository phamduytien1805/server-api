import { FastifyJWTOptions } from '@fastify/jwt';
import { readFileSync } from 'fs';
import path from 'path';

type JWTProps = {
  privatePath: string;
  publicPath: string;
  algorithm: 'ES256' | 'RS256';
  expiresIn: string | number;
};
const jwtOptions = (props: JWTProps): FastifyJWTOptions => ({
  secret: {
    private: readFileSync(`${path.join('certs', props.privatePath)}`, 'utf-8'),
    public: readFileSync(`${path.join('certs', props.publicPath)}`, 'utf-8'),
  },
  sign: {
    algorithm: props.algorithm,
    expiresIn: props.expiresIn,
  },
});

export { jwtOptions, JWTProps };
