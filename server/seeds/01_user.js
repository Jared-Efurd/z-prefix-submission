/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {
      // id: 1, 
      first_name: 'Spongebob',
      last_name: 'Squarepants',
      username: 'spongebob.squarepants',
      password: 'password'
    },
    {
      // id: 2, 
      first_name: 'Patrick',
      last_name: 'Star',
      username: 'patrick.star',
      password: 'password'
    },
    {
      // id: 3, 
      first_name: 'Squidward',
      last_name: 'Tentacles',
      username: 'squidward.tentacles',
      password: 'password'
    },
  ]);
};
