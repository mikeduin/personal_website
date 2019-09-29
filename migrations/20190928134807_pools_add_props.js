exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.boolean('bonus_active');
    t.integer('buyin_min');
    t.integer('lives');
    t.integer('rebuy_price');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pools', (t) => {
    t.dropColumn('bonus_active');
    t.dropColumn('buyin_min');
    t.dropColumn('lives');
    t.dropColumn('rebuy_price');
  })
};
