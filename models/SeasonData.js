const knex = require('../db/knex');

class SeasonData {
  static table() { return knex('season_data'); }

  static async listKeys() {
    const rows = await this.table().distinct('key');
    return rows.map(r => r.key);
  }

  static async findByKey(key) {
    return this.table().where({ key }).select('id', 'key', 'data');
  }

  static async create({ key, data }) {
    const row = {
      key,
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
    delete updates.filename;
    delete updates.year;
    await this.table().where({ id }).update(updates);
    return this.table().where({ id }).first();
  }

  static async deleteById(id) {
    return this.table().where({ id }).del();
  }
}

module.exports = SeasonData;
