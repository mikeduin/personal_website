exports.up = function(knex) {
  return knex.schema.alterTable('wc18bracket', t => {
    t.timestamp('created_at');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('wc18bracket', t => {
    t.dropColumn('created_at');
  })
};