
exports.up = function(knex) {
  return knex.schema.createTable('beers', t => {
    t.increments();
    t.string('name');
    t.string('beername');
    t.string('brewery');
    t.string('style');
    t.float('abv');
    t.integer('quantity');
    t.boolean('cold');
    t.text('image');
    t.float('price');
    t.string('size');
    t.timestamp('ordered');
    t.text('description');
    t.timestamp('updated_at');
    t.timestamp('created_at');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('beers');
};
