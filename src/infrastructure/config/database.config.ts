import {registerAs} from '@nestjs/config';

export type DatabaseConfig = {
  url: string;
  type: string;
  host: string;
  port: number;
  password: string;
  name: string;
  username: string;
  synchronize: boolean;
  maxConnections: number;
  sslEnabled: boolean;
  rejectUnauthorized: boolean;
  ca: string;
  key: string;
  cert: string;
};

export const databaseConfig = registerAs<Partial<DatabaseConfig>>(
  'database',
  () => ({
    url: process.env.DATABASE_URL,
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS || '100', 10),
    sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
    rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
    ca: process.env.DATABASE_CA,
    key: process.env.DATABASE_KEY,
    cert: process.env.DATABASE_CERT,
  }),
);
