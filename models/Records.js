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
  static async create({ key, filename, year, data }) {
    const row = {
      key,
      filename,
      year: year || null,
      data: knex.raw('?::jsonb', [JSON.stringify(data || [])])
    };
    const [id] = await this.table().insert(row);
    return this.table().where({ id }).first();
  }

  static async updateById(id, payload) {
    const updates = Object.assign({}, payload, { updated_at: knex.fn.now() });
    if (typeof updates.data !== 'undefined') {
      updates.data = knex.raw('?::jsonb', [JSON.stringify(updates.data || [])]);
    }
    await this.table().where({ id }).update(updates);
    return this.table().where({ id }).first();
  }

  static async deleteById(id) {
    return this.table().where({ id }).del();
  }
}

module.exports = Records;
