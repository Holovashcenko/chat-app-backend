const messageService = require('../services/messageService')
const { CREATE_MESSAGE_FAILED, FETCH_MESSAGES_FAILED } = require('../constants/errorMessages')
const { getSocket } = require('../config/socket')
const { setAutoMessageStatus } = require('../config/autoMessageStatus')

class MessageController {
  async createMessage(req, res) {
    const { chatId, content } = req.body

    if (!chatId || !content) {
      return res.status(400).json({ error: 'Chat ID and content are required' })
    }

    try {
      const userMessage = await messageService.createUserMessage({ chatId, content })

      const io = getSocket()
      if (io) {
        io.emit('newMessage', userMessage)

        setTimeout(async () => {
          try {
            const autoResponseMessage = await messageService.createAutoResponseMessage(chatId)
            io.emit('newMessage', autoResponseMessage)
          } catch (error) {
            console.error('Error creating auto-response message:', error)
          }
        }, 3000)
      } else {
        console.error('Socket.IO instance is not initialized')
      }

      res.status(201).json(userMessage)
    } catch (error) {
      console.error('Error creating message:', error)
      res.status(500).json({ error: CREATE_MESSAGE_FAILED })
    }
  }

  async getMessages(req, res) {
    const { chatId } = req.params

    try {
      const messages = await messageService.getMessages(chatId)
      res.status(200).json(messages)
    } catch (error) {
      console.error('Error fetching messages:', error)
      res.status(500).json({ error: FETCH_MESSAGES_FAILED })
    }
  }

  async updateAutoMessageStatus(req, res) {
    const { enabled } = req.body

    try {
      setAutoMessageStatus(enabled)
      res.status(200).json({ message: 'Auto message status updated' })
    } catch (error) {
      console.error('Error updating auto message status:', error)
      res.status(500).json({ error: 'Failed to update auto message status' })
    }
  }
}

module.exports = new MessageController()
