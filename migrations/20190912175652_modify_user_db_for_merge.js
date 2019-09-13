exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.dropColumn('btbnfl17');
    t.string('plan');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.integer('btbnfl17');
    t.dropColumn('plan');
  })
};
