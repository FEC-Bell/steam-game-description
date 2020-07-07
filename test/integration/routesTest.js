const request = require('supertest');
const { app, server } = require('../../server/index');

export const routesTest = () => describe('/api/description/:gameid should return the correct data shape', () => {
  afterAll(async () => {
    await server.close();
  });

  test('Basic valid GET request', async () => {
    await request(app)
      .get('/api/description/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.id).toBe(1);
        expect(typeof res.body.description).toBe('string');
        expect(res.body.release_date).toMatch(/20\d{2}\-\d{2}\-\d{2}/);
        expect(res.body.developers).toBeInstanceOf(Array);
        expect(res.body.publishers).toBeInstanceOf(Array);
        expect(res.body.developers.length).toBe(res.body.publishers.length);
        res.body.developers.concat(res.body.publishers).forEach(item => {
          expect(item).toMatchObject({
            id: expect.any(Number),
            company: expect.any(String),
            platform: expect.stringMatching(/Windows|Mac|Linux/)
          });
        });
      });
  });

  test('GET request with client error', async () => {
    await request(app)
      .get('/api/description/101')
      .expect(400, { error: 'Invalid game id' });
  });
});

