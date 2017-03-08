
exports.up = function(knex, Promise) {
  return knex.schema.raw('alter table user_results alter column buyin type float');
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_results');
};
