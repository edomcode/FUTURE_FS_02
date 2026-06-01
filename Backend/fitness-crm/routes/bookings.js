
const express = require('express')
const router  = express.Router()
const Booking  = require('../models/Booking')
const Schedule = require('../models/Schedule')
const { protect } = require('../middleware/auth')


router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query
    const filter = {}
    if (status) filter.status = status

    const total    = await Booking.countDocuments(filter)
    const bookings = await Booking.find(filter)
      .populate('client',   'name email plan')
      .populate({ path: 'schedule', populate: { path: 'trainer', select: 'name' } })
    
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({ bookings, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('client', 'name email')
      .populate('schedule')
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.post('/', protect, async (req, res) => {
  try {
    const { client, schedule, status, notes } = req.body

  
    const cls = await Schedule.findById(schedule)
    if (!cls) return res.status(404).json({ message: 'Class not found' })
    if (cls.enrolled >= cls.capacity) {
      return res.status(400).json({ message: 'Class is full' })
    }

    const booking = await Booking.create({ client, schedule, status, notes })

 
    await Schedule.findByIdAndUpdate(schedule, { $inc: { enrolled: 1 } })
  

    res.status(201).json(booking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    res.json(booking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

   
    await Schedule.findByIdAndUpdate(booking.schedule, { $inc: { enrolled: -1 } })

    res.json({ message: 'Booking deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
