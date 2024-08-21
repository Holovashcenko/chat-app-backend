const chatRepository = require('../repositories/chatRepository')

class ChatService {
  async getChats() {
    return await chatRepository.getAllChats()
  }

  async createChat(chatData) {
    return await chatRepository.createChat(chatData)
  }

  async updateChat(id, chatData) {
    return await chatRepository.updateChat(id, chatData)
  }

  async deleteChat(id) {
    return await chatRepository.deleteChat(id)
  }

  async searchChats(query) {
    return chatRepository.searchChats(query)
  }
}

module.exports = new ChatService()
