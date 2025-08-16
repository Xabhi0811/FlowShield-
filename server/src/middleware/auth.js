import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function (req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).send('No token');
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).send('User not found');
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
}
