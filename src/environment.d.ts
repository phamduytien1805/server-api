declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      COOKIE_SECRET: string;
      JWT_PRIVATE_PATH: string;
      JWT_PUBLIC_PATH: string;
      EXPIRES_IN: string | number;
      JWT_ALGORITHM: 'ES256' | 'RS256';
      PORT: string | number;
      LOGGER_LEVEL?: 'debug' | 'info' | 'warn' | 'error' | 'critical';
      PRETTY_PRINT_LOG?: string;
      DB_USERNAME: string;
      DB_PORT: number;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_HOST: string;
      DB_DRIVER: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
