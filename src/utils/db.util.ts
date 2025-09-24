import knex, { Knex } from 'knex';  

const { HOST, USER, PASSWORD, DATABASE, DB_PORT } = process.env;
const connectionConfig = { host:HOST, user:USER, password:PASSWORD, database: DATABASE, port:DB_PORT };

const config: { [key: string]: Knex.Config } = {  
  development: {  
    client: 'pg', 
    connection: connectionConfig,
    pool: { min: 0, max: 200 },
  }
};  

const db = knex(config['development']); 

export default db; 