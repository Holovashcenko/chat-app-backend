const Chat = require('../models/Chat')
const Message = require('../models/Message')

class MessageRepository {
  async createMessage(data) {
    const message = await Message.create(data)
    await Chat.findByIdAndUpdate(data.chatId, {
      $push: { messages: message._id },
    })
    return message
  }

  async getMessagesByChatId(chatId) {
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 }).populate('chatId', 'firstName lastName')

    if (messages.length === 0) return []

    return messages.map((message) => ({
      _id: message._id,
      content: message.content,
      owner: message.owner,
      createdAt: message.createdAt,
      id: message._id.toHexString(),
      chatName: `${message.chatId.firstName} ${message.chatId.lastName}`,
    }))
  }

  async deleteMessage(messageId) {
    const message = await Message.findById(messageId)

    if (!message) {
      throw new Error('Message not found')
    }

    await Chat.findByIdAndUpdate(message.chatId, {
      $pull: { messages: messageId },
    })

    await Message.findByIdAndDelete(messageId)

    return message
  }
}

module.exports = new MessageRepository()
