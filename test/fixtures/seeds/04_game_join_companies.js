exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('game_join_companies').del()
    .then(() => {
      // Inserts seed entries
      return knex('game_join_companies').insert([
        { id: 1, id_game: 1, id_developer: 1, id_publisher: 2, id_platform: 1 },
        { id: 2, id_game: 2, id_developer: 3, id_publisher: 4, id_platform: 2 },
        { id: 3, id_game: 2, id_developer: 5, id_publisher: 6, id_platform: 3 },
        { id: 4, id_game: 3, id_developer: 7, id_publisher: 8, id_platform: 1 },
        { id: 5, id_game: 3, id_developer: 9, id_publisher: 10, id_platform: 2 },
        { id: 6, id_game: 3, id_developer: 11, id_publisher: 12, id_platform: 3},
        { id: 7, id_game: 4, id_developer: 13, id_publisher: 14, id_platform: 1 },
        { id: 8, id_game: 4, id_developer: 15, id_publisher: 16, id_platform: 3 },
        { id: 9, id_game: 5, id_developer: 17, id_publisher: 18, id_platform: 1 },
        { id: 10, id_game: 5, id_developer: 19, id_publisher: 20, id_platform: 2 }
      ]);
    });
};
