
const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')
const User    = require('../models/User')
const { protect } = require('../middleware/auth')


const generateToken = (id) =>
  jwt.sign(
    { id },                          
    process.env.JWT_SECRET,          
    { expiresIn: '7d' }             
  )


router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })

   
    const user = await User.create({ name, email, password, role })

    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body


    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })

   
    const match = await user.matchPassword(password)
    if (!match) return res.status(401).json({ message: 'Invalid email or password' })

    res.json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/me', protect, async (req, res) => {
  res.json(req.user)
})

module.exports = router
