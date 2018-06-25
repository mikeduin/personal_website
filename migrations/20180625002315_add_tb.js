exports.up = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.integer('group_tb');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.dropColumn('group_tb');
  })
};
