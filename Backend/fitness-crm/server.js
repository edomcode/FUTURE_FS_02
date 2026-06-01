
const express  = require('express')
const cors     = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()  

const app = express()


app.use(cors())

app.use(express.json())


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err))


app.use('/api/clients',  require('./routes/clients'))
app.use('/api/trainers', require('./routes/trainers'))
app.use('/api/schedule', require('./routes/schedule'))
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/payments', require('./routes/payments'))
app.use('/api/auth',     require('./routes/auth'))
app.use('/api/dashboard',require('./routes/dashboard'))
app.use('/api/leads',    require('./routes/leads'))


app.get('/', (req, res) => {
  res.json({ message: 'FitFlow CRM API is running 🚀' })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
