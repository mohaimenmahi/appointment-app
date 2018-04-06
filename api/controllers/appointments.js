const { Appointment, Slot } = Model;
const nexmo = require('nexmo');

const appointmentController = {
  all(req, res) {
    // Returns  all appointments
    Appointment.find({}).exec((err, appointments) => {
      res.json(appointments);
    });
  },
  create(req, res) {
    var requestBody = req.body;

    var newslot = new Slot ({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newslot.save();
    // Creates a new record from submitted form
    var newappointment = new Appointment ({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id
    });

    const nexmo = new Nexmo ({
      apiKey: 'f21f83ff',
      apiSecret: 'tqOV5lDMsagCiljQ'
    });

    let msg =
      requestBody.name + " " +
      "this message is to confirm your appointment at" +
      " " +
      requestBody.appointment;

      //saves the record to the database
      newappointment.save((err, saved) => {
        // returns the saved appointment after successful saved
        Appointment.find({__id: saved.id})
          .populate("slots")
          .exec((err, appointment) => {
            res.json(appointment);
          });

        const from = VIRTUAL_NUMBER;
        const to = RECIPIENT_NUMBER;

        nexmo.message.sendSms(from, to, msg, (err, responseData) => {
          if(err) {
            console.log(err);
          } else {
            console.dir(responseData);
          }
        });
      });
  }
};

module.exports = appointmentController;
