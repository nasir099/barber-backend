const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  barber:   { type: String, default: '' },
  service:  { type: String, default: '' },
  date:     { type: String, default: '' },
  time:     { type: String, default: '' },
  status:   { type: String, default: 'pending' },
}, { timestamps: true })

AppointmentSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Appointment', AppointmentSchema)