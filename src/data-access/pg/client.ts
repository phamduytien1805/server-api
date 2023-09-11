import { Pool, PoolClient } from 'pg';
import * as configurationProvider from '@libraries/configuration-provider';

export type DbFn<I, O> = (client: PoolClient, input: I) => Promise<O>;

export function createConnectionPool() {
  const dbConfig = {
    user: configurationProvider.getValue('DB.username'),
    password: configurationProvider.getValue('DB.password'),
    port: Number(configurationProvider.getValue('DB.port')),
    database: configurationProvider.getValue('DB.dbName'),
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
