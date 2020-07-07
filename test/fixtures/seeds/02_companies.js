exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(() => {
      // Inserts seed entries
      return knex('companies').insert([
        { id: 1, company: 'Nintendo' },
        { id: 2, company: 'Konami' },
        { id: 3, company: 'Valve' },
        { id: 4, company: 'Rockstar Games' },
        { id: 5, company: 'Activision' },
        { id: 6, company: 'Ubisoft' },
        { id: 7, company: 'BioWare' },
        { id: 8, company: 'Naughty Dog' },
        { id: 9, company: 'Square Enix' },
        { id: 10, company: 'Bungie' },
        { id: 11, company: 'Mojang' },
        { id: 12, company: 'Take-Two Interactive' },
        { id: 13, company: 'Blizzard Entertainment' },
        { id: 14, company: 'Bethesda' },
        { id: 15, company: 'Grinding Gear Games' },
        { id: 16, company: 'Aspyr' },
        { id: 17, company: 'Annapurna Interactive' },
        { id: 18, company: 'Mobius Digital' },
        { id: 19, company: 'Microsoft' },
        { id: 20, company: 'Capcom' }
      ]);
    });
};
