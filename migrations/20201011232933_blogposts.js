
exports.up = function(knex) {
  return knex.schema.createTable('blogposts', t => {
    t.increments();
    t.string('title');
    t.string('titlestring');
    t.string('author');
    t.string('tags');
    t.timestamp('date');
    t.string('image');
    t.string('imageCaption');
    t.text('post');
    t.timestamp('created_at');
    t.timestamp('updated_at');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('blogposts');
};
