exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.integer('weeks');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.dropColumn('weeks');
  })
};
