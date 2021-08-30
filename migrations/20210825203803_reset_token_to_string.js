exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', (t) => {
    t.string('resetPasswordExpires').alter();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', (t) => {
    t.integer('resetPasswordExpires').alter();
  })
};