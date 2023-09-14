import { Pool, PoolClient } from 'pg';

export type DbFn<I, O> = (client: PoolClient, input: I) => Promise<O>;

export function createConnectionPool() {
  const dbConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  };
  return new Pool({
    max: 5,
    connectionTimeoutMillis: 100,
    idleTimeoutMillis: 500,
    host: 'postgres',
    ...dbConfig,
  });
}

export function withClient<I, O>(client: PoolClient, fn: DbFn<I, O>) {
  return (input: I): Promise<O> => fn(client, input);
}
