const messageRepository = require('../repositories/messageRepository')
const { getRandomQuote } = require('../utils/quoteUtil')

class MessageService {
  async createUserMessage(data) {
    return await messageRepository.createMessage({
      ...data,
      owner: 'me',
    })
  }

  async createAutoResponseMessage(chatId) {
    const quote = await getRandomQuote()
    const autoResponseMessage = {
      chatId,
      content: quote,
      owner: 'user',
    }

    return await messageRepository.createMessage(autoResponseMessage)
  }

  async createMessage(data) {
    const userMessage = await this.createUserMessage(data)
    await this.createAutoResponseMessage(data.chatId)
    return userMessage
  }

  async getMessages(chatId) {
    return messageRepository.getMessagesByChatId(chatId)
  }
}

module.exports = new MessageService()
