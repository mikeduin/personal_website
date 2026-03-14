exports.up = function(knex) {
  return knex.schema.createTable('records', function(t) {
    t.increments('id').primary();
    t.string('key').notNullable().index();
    t.string('filename').notNullable();
    t.integer('year').nullable().index();
    t.jsonb('data').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('records');
};
