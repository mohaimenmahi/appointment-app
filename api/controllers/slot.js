const { Appointment, Slot } = Model;

const slotController = {
  all(req, res) {
    // returs all slots
    Slot.find({}).exec((err, slots) => res.json(slots));
  }
};

module.exports = slotController;
