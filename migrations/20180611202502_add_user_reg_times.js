exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.timestamp('registered');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.dropColumn('registered');
  })
};
