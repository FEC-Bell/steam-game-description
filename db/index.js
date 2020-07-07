const db = require('./knex');

/**
 * @param {String} gameid
 * @returns {Array} array whose first and only entry is game description object
 */
const getDescById = (gameid) => {
  return db('descriptions')
    .where('id', gameid);
};

/**
 * Gets game description, release date, and all developers and publishers for a gameid
 * @param {Number} gameid
 * @returns {Object}
 */
exports.getGameInfo = async (gameid) => {
  let devPubInfo = await db('game_join_companies')
    .where('id_game', gameid)
    .orderBy('id_platform');

  let [gameJSON] = await getDescById(gameid);
  gameJSON.developers = [];
  gameJSON.publishers = [];

  for (let i = 0; i < devPubInfo.length; i++) {
    let [developer] = await db('companies')
      .where('id', devPubInfo[i].id_developer);
    let [publisher] = await db('companies')
      .where('id', devPubInfo[i].id_publisher);
    let [platform] = await db('platforms')
      .where('id', devPubInfo[i].id_platform);
    developer.platform = platform.platform;
    publisher.platform = platform.platform;
    gameJSON.developers.push(developer);
    gameJSON.publishers.push(publisher);
  }

  return gameJSON;
};