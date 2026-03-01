 const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, default: '' },
  category:    { type: String, default: 'Haircut' },
  price:       { type: Number, required: true },
  duration:    { type: Number, required: true },
}, { timestamps: true })

ServiceSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Service', ServiceSchema)
