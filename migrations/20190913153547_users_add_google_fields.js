exports.up = function(knex, Promise) {
  return knex.schema.table('users', (t) => {
    t.string('googleId');
    t.string('photo_url');
    t.specificType('nba_survivor', 'jsonb[]');
    t.specificType('mlb_survivor', 'jsonb[]');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users' (t) => {
    t.dropColumn('googleId');
    t.dropColumn('photo_url');
    t.dropColumn('nba_survivor', 'jsonb[]');
    t.dropColumn('mlb_survivor', 'jsonb[]');
  })
};
