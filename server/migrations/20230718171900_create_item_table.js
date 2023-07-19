/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', (table) => {
    table.increments('id');
    table.integer('user_id');
    table.foreign('user_id').references('user.id')
    table.string('name').notNullable();
    table.string('description', 300).notNullable();
    table.integer('quantity').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

  return knex.schema.alterTable('item', (table) => {
    table.dropForeign('user_id');
  })
  .then(() => knex.schema.dropTableIfExists('item'));
};
