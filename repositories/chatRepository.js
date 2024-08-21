const Chat = require('../models/Chat')

class ChatRepository {
  async getAllChats() {
    return await Chat.find()
  }

  async createChat(chatData) {
    const newChat = new Chat(chatData)
    return await newChat.save()
  }

  async updateChat(id, chatData) {
    return await Chat.findByIdAndUpdate(id, chatData, { new: true })
  }

  async deleteChat(id) {
    return await Chat.findByIdAndDelete(id)
  }

  async searchChats(query) {
    return Chat.find({
      $or: [{ firstName: { $regex: query, $options: 'i' } }, { lastName: { $regex: query, $options: 'i' } }],
    })
  }
}

module.exports = new ChatRepository()
