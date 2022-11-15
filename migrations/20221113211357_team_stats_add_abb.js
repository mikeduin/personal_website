exports.up = function(knex) {
  return knex.schema.table('team_stats', function(t) {
    t.string('abb');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.dropColumn('abb');
  })
};