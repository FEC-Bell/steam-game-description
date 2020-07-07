const faker = require('faker');

/**
 * Generate 100 game descriptions with release dates
 * @returns {Array} array of game description objects for seeding
 */
exports.generateGameDesc = () => {
  // Generate an array of game ids 1-100
  let descriptions = new Array(100).fill(0).map((_, idx) => idx + 1);

  // Map generated game id array into object for db seeding
  let msIn10Years = 1000 * 60 * 60 * 24 * 365 * 10;
  descriptions = descriptions.map(id => {
    let descObj = { id };
    descObj.description = faker.fake('{{lorem.paragraph}} {{lorem.paragraph}}');
    // Gets a random millisecond date value between now and 10 years ago,
    // converts to Date object, then transforms into human-readable ISOString (i.e. 2020-06-30T00:00:00.000Z)
    descObj.release_date = new Date(Date.now() - Math.floor(Math.random() * msIn10Years)).toISOString();
    return descObj;
  });
  return descriptions;
};

/**
 * Generate 1-3 developers for each game with platform ids that are not repeated for the same game
 * @returns {Array} array of game developer objects for seeding
 */
exports.generateGameJoinCompanies = () => {
  // Generate an array of game ids 1-100
  let seedObjs = new Array(100).fill(0).map((_, idx) => idx + 1);

  // Repeat each game id between 1 to 3 times
  seedObjs = seedObjs.map(id => new Array(Math.ceil(Math.random() * 3)).fill(id));

  // Attach id_developer or id_platform to gameJoinCompany objects
  let primaryKey = 0;
  seedObjs = seedObjs.map(idArr => {
    let platformIds = [1, 2, 3];
    // Map array of ids into array of id_game objects and primary key ids
    let gameJoinDevObjs = idArr.map(id_game => ({ id: ++primaryKey, id_game }));
    gameJoinDevObjs.forEach(obj => {
      // 20 possible companies for development and publishing
      obj.id_developer = Math.ceil(Math.random() * 20);
      obj.id_publisher = Math.ceil(Math.random() * 20);

      // 3 possible platforms, but must be unique per game
      let randIdx = Math.floor(Math.random() * platformIds.length);
      obj.id_platform = platformIds[randIdx];
      platformIds.splice(randIdx, 1);
    });
    return gameJoinDevObjs;
  });

  return seedObjs.flat();
};