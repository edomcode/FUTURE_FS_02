
const express = require('express')
const router  = express.Router()
const Client  = require('../models/Client')
const { protect } = require('../middleware/auth')


router.get('/', protect, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query
   

    const filter = {}
    if (status) filter.status = status
    if (search) {
    
      filter.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }

    const total   = await Client.countDocuments(filter)
    const clients = await Client.find(filter)
      .sort({ createdAt: -1 })       
      .skip((page - 1) * limit)         
      .limit(Number(limit))

    res.json({ clients, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/:id', protect, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    if (!client) return res.status(404).json({ message: 'Client not found' })
    res.json(client)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.post('/', protect, async (req, res) => {
  try {
    const client = await Client.create(req.body)
    res.status(201).json(client)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.put('/:id', protect, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
     
    )
    if (!client) return res.status(404).json({ message: 'Client not found' })
    res.json(client)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id)
    if (!client) return res.status(404).json({ message: 'Client not found' })
    res.json({ message: 'Client deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
