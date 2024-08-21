const messageService = require('../services/messageService')
const { CREATE_MESSAGE_FAILED, FETCH_MESSAGES_FAILED } = require('../constants/errorMessages')

class MessageController {
  async createMessage(req, res, next) {
    try {
      const { chatId, content } = req.body
      if (!chatId || !content) {
        return res.status(400).json({ error: 'Chat ID and content are required' })
      }
      const newMessage = await messageService.createMessage({ chatId, content })
      res.status(201).json(newMessage)
    } catch (error) {
      next(new Error(CREATE_MESSAGE_FAILED))
    }
  }

  async getMessages(req, res, next) {
    const { chatId } = req.params
    try {
      const messages = await messageService.getMessages(chatId)
      res.status(200).json(messages)
    } catch (error) {
      next(new Error(FETCH_MESSAGES_FAILED))
    }
  }
}

module.exports = new MessageController()
