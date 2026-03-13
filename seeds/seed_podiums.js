const fs = require('fs');
const path = require('path');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('podiums').del();

  const dir = path.join(process.cwd(), 'public', 'javascripts', 'alapodiums');
  if (!fs.existsSync(dir)) {
    console.warn('alapodiums folder not found at', dir);
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const inserts = [];

  files.forEach(filename => {
    const filePath = path.join(dir, filename);
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(raw);
      const key = filename.replace(/\.json$/i, '');
      inserts.push({ key: key, filename: filename, data: JSON.stringify(parsed) });
    } catch (err) {
      console.error('failed to read/parse', filePath, err.message);
    }
  })

  if (inserts.length) {
    // insert as JSONB
    for (const row of inserts) {
      await knex('podiums').insert({ key: row.key, filename: row.filename, data: knex.raw('?', [row.data]) });
    }
  }
};
