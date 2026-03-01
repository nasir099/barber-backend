 
const router = require('express').Router()
const Barber = require('../models/Barber')

router.get('/', async (req, res) => {
  try {
    const barbers = await Barber.find().sort({ createdAt: 1 })
    res.json(barbers)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const barber = await Barber.create(req.body)
    res.json(barber)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const barber = await Barber.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(barber)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Barber.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router