const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
require('dotenv').config({ path: __dirname + '/.env' })

const app = express()

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'https://barber-dashboard-steel.vercel.app'] }))
app.use(express.json())

app.use('/api/barbers',      require('./routes/barbers'))
app.use('/api/services',     require('./routes/services'))
app.use('/api/appointments', require('./routes/appointments'))

app.get('/', (req, res) => {
  res.json({ message: '✅ Barber API is running!' })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(process.env.PORT || 3001, () => {
      console.log('🚀 Server running at http://localhost:3001')
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
  })