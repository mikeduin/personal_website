const knex = require('../db/knex');

class Podiums {
  static table() {
    return knex('podiums');
  }

  static async listKeys() {
    const rows = await this.table().distinct('key');
    return rows.map(r => r.key);
  }

  static async findByKey(key) {
    return this.table().where({ key }).select('id','filename','year','data');
  }

  static async findByKeyAndFilename(key, filename) {
    return this.table().where({ key, filename }).first();
  }
}

module.exports = Podiums;
