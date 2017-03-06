
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_results', function(t){
    t.increments();
    t.string('name');
    t.string('game');
    t.integer('season');
    t.float('rank');
    t.integer('buyin');
    t.float('prize');
    t.float('profit');
    t.float('opponents');
    t.float('opponents_def');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_results');
};
