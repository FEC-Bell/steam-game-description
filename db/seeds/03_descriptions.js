const { generateGameDesc } = require('../utils');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('descriptions').del()
    .then(() => {
      // Inserts seed entries
      return knex('descriptions').insert(generateGameDesc());
    });
};
