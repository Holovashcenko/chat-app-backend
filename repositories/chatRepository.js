const Chat = require('../models/Chat')

class ChatRepository {
  async getAllChats() {
    const chats = await Chat.find().populate('messages').lean()
    return chats.map((chat) => ({
      ...chat,
      lastMessageContent: chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : null,
      lastMessageDate: chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].createdAt : null,
    }))
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
    const chats = await Chat.find({
      $or: [{ firstName: { $regex: query, $options: 'i' } }, { lastName: { $regex: query, $options: 'i' } }],
    })
      .populate('messages')
      .lean()

    return chats.map((chat) => ({
      ...chat,
      lastMessageContent: chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : null,
      lastMessageDate: chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].createdAt : null,
    }))
  }
}

module.exports = new ChatRepository()
