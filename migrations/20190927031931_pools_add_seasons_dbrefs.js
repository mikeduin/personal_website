exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.integer('season');
    t.string('db_ref');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.dropColumn('season');
    t.dropColumn('db_ref');
  })
};
