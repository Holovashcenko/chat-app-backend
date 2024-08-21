const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')
const { validateChatCreation, validateChatUpdate } = require('../middleware/validationMiddleware')

router.get('/', chatController.getChats)

router.post('/', validateChatCreation, chatController.createChat)

router.put('/:id', validateChatUpdate, chatController.updateChat)

router.delete('/:id', chatController.deleteChat)

module.exports = router
