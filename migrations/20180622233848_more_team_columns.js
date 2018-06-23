exports.up = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.integer('group_gp');
    t.integer('group_w');
    t.integer('group_l');
    t.integer('group_d');
    t.integer('group_goals');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('team_stats', function(t) {
    t.dropColumn('group_gp');
    t.dropColumn('group_w');
    t.dropColumn('group_l');
    t.dropColumn('group_d');
    t.dropColumn('group_goals');
  })
};
