exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('platforms').del()
    .then(() => {
      // Inserts seed entries
      return knex('platforms').insert([
        { id: 1, platform: 'Windows' },
        { id: 2, platform: 'Mac' },
        { id: 3, platform: 'Linux' }
      ]);
    });
};
