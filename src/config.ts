// ️️️✅ Best Practice: Store configuration in a self-explanatory, strongly typed and hierarchical store

export default {
  env: {
    doc: 'The environment',
    format: 'String',
    default: 'development',
    nullable: false,
    env: 'NODE_ENV',
  },
  jwtTokenSecret: {
    doc: 'The JWT token signing algorithm secret',
    format: 'String',
    default: 'just-a-default-secret',
    nullable: false,
    env: 'JWT_TOKEN_SECRET',
  },
  port: {
    doc: 'The API listening port. By default is 0 (ephemeral) which serves as a dynamic port for testing purposes. For production use, a specific port must be assigned',
    format: 'Number',
    default: 0,
    nullable: true,
    env: 'PORT',
  },
  logger: {
    level: {
      doc: 'Which type of logger entries should actually be written to the target medium (e.g., stdout)',
      format: ['debug', 'info', 'warn', 'error', 'critical'],
      default: 'info',
      nullable: false,
      env: 'LOGGER_LEVEL',
    },
    prettyPrint: {
      doc: 'Weather the logger should be configured to pretty print the output',
      format: 'String',
      default: 'pino-pretty',
      nullable: true,
      env: 'PRETTY_PRINT_LOG',
    },
  },
  DB: {
    userName: {
      doc: 'The DB connection user name',
      format: 'String',
      default: 'myuser',
      nullable: false,
      env: 'DB_USERNAME',
    },
    port: {
      doc: 'The DB port',
      format: 'Number',
      default: '54320',
      nullable: false,
      env: 'DB_PORT',
    },
    url: {
      doc: 'The DB cluster URL',
      format: 'String',
      default: 'localhost',
      nullable: false,
      env: 'DB_URL',
    },
    password: {
      doc: "The DB connection password. Don't put production code here",
      format: 'String',
      default: 'myuserpassword',
      nullable: false,
      env: 'DB_PASSWORD',
    },
    dbName: {
      doc: 'The default database name',
      format: 'String',
      default: 'shop',
      nullable: false,
      env: 'DB_NAME',
    },
  },
};
