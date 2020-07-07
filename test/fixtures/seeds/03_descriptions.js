exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('descriptions').del()
    .then(() => {
      // Inserts seed entries
      return knex('descriptions').insert([
        { id: 1, description: 'Description for game 1', release_date: '2013-06-01'},
        { id: 2, description: 'Description for game 2', release_date: '2018-06-01'},
        { id: 3, description: 'Description for game 3', release_date: '2015-01-01'},
        { id: 4, description: 'Description for game 4', release_date: '2020-02-01'},
        { id: 5, description: 'Description for game 5', release_date: '2020-07-01'},
      ]);
    });
};
