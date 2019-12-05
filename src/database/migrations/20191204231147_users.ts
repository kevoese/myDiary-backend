import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('name');
    table
      .string('email')
      .unique()
      ;
    table
      .string('username')
      .unique()
      ;
    table.string('password');
    table.timestamps(true, true);
    table.string('bio');
    table.string('avatar');
    table.string('emailVerified');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
