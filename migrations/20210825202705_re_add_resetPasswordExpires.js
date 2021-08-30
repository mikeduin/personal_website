exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', (t) => {
    t.integer('resetPasswordExpires');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', (t) => {
    t.dropColumn('resetPasswordExpires');
  })
};