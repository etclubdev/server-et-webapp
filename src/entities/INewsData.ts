import { Knex } from 'knex';

import KnexConfig from '../utils/knexfile';
export interface NewsData { 
    title: string;
    content: string;
    author: string;
    publishDate: string;
}
export interface KnexConfig {
    development: Knex.Config; //The configuration for the development environment
  }