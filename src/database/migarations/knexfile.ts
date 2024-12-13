import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import path from 'path';

dotenv.config();
interface KnexConfig {
  development: Knex.Config;
}

// Cấu hình database
const knexConfig: KnexConfig = {
  development: {
    client: 'mssql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'defaultUser',
      password: process.env.DB_PASSWORD || 'defaultPassword',
      database: process.env.DB_NAME || 'defaultDatabase',
      port: Number(process.env.DB_PORT) || 1433,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, 'src/database/migrations'),
    },
  },
};

export default knexConfig;
