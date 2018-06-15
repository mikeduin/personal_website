
exports.up = function(knex, Promise) {
  return knex.schema.createTable('team_stats', function(t){
    t.string('team');
    t.string('group');
    t.integer('group_1st');
    t.integer('group_2nd');
    t.integer('group_3rd');
    t.integer('group_4th');
    t.integer('round_8');
    t.integer('round_4');
    t.integer('round_2');
    t.integer('3rd_place');
    t.integer('champion');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('team_stats');
};
