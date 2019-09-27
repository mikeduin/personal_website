exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.boolean('joinable');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.dropColumn('joinable');
  })
};
