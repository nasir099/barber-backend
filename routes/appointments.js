const router      = require('express').Router()
const Appointment = require('../models/Appointment')

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 })
    res.json(appointments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body)
    res.json(appointment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(appointment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router 
