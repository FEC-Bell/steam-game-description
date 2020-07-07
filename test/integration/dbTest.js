const { getGameInfo } = require('../../db/index');

export const dbTest = () => describe('Database query methods', () => {
  test('getGameInfo gets description, release date, developers, and publishers for each gameid', async () => {
    let expected = [
      {
        id: 1,
        description: 'Description for game 1',
        release_date: '2013-06-01T00:00:00Z',
        developers: [
          {
            id: 1,
            company: 'Nintendo',
            platform: 'Windows'
          }
        ],
        publishers: [
          {
            id: 2,
            company: 'Konami',
            platform: 'Windows'
          }
        ]
      },
      {
        id: 2,
        description: 'Description for game 2',
        release_date: '2018-06-01T00:00:00Z',
        developers: [
          {
            id: 3,
            company: 'Valve',
            platform: 'Mac'
          },
          {
            id: 5,
            company: 'Activision',
            platform: 'Linux'
          }
        ],
        publishers: [
          {
            id: 4,
            company: 'Rockstar Games',
            platform: 'Mac'
          },
          {
            id: 6,
            company: 'Ubisoft',
            platform: 'Linux'
          }
        ]
      },
      {
        id: 3,
        description: 'Description for game 3',
        release_date: '2015-01-01T00:00:00Z',
        developers: [
          {
            id: 7,
            company: 'BioWare',
            platform: 'Windows'
          },
          {
            id: 9,
            company: 'Square Enix',
            platform: 'Mac'
          },
          {
            id: 11,
            company: 'Mojang',
            platform: 'Linux'
          }
        ],
        publishers: [
          {
            id: 8,
            company: 'Naughty Dog',
            platform: 'Windows'
          },
          {
            id: 10,
            company: 'Bungie',
            platform: 'Mac'
          },
          {
            id: 12,
            company: 'Take-Two Interactive',
            platform: 'Linux'
          }
        ]
      },
      {
        id: 4,
        description: 'Description for game 4',
        release_date: '2020-02-01T00:00:00Z',
        developers: [
          {
            id: 13,
            company: 'Blizzard Entertainment',
            platform: 'Windows'
          },
          {
            id: 15,
            company: 'Grinding Gear Games',
            platform: 'Linux'
          }
        ],
        publishers: [
          {
            id: 14,
            company: 'Bethesda',
            platform: 'Windows'
          },
          {
            id: 16,
            company: 'Aspyr',
            platform: 'Linux'
          }
        ]
      },
      {
        id: 5,
        description: 'Description for game 5',
        release_date: '2020-07-01T00:00:00Z',
        developers: [
          {
            id: 17,
            company: 'Annapurna Interactive',
            platform: 'Windows'
          },
          {
            id: 19,
            company: 'Microsoft',
            platform: 'Mac'
          }
        ],
        publishers: [
          {
            id: 18,
            company: 'Mobius Digital',
            platform: 'Windows'
          },
          {
            id: 20,
            company: 'Capcom',
            platform: 'Mac'
          }
        ]
      }
    ];
    for (let gameid = 1; gameid <= 5; gameid++) {
      let info = await getGameInfo(gameid);
      expect(info).toStrictEqual(expected[gameid - 1]);
    }
  });
});