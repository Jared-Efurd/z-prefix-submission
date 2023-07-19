/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE item CASCADE')
  await knex('item').del()
  await knex('item').insert([
    {
      // id: 1, 
      user_id: 1,
      name: 'Water Bottle',
      description: 'There are many water bottles, but this one is my own',
      quantity: 42
    },
    {
      // id: 2, 
      user_id: 1,
      name: 'Dumbbell',
      description: 'Probably weighs a lot',
      quantity: 1
    },
  ]);
};
