process.env.NODE_ENV = 'test';
require('dotenv').config();
const db = require('../../db/knex');
const { dbTest } = require('./dbTest');
const { routesTest } = require('./routesTest');

describe('Serial DB and Routes tests', () => {
  beforeAll(() => {
    return db.migrate.rollback()
      .then(() => db.migrate.latest())
      .then(() => db.seed.run());
  });

  afterAll(() => {
    return db.destroy();
  });

  dbTest();
  // Suppress server console.logs in app.listen
  console.log = jest.fn();
  process.env.PORT = 6666;
  routesTest();
});

process.env.NODE_ENV = undefined;
