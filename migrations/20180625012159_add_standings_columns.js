exports.up = function(knex, Promise) {
  return knex.schema.table('wc18bracket', function(t) {
    t.integer('exact_rank');
    t.integer('winner');
    t.integer('runner_up');
    t.integer('exact_order');
    t.integer('r16');
    t.integer('r8');
    t.integer('r4');
    t.integer('3rd');
    t.integer('champ');
    t.integer('total_score');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('wc18bracket', function(t) {
    t.dropColumn('exact_rank');
    t.dropColumn('winner');
    t.dropColumn('runner_up');
    t.dropColumn('exact_order');
    t.dropColumn('r16');
    t.dropColumn('r8');
    t.dropColumn('r4');
    t.dropColumn('3rd');
    t.dropColumn('champ');
    t.dropColumn('total_score');
  })
};
