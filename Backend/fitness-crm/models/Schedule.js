
const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    type:        { type: String, enum: ['HIIT', 'YOGA', 'STRENGTH', 'SPIN', 'PILATES', 'BOXING', 'OTHER'], default: 'OTHER' },
    trainer:     { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  
    date:        { type: Date, required: true },
    durationMins:{ type: Number, default: 60 },
    capacity:    { type: Number, default: 20 },
    enrolled:    { type: Number, default: 0 },
    status:      {
      type: String,
      enum: ['CONFIRMED', 'CONTACTING WAITLIST', 'NEW BOOKING', 'CANCELLED'],
      default: 'NEW BOOKING',
    },
    imageUrl:    { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Schedule', scheduleSchema)
