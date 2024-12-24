import dotenv from 'dotenv';
import knex, { Knex } from 'knex';

import { KnexConfig } from '../entities/etNews.entity';

/**
 * Load environment variables from the .env file.
 */
dotenv.config(); 

/**
 * Configuration for the database connection.
 *
 * @type {KnexConfig}
 * @property {object} development - The development environment configuration.
 * @property {string} development.client - The database client.
 * @property {object} development.connection - The connection settings.
 * @property {object} pool - The connection pool settings.

 */
const knexConfig: KnexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 5432,
    },
      pool: { min: 0, max: 10 },
    },
  };

/**
 * Initializes and exports a Knex instance for database operations.
 *
 * @type {Knex}
 */
const db: Knex = knex(knexConfig.development);

export default db;