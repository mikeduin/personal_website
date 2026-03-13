const knex = require('../db/knex');

class Records {
  static table() { return knex('records'); }

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

module.exports = Records;
