exports.up = function(knex, Promise) {
  return knex.schema.createTable('pools', function(t) {
    t.increments();
    t.string('name');
    t.string('alias');
    t.string('buyin');
    t.integer('entrants');
    t.timestamp('start_time');
    t.timestamp('end_time');
    t.string('homepage');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pools');
};
