exports.up = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.integer('group_pts');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.dropColumn('group_pts');
  })
};
