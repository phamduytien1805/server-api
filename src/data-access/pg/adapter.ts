import { drizzle } from 'drizzle-orm/node-postgres';
import { ContextAdapter, Operation } from '../types/context';
import { createConnectionPool } from './client';

// The naming convention '$foo' means a function that returns another function 'foo'
export async function $adapter(): Promise<ContextAdapter> {
  const pool = createConnectionPool();

  return async function adapter<I, O>(op: Operation<I, O>) {
    const db = drizzle(pool);

    return {
      op: (ctx, input: I) => op(ctx, input),
      ctx: {},
    };
  };
}
