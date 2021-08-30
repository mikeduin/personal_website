
exports.up = function(knex) {
  return knex.schema.alterTable('users', t => {
    t.timestamp('created_at');
    t.timestamp('updated_at');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', t => {
    t.dropColumn('created_at');
    t.dropColumn('updated_at');
  })
};
