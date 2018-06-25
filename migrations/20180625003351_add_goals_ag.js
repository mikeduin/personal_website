exports.up = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.integer('group_goals_ag');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.dropColumn('group_goals_ag');
  })
};
