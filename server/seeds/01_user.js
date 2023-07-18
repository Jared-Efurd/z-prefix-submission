/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {
      id: 1, 
      first_name: 'Jared',
      last_name: 'Efurd',
      username: 'jefurd',
      password: 'password'
    }
  ]);
};