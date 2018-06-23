
exports.up = function(knex, Promise) {
  return knex.schema.createTable('results', function(t){
    t.increments();
    t.timestamp('matchtime');
    t.string('stage');
    t.string('group');
    t.string('away_team');
    t.integer('away_goals');
    t.integer('away_points');
    t.string('home_team');
    t.integer('home_goals');
    t.integer('home_points');
    t.boolean('final');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('results');
};
