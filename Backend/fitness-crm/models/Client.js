
const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:    { type: String, default: '' },
    plan:     {
      type: String,
      enum: ['Premium Membership', 'Elite Membership', 'Monthly Basic', 'Personal Training', 'Trial Session'],
      default: 'Trial Session',
    },
    status:   { type: String, enum: ['Active', 'Inactive', 'Trial'], default: 'Trial' },
    joinedAt: { type: Date, default: Date.now },
    notes:    { type: String, default: '' },
  },
  { timestamps: true }  
)

module.exports = mongoose.model('Client', clientSchema)
