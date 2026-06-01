
const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true },
    phone:        { type: String, default: '' },
    role:         { type: String, default: 'Trainer' },
    specialties:  [{ type: String }],  
    availability: {
      type: String,
      enum: ['AVAILABLE', 'IN SESSION', 'OFF'],
      default: 'AVAILABLE',
    },
    certExpiry:   { type: Date },      
  },
  { timestamps: true }
)

module.exports = mongoose.model('Trainer', trainerSchema)
