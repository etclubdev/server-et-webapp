import { Knex } from 'knex';

import KnexConfig from '../utils/database';

/**
 * Represents the data structure for a news item.
 * I use publishdate instead of publishDate because when i get name for it is publishDate, it becomes publishdate and i can't fix
 * @typedef {Object} NewsData
 */
export interface NewsData {
    title: string;
    content: string;
    author: string;
    publishdate: string;
}

/**
 * Represents the Knex configuration structure.
 * @typedef {Object} KnexConfig
 * @property {Knex.Config} development - The configuration settings for the development environment.
 */
export interface KnexConfig {
    development: Knex.Config; // The configuration for the development environment
}
