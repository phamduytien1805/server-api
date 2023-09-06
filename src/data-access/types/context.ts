export type Context = {
  repository: any;
};

export type Operation<I, O> = (c: Context, i: I) => Promise<O>;

export type ContextAdapter<C = Context, P = any> = <I, O>(
  op: Operation<I, O>,
  params?: P
) => Promise<{ ctx: Partial<C>; op: Operation<I, O> }>;
