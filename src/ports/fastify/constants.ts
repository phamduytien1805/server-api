const envToLogger = ({
  prettyLogger,
  levelLogger = 'info',
}: {
  prettyLogger: string;
  levelLogger?: string;
}) => ({
  development: {
    level: levelLogger,
    transport: {
      target: prettyLogger,
      options: {
        translateTime: 'HH:MM:ss Z',
      },
    },
  },
  production: {
    level: levelLogger,
  },
  test: false,
});
const GRACEFUL_DELAY = 2 * 2 * 1000 + 5000;

export { envToLogger, GRACEFUL_DELAY };
