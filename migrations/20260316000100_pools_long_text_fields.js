exports.up = function(knex) {
  return knex.schema.raw(`
    ALTER TABLE pools
      ALTER COLUMN homepage TYPE text,
      ALTER COLUMN "externalURL" TYPE text,
      ALTER COLUMN db_ref TYPE text;
  `);
};

exports.down = function(knex) {
  return knex.schema.raw(`
    ALTER TABLE pools
      ALTER COLUMN homepage TYPE varchar(255),
      ALTER COLUMN "externalURL" TYPE varchar(255),
      ALTER COLUMN db_ref TYPE varchar(255);
  `);
};
