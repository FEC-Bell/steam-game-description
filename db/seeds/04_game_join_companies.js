const { generateGameJoinCompanies } = require('../utils');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('game_join_companies').del()
    .then(() => {
      // Inserts seed entries
      return knex('game_join_companies').insert(generateGameJoinCompanies());
    });
};
