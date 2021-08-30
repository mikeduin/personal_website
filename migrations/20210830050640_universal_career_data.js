
exports.up = function(knex) {
  return knex.schema.createTable('career_data', t => {
    t.increments();
    t.integer('rank');
    t.string('entrant');
    t.integer('games_entered');
    t.integer('total_entries');
    t.float('titles');
    t.float('podiums');
    t.float('avg_pct_rank');
    t.float('buyins');
    t.float('prizes');
    t.float('net_profits');
    t.integer('profits_rank');
    t.string('roi');
    t.timestamp('created_at');
    t.timestamp('updated_at');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('career_data')
};
