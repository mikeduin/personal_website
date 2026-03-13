exports.up = function(knex) {
  return knex.schema.createTable('season_data', function(t) {
    t.increments('id').primary();
    t.string('key').notNullable().unique().index();
    t.jsonb('data').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('season_data');
};
