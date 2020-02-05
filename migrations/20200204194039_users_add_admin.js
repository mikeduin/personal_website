exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', (t) => {
    t.boolean('admin').defaultTo('false');
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', (t) => {
    t.dropColumn('admin');
  })
};
