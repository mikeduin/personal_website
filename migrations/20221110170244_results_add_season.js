exports.up = function(knex, Promise) {
  return knex.schema.table('results', function(t) {
    t.integer('season');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('results', function(t) {
    t.dropColumn('season');
  })
};