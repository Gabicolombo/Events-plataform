import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  description: { type: String},
  capacity: { type: Number},
  participants: [{ type: mongoose.Schema.Types.String, ref: 'User'}]
})

export default mongoose.model('Event', EventSchema);