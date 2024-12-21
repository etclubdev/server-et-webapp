import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex 
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {   //The function to create the table
    const exists = await knex.schema.hasTable('et_news'); //Check if the table exists if it does not exist it will create it
    if (!exists) {
        return knex.schema.createTable('et_news', (table) => {
            table.increments('id').primary();
            table.string('title', 100).notNullable();
            table.text('content').notNullable();
            table.string('author', 255).notNullable();
            table.datetime('publishDate').notNullable();
            table.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
            table.datetime('updated_at').defaultTo(knex.fn.now()).notNullable();    
        });
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> { //The function to drop the table
    await knex.schema.dropTableIfExists('et_news'); //Drop the table
}
