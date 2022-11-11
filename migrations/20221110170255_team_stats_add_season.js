exports.up = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.integer('season');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.dropColumn('season');
  })
};