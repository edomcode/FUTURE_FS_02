
const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
  {
    client:      { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    description: { type: String, required: true },   
    amount:      { type: Number, required: true },    
    status:      {
      type: String,
      enum: ['PAID', 'PENDING', 'OVERDUE'],
      default: 'PENDING',
    },
    dueDate:     { type: Date },
    paidAt:      { type: Date },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Payment', paymentSchema)
