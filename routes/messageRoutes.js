const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')

router.post('/', messageController.createMessage)

router.get('/:chatId', messageController.getMessages)

router.post('/auto-message/toggle', messageController.updateAutoMessageStatus)

module.exports = router
