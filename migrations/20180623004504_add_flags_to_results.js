exports.up = function(knex, Promise) {
  return knex.schema.table('results', function(t) {
    t.foreign('home_flag').references('team_stats.');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('results', function(t) {
    t.dropColumn('group_pts');
  })
};
