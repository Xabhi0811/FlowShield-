import mongoose from 'mongoose';
const SessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  origin: String,
  start: Date,
  end: Date,
  durationMs: Number
}, { timestamps: true });

export default mongoose.model('Session', SessionSchema);
