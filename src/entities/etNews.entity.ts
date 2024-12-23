import { Knex } from 'knex';

import KnexConfig from '../utils/database';

/**
 * Represents the data structure for a news item.
 * @typedef {Object} NewsData
 */
export interface NewsData {
    title: string;
    content: string;
    author: string;
    publishDate: string;
}

/**
 * Represents the Knex configuration structure.
 * @typedef {Object} KnexConfig
 * @property {Knex.Config} development - The configuration settings for the development environment.
 */
export interface KnexConfig {
    development: Knex.Config; // The configuration for the development environment
}
