const envToLogger = ({
  prettyLog,
  level = 'info',
}: {
  prettyLog?: string;
  level?: string;
}) => ({
  development: {
    level,
    transport: {
      target: prettyLog,
      options: {
        translateTime: 'HH:MM:ss Z',
      },
    },
  },
});
export { envToLogger };
