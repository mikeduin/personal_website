exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.specificType('deadlines', 'jsonb[]');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.dropColumn('deadlines');
  })
};
