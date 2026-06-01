const express = require('express')
const router  = express.Router()
const Lead    = require('../models/Lead')
const { protect } = require('../middleware/auth')

// ── GET /api/leads ─────────────────────────────────────────
// List all leads with optional search, status filter, pagination
router.get('/', protect, async (req, res) => {
  try {
    const { search, status, source, page = 1, limit = 10 } = req.query
    const filter = {}
    if (status) filter.status = status
    if (source) filter.source = source
    if (search) {
      filter.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ]
    }
    const total = await Lead.countDocuments(filter)
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({ leads, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── GET /api/leads/:id ─────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── POST /api/leads ────────────────────────────────────────
router.post('/', protect, async (req, res) => {
  try {
    const lead = await Lead.create(req.body)
    res.status(201).json(lead)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// ── PUT /api/leads/:id ─────────────────────────────────────
// Update lead fields (name, email, status, followUpDate, etc.)
router.put('/:id', protect, async (req, res) => {
  try {
    // Don't allow overwriting the notes array via this route
    const { notes, ...updateData } = req.body
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json(lead)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// ── PATCH /api/leads/:id/status ────────────────────────────
// Dedicated endpoint just for status changes (New → Contacted → Converted etc.)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body
    const allowed = ['New', 'Contacted', 'Follow-Up', 'Converted', 'Lost']
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${allowed.join(', ')}` })
    }
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json(lead)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// ── POST /api/leads/:id/notes ──────────────────────────────
// Add a note to a specific lead
router.post('/:id/notes', protect, async (req, res) => {
  try {
    const { text } = req.body
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Note text is required' })
    }
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $push: { notes: { text: text.trim(), createdBy: req.user?.name || 'Admin' } } },
      { new: true }
    )
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json(lead)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// ── DELETE /api/leads/:id/notes/:noteId ────────────────────
// Remove a specific note from a lead
router.delete('/:id/notes/:noteId', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $pull: { notes: { _id: req.params.noteId } } },
      { new: true }
    )
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── DELETE /api/leads/:id ──────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json({ message: 'Lead deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
