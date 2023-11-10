import { createConnectionPool, wrapTransaction, withClient } from './db';

export async function $adapter() {
  const pool = createConnectionPool();

  return async function adapter<I, O>(op) {
    const client = await pool.connect();

    return {
      op: (ctx, input: I) => wrapTransaction(client, () => op(ctx, input)),
      ctx: {
        backend: {},
      },
    };
  };
}
