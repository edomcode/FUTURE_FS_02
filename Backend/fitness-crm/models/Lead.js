const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  text:      { type: String, required: true },
  createdBy: { type: String, default: 'Admin' },
  createdAt: { type: Date,   default: Date.now },
})

const leadSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    email:       { type: String, required: true, lowercase: true, trim: true },
    phone:       { type: String, default: '' },
    source:      {
      type: String,
      enum: ['Walk-in', 'Website', 'Referral', 'Social Media', 'Phone Call', 'Other'],
      default: 'Other',
    },
    interestedPlan: {
      type: String,
      enum: ['Trial Session', 'Monthly Basic', 'Premium Membership', 'Elite Membership', 'Personal Training'],
      default: 'Trial Session',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Follow-Up', 'Converted', 'Lost'],
      default: 'New',
    },
    followUpDate: { type: Date },
    notes:        [noteSchema],  
    assignedTo:   { type: String, default: 'Unassigned' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Lead', leadSchema)
