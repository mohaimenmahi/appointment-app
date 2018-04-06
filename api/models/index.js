const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Scehma.Types.ObjectId;

const slotSchema = new Schema ({
  slot_time: String,
  slot_data: String,
  created_at: Date
});


const Slot = model('Slot', slotSchema);

const appointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  slots: {
    type: ObjectId,
    ref: 'Slot'
  },
  created_at: Date
});

const Appointment = model('Appointment', appointmentSchema);
