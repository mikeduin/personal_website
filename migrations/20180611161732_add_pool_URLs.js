exports.up = function(knex, Promise) {
  return knex.schema.table('pools', function(t) {
    t.string('externalURL');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('pools', function(t) {
    t.dropColumn('externalURL');
  })
};
