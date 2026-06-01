
const express  = require('express')
const router   = express.Router()
const Client   = require('../models/Client')
const Trainer  = require('../models/Trainer')
const Schedule = require('../models/Schedule')
const Booking  = require('../models/Booking')
const Payment  = require('../models/Payment')
const { protect } = require('../middleware/auth')


router.get('/', protect, async (req, res) => {
  try {

    const [
      totalClients,
      activeClients,
      totalTrainers,
      availableTrainers,
      todayClasses,
      activeBookings,
      payments,
    ] = await Promise.all([
      Client.countDocuments(),
      Client.countDocuments({ status: 'Active' }),
      Trainer.countDocuments(),
      Trainer.countDocuments({ availability: 'AVAILABLE' }),
      Schedule.countDocuments({
        date: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),    // start of today
          $lte: new Date(new Date().setHours(23, 59, 59, 999)) // end of today
        }
      }),
      Booking.countDocuments({ status: 'Confirmed' }),
      Payment.find({ status: 'PAID' }),
    ])

    
    const monthlyRevenue = payments.reduce((sum, p) => sum + p.amount, 0)

  
    const recentPayments = await Payment.find()
      .populate('client', 'name')
      .sort({ createdAt: -1 })
      .limit(4)

   
    const todaySchedule = await Schedule.find({
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lte: new Date(new Date().setHours(23, 59, 59, 999)),
      }
    })
      .populate('trainer', 'name')
      .sort({ date: 1 })
      .limit(5)

    res.json({
      stats: {
        totalClients,
        activeClients,
        totalTrainers,
        availableTrainers,
        todayClasses,
        activeBookings,
        monthlyRevenue,
      },
      recentPayments,
      todaySchedule,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
