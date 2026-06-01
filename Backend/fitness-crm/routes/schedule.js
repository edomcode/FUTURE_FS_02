
const express  = require('express')
const router   = express.Router()
const Schedule = require('../models/Schedule')
const { protect } = require('../middleware/auth')


router.get('/', protect, async (req, res) => {
  try {
    const { type, from, to, page = 1, limit = 20 } = req.query
    const filter = {}
    if (type) filter.type = type
    if (from || to) {
      filter.date = {}
      if (from) filter.date.$gte = new Date(from)   
      if (to)   filter.date.$lte = new Date(to)    
    }

    const total    = await Schedule.countDocuments(filter)
    const classes  = await Schedule.find(filter)
      .populate('trainer', 'name email availability')
     
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({ classes, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/:id', protect, async (req, res) => {
  try {
    const cls = await Schedule.findById(req.params.id).populate('trainer', 'name email')
    if (!cls) return res.status(404).json({ message: 'Class not found' })
    res.json(cls)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.post('/', protect, async (req, res) => {
  try {
    const cls = await Schedule.create(req.body)
    res.status(201).json(cls)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.put('/:id', protect, async (req, res) => {
  try {
    const cls = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!cls) return res.status(404).json({ message: 'Class not found' })
    res.json(cls)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.delete('/:id', protect, async (req, res) => {
  try {
    const cls = await Schedule.findByIdAndDelete(req.params.id)
    if (!cls) return res.status(404).json({ message: 'Class not found' })
    res.json({ message: 'Class deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
