const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const routes = require('./routes')
require('dotenv').config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Server is running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
