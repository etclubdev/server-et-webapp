import { Knex } from 'knex';

import KnexConfig from '../utils/database';

/**
 * Represents the data structure for a news item.
 * @typedef {Object} NewsData
 * @property {string} title - The title of the news item.
 * @property {string} content - The content or body of the news item.
 * @property {string} author - The author of the news item.
 * @property {string} publishdate - The publication date of the news item.
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
    development: Knex.Config;
}
