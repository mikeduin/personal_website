// Note: this does NOT actually add flags to results, just didn't want to mess with name

exports.up = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.integer('group_goal_dif');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.dropColumn('group_goal_dif');
  })
};