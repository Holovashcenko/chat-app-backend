const Message = require('../models/Message')

class MessageRepository {
  async createMessage(data) {
    return await Message.create(data)
  }

  async getMessagesByChatId(chatId) {
    return await Message.find({ chatId }).sort({ createdAt: 1 })
  }
}

module.exports = new MessageRepository()
