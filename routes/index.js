const express = require('express')
const router = express.Router()

const chatRoutes = require('./chatRoutes')
const messageRoutes = require('./messageRoutes')

router.use('/chats', chatRoutes)
router.use('/messages', messageRoutes)

module.exports = router
