import express from 'express';
import Session from '../models/Session.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/bulk', auth, async (req, res) => {
  const { sessions } = req.body;
  const docs = sessions.map(s => ({
    user: req.user._id,
    origin: s.origin,
    start: new Date(s.start),
    end: new Date(s.end),
    durationMs: s.duration
  }));
  await Session.insertMany(docs);
  res.json({ ok: true });
});

router.get('/summary/:date', auth, async (req, res) => {
  const date = new Date(req.params.date);
  const start = new Date(date); start.setHours(0,0,0,0);
  const end = new Date(date); end.setHours(23,59,59,999);
  const agg = await Session.aggregate([
    { $match: { user: req.user._id, start: { $gte: start, $lte: end } } },
    { $group: { _id: "$origin", totalMs: { $sum: "$durationMs" } } },
    { $sort: { totalMs: -1 } }
  ]);
  res.json({ summary: agg });
});

export default router;
