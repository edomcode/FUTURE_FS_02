// models/Booking.js
const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    client:    { type: mongoose.Schema.Types.ObjectId, ref: 'Client',   required: true },
    schedule:  { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
    status:    {
      type: String,
      enum: ['Confirmed', 'Pending', 'Cancelled'],
      default: 'Pending',
    },
    notes:     { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', bookingSchema)
