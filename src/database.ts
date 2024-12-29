import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex ({
    client: 'pg',  
    connection: {  
        host: process.env.DB_HOST,  
        user: process.env.DB_USER,  
        password: process.env.DB_PASSWORD,  
        database: process.env.DB_DATABASE,  
        port: Number(process.env.DB_PORT)  
    },  
    migrations: {  
        tableName: 'migrations'  
    }  
})

export default db;