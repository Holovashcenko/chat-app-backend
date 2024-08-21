const messageService = require('../services/messageService')
const { CREATE_MESSAGE_FAILED, FETCH_MESSAGES_FAILED, MESSAGE_NOT_FOUND } = require('../constants/errorMessages')

class MessageController {
  async createMessage(req, res) {
    const { chatId, content } = req.body

    try {
      if (!chatId || !content) {
        return res.status(400).json({ error: 'Chat ID and content are required' })
      }

      const newMessage = await messageService.createMessage({ chatId, content })
      res.status(201).json(newMessage)
    } catch (error) {
      res.status(500).json({ error: CREATE_MESSAGE_FAILED })
    }
  }

  async getMessages(req, res) {
    const { chatId } = req.params

    try {
      const messages = await messageService.getMessages(chatId)
      if (!messages || messages.length === 0) {
        return res.status(404).json({ error: MESSAGE_NOT_FOUND })
      }
      res.status(200).json(messages)
    } catch (error) {
      res.status(500).json({ error: FETCH_MESSAGES_FAILED })
    }
  }
}

module.exports = new MessageController()
