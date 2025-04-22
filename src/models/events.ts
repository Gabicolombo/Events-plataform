import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  description: { type: String},
  capacity: { type: Number},
  participants: [{ type: mongoose.Schema.Types.String, ref: 'User'}],
  date: { type: String, required: true},
  location: { type: String, required: true},
  status: { type: String, required: true, enum: ['active', 'inactive']},
})

export default mongoose.model('Event', EventSchema);