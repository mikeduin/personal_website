exports.up = function(knex, Promise) {
  return knex.schema.createTable('wc18bracket', function(t) {
    t.increments();
    t.string('username');
    t.specificType('groupSelections', 'jsonb[]');
    t.specificType('bracketSelections', 'jsonb[]');
    t.timestamp('modified');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('wc18bracket');
};
