 
const mongoose = require('mongoose')

const BarberSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  specialty: { type: String, default: '' },
  phone:     { type: String, default: '' },
  email:     { type: String, default: '' },
  status:    { type: String, default: 'active' },
  rating:    { type: Number, default: 4.5 },
  clients:   { type: Number, default: 0 },
}, { timestamps: true })

BarberSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Barber', BarberSchema)