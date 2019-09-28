exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.specificType('props', 'jsonb[]');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.dropColumn('props');
  })
};
