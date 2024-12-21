import dotenv from 'dotenv';
import path from 'path';

import { KnexConfig } from '../entities/INewsData';

dotenv.config(); //Read the enviroment variable from .env file

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
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
      pool: { min: 0, max: 10 }, //Limit the number of connections
    },
    migrations: {
      directory: path.resolve(__dirname, 'scr/utils/migrations'), 
    },
  },
};

export default knexConfig;
