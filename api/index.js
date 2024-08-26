const express = require('express')
const http = require('http')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('../config/db')
const routes = require('../routes')
const initializeChats = require('../config/initChats')
const sendRandomMessage = require('../config/randomMessageSender')
const { initSocket } = require('../config/socket')

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
)
app.use(express.json())
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Server is running')
})

connectDB()
initializeChats()

const server = http.createServer(app)

initSocket(server)

setInterval(() => {
  sendRandomMessage()
}, 180000)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
