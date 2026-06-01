
const express = require('express')
const router  = express.Router()
const Payment = require('../models/Payment')
const { protect } = require('../middleware/auth')


router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query
    const filter = {}
    if (status) filter.status = status

    const total    = await Payment.countDocuments(filter)
    const payments = await Payment.find(filter)
      .populate('client', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

   
    const allPayments = await Payment.find()
    const totalRevenue = allPayments
      .filter(p => p.status === 'PAID')
      .reduce((sum, p) => sum + p.amount, 0)
    

    const pendingTotal = allPayments
      .filter(p => p.status === 'PENDING')
      .reduce((sum, p) => sum + p.amount, 0)

    const overdueTotal = allPayments
      .filter(p => p.status === 'OVERDUE')
      .reduce((sum, p) => sum + p.amount, 0)

    res.json({
      payments,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      summary: { totalRevenue, pendingTotal, overdueTotal },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/:id', protect, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('client', 'name email')
    if (!payment) return res.status(404).json({ message: 'Payment not found' })
    res.json(payment)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.post('/', protect, async (req, res) => {
  try {
    const payment = await Payment.create(req.body)
    res.status(201).json(payment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.put('/:id', protect, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!payment) return res.status(404).json({ message: 'Payment not found' })
    res.json(payment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.delete('/:id', protect, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id)
    if (!payment) return res.status(404).json({ message: 'Payment not found' })
    res.json({ message: 'Payment deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
