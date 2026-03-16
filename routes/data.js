var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');
var Podiums = require('../models/Podiums');
var Records = require('../models/Records');
var SeasonData = require('../models/SeasonData');

function Pools() { return knex('pools'); }

// simple admin check: allow writes when NODE_ENV !== 'production' OR when
// request includes matching x-admin-token header equal to process.env.ADMIN_TOKEN
function getJwtFromRequest(req) {
  var authHeader = req.headers['authorization'] || '';
  if (typeof authHeader === 'string' && authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice(7).trim();
  }

  var headerToken = req.headers['x-login-token'];
  if (headerToken) return String(headerToken).trim();

  if (req.cookies && req.cookies.jwt) return String(req.cookies.jwt).trim();
  return '';
}

function isAuthorizedAdminUser(req) {
  var token = getJwtFromRequest(req);
  if (!token || !process.env.SESSION_SECRET) return false;

  try {
    var payload = jwt.verify(token, process.env.SESSION_SECRET);
    return payload && payload.username === 'mikeduin';
  } catch (err) {
    return false;
  }
}

function ensureAdmin(req, res, next) {
  if (process.env.NODE_ENV !== 'production') return next();
  const token = req.headers['x-admin-token'];
  if (process.env.ADMIN_TOKEN && token && token === process.env.ADMIN_TOKEN) return next();
  if (isAuthorizedAdminUser(req)) return next();
  return res.status(403).json({ error: 'admin access required' });
}

function nullableNumber(value) {
  if (value === null || typeof value === 'undefined' || String(value).trim() === '') return null;
  var parsed = Number(value);
  return isNaN(parsed) ? null : parsed;
}

function nullableBoolean(value) {
  if (value === null || typeof value === 'undefined' || value === '') return null;
  if (typeof value === 'boolean') return value;
  var text = String(value).trim().toLowerCase();
  if (text === 'true' || text === '1' || text === 'yes') return true;
  if (text === 'false' || text === '0' || text === 'no') return false;
  return null;
}

function nullableTimestamp(value) {
  if (!value && value !== 0) return null;
  var date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

function sanitizePoolPayload(body, options) {
  var partial = !!(options && options.partial);
  var payload = {};

  function assign(field, value) {
    if (!partial || Object.prototype.hasOwnProperty.call(body, field)) {
      payload[field] = value;
    }
  }

  assign('name', body.name || null);
  assign('alias', body.alias || null);
  assign('buyin', body.buyin || null);
  assign('entrants', nullableNumber(body.entrants));
  assign('start_time', nullableTimestamp(body.start_time));
  assign('end_time', nullableTimestamp(body.end_time));
  assign('homepage', body.homepage || null);
  assign('externalURL', body.externalURL || null);
  assign('joinable', nullableBoolean(body.joinable));
  assign('season', nullableNumber(body.season));
  assign('db_ref', body.db_ref || null);
  assign('bonus_active', nullableBoolean(body.bonus_active));
  assign('buyin_min', nullableNumber(body.buyin_min));
  assign('lives', nullableNumber(body.lives));
  assign('rebuy_price', nullableNumber(body.rebuy_price));
  assign('weeks', nullableNumber(body.weeks));
  assign('deadlines', Array.isArray(body.deadlines) ? body.deadlines : null);
  assign('type', body.type || null);
  assign('sport', body.sport || null);
  assign('open', nullableBoolean(body.open));

  return payload;
}

// GET /api/pools -> all pools (admin use)
router.get('/pools', async function(req, res, next){
  try {
    var rows = await Pools().select('*').orderBy('start_time', 'desc').orderBy('id', 'desc');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/pools -> create a pool (admin only)
router.post('/pools', ensureAdmin, async function(req, res, next){
  try {
    var payload = sanitizePoolPayload(req.body || {});
    if (!payload.name || !payload.alias) {
      return res.status(400).json({ error: 'name and alias are required' });
    }

    var inserted = await Pools().insert(payload, '*');
    res.json(inserted[0]);
  } catch (err) {
    next(err);
  }
});

// PUT /api/pools/:id -> update a pool (admin only)
router.put('/pools/:id', ensureAdmin, async function(req, res, next){
  try {
    var id = req.params.id;
    var payload = sanitizePoolPayload(req.body || {}, { partial: true });
    if (!payload.name || !payload.alias) {
      return res.status(400).json({ error: 'name and alias are required' });
    }

    var updated = await Pools().where({ id: id }).update(payload, '*');
    if (!updated || !updated.length) {
      return res.status(404).json({ error: 'pool not found' });
    }
    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/pools/:id -> delete a pool (admin only)
router.delete('/pools/:id', ensureAdmin, async function(req, res, next){
  try {
    var id = req.params.id;
    var deleted = await Pools().where({ id: id }).del();
    if (!deleted) return res.status(404).json({ error: 'pool not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/podiums  -> list available keys
router.get('/podiums', async function(req, res, next){
  try {
    const keys = await Podiums.listKeys();
    res.json(keys);
  } catch (err) {
    next(err);
  }
});

// GET /api/podiums/:key  -> return all rows for a given key
router.get('/podiums/:key', async function(req, res, next){
  try {
    const key = req.params.key;
    const rows = await Podiums.findByKey(key);
    res.json(rows.map(r => ({ id: r.id, filename: r.filename, year: r.year, data: r.data })));
  } catch (err) {
    next(err);
  }
});

// GET /api/podiums/:key/:filename  -> return a single named file record
router.get('/podiums/:key/:filename', async function(req, res, next){
  try {
    const key = req.params.key;
    const filename = req.params.filename;
    const row = await knex('podiums').where({ key: key, filename: filename }).first();
    if (!row) return res.status(404).json({ error: 'not found' });
    res.json(row);
  } catch (err) {
    next(err);
  }
});

// GET /api/records -> list
router.get('/records', async function(req, res, next){
  try {
    const keys = await Records.listKeys();
    res.json(keys);
  } catch (err) { next(err); }
});

// GET /api/records/:key -> rows
router.get('/records/:key', async function(req, res, next){
  try {
    const key = req.params.key;
    const rows = await Records.findByKey(key);
    res.json(rows.map(r => ({ id: r.id, filename: r.filename, year: r.year, data: r.data })));
  } catch (err) { next(err); }
});

// GET /api/records/:key/:filename -> single
router.get('/records/:key/:filename', async function(req, res, next){
  try {
    const row = await Records.findByKeyAndFilename(req.params.key, req.params.filename);
    if (!row) return res.status(404).json({ error: 'not found' });
    res.json(row);
  } catch (err) { next(err); }
});

// Write endpoints for podiums
router.post('/podiums', ensureAdmin, async function(req, res, next){
  try {
    const payload = req.body; // expect { key, filename, year?, data }
    const row = await Podiums.create(payload);
    res.json(row);
  } catch (err) { next(err); }
});

router.put('/podiums/:id', ensureAdmin, async function(req, res, next){
  try {
    const id = req.params.id;
    const updated = await Podiums.updateById(id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete('/podiums/:id', ensureAdmin, async function(req, res, next){
  try {
    const id = req.params.id;
    await Podiums.deleteById(id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

// Write endpoints for records
router.post('/records', ensureAdmin, async function(req, res, next){
  try {
    const payload = req.body; // { key, filename, year?, data }
    const row = await Records.create(payload);
    res.json(row);
  } catch (err) { next(err); }
});

router.put('/records/:id', ensureAdmin, async function(req, res, next){
  try {
    const id = req.params.id;
    const updated = await Records.updateById(id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete('/records/:id', ensureAdmin, async function(req, res, next){
  try {
    const id = req.params.id;
    await Records.deleteById(id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

// GET /api/season-data -> list
router.get('/season-data', async function(req, res, next){
  try {
    const keys = await SeasonData.listKeys();
    res.json(keys);
  } catch (err) { next(err); }
});

// GET /api/season-data/:key -> rows
router.get('/season-data/:key', async function(req, res, next){
  try {
    const rows = await SeasonData.findByKey(req.params.key);
    res.json(rows.map(r => ({ id: r.id, key: r.key, data: r.data })));
  } catch (err) { next(err); }
});

// write endpoints for season-data
router.post('/season-data', ensureAdmin, async function(req, res, next){
  try {
    const payload = { key: req.body.key, data: req.body.data };
    const row = await SeasonData.create(payload);
    res.json(row);
  } catch (err) { next(err); }
});

router.put('/season-data/:id', ensureAdmin, async function(req, res, next){
  try {
    const payload = { key: req.body.key, data: req.body.data };
    const row = await SeasonData.updateById(req.params.id, payload);
    res.json(row);
  } catch (err) { next(err); }
});

router.delete('/season-data/:id', ensureAdmin, async function(req, res, next){
  try {
    await SeasonData.deleteById(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;


