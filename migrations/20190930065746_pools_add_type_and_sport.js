exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.string('type');
    t.string('sport');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.dropColumn('type');
    t.dropColumn('sport');
  })
};
