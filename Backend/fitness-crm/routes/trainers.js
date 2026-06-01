
const express = require('express')
const router  = express.Router()
const Trainer = require('../models/Trainer')
const { protect } = require('../middleware/auth')

router.get('/', protect, async (req, res) => {
  try {
    const { availability, search, page = 1, limit = 10 } = req.query
    const filter = {}
    if (availability) filter.availability = availability
    if (search) {
      filter.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }
    const total    = await Trainer.countDocuments(filter)
    const trainers = await Trainer.find(filter)
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({ trainers, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/:id', protect, async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id)
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' })
    res.json(trainer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.post('/', protect, async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body)
    res.status(201).json(trainer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.put('/:id', protect, async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' })
    res.json(trainer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.delete('/:id', protect, async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id)
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' })
    res.json({ message: 'Trainer deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
