exports.up = function(knex, Promise) {
  return knex.schema.table('wc18bracket', function(t) {
    t.integer('season');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('wc18bracket', function(t) {
    t.dropColumn('season');
  })
};