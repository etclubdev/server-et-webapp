import dotenv from 'dotenv';
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
      host: process.env.DB_HOST,
      user: process.env.DB_USER, 
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME, 
      port: 1433,
      options: {
        encrypt: true,
        trustServerCertificate: true, 
      },
    },
    migrations: {
      directory: path.resolve(__dirname, 'scr/utils/migrations'), 
    },
  },
};

export default knexConfig;
