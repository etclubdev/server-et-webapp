import type {Knex} from 'knex';

const config : {[key: string]: Knex.Config} = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            database: 'etclubweb',
            user: 'etclubdev',
            password: 'etclubdev',
        },
    }
};

export default config;