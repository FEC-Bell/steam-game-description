const { generateGameDesc, generateGameJoinCompanies } = require('../../db/utils');

describe('Data generation utils', () => {
  test('generateGameDesc generates 100 game descriptions with appropriate shapes', () => {
    let results = generateGameDesc();
    expect(results.length).toBe(100);
    results.forEach((result, idx) => {
      expect(result.id).toBe(idx + 1);
      expect(typeof result.description).toBe('string');
      // Matches ISODateString pattern (2020-06-06T00:00:00.000Z)
      expect(result.release_date).toMatch(/20\d{2}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z/);
    });
  });

  test('generateGameJoinCompanies generates between 100 and 300 join entries with appropriate shapes', () => {
    let results;
    // Run 10 times to ensure generation amount is correct & not a fluke
    for (let i = 0; i < 10; i++) {
      results = generateGameJoinCompanies();
      expect(results.length).toBeGreaterThanOrEqual(100);
      expect(results.length).toBeLessThanOrEqual(300);
    }

    let gameid = 1;

    results.forEach((resultObj, idx) => {
      expect(resultObj.id).toBe(idx + 1);
      // gameids should be generated from smallest to largest
      expect(resultObj.id_game).toBeGreaterThanOrEqual(gameid);
      if (resultObj.id_game > gameid) {
        gameid = resultObj.id_game;
      }
      expect(resultObj.id_game).toBeLessThanOrEqual(100);
      expect(resultObj.id_developer).toBeGreaterThanOrEqual(1);
      expect(resultObj.id_developer).toBeLessThanOrEqual(20);
      expect(resultObj.id_publisher).toBeGreaterThanOrEqual(1);
      expect(resultObj.id_publisher).toBeLessThanOrEqual(20);
      expect(resultObj.id_platform).toBeGreaterThanOrEqual(1);
      expect(resultObj.id_platform).toBeLessThanOrEqual(3);
    });
  });
});