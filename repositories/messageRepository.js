const Message = require('../models/Message')

class MessageRepository {
  async createMessage(data) {
    return Message.create(data)
  }

  async getMessagesByChatId(chatId) {
    return Message.find({ chatId }).sort({ createdAt: 1 })
  }
}

module.exports = new MessageRepository()
