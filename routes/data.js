var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');
var Podiums = require('../models/Podiums');
var Records = require('../models/Records');
var SeasonData = require('../models/SeasonData');

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


