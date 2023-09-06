import { ContextAdapter, Operation } from '../types/context';
import { createConnectionPool, wrapTransaction } from './client';

// The naming convention '$foo' means a function that returns another function 'foo'
export async function $adapter(): Promise<ContextAdapter> {
  const pool = createConnectionPool();

  return async function adapter<I, O>(op: Operation<I, O>) {
    const client = await pool.connect();

    return {
      op: (ctx, input: I) => wrapTransaction(client, () => op(ctx, input)),
      ctx: {},
    };
  };
}
