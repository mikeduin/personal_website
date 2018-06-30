exports.up = function(knex, Promise) {
  return knex.schema.table('results', function(t) {
    t.string('winner');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('results', function(t) {
    t.dropColumn('winner');
  })
};
