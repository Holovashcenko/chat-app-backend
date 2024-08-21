const messageRepository = require('../repositories/messageRepository')
const { getRandomQuote } = require('../utils/quoteUtil')

class MessageService {
  async createMessage(data) {
    const userMessage = await messageRepository.createMessage({
      ...data,
      owner: 'me',
    })

    const quote = await getRandomQuote()
    const autoResponseMessage = {
      chatId: data.chatId,
      content: quote,
      owner: 'user',
    }
    await messageRepository.createMessage(autoResponseMessage)

    setTimeout(sendAutoResponse, 3000)

    return userMessage
  }

  async getMessages(chatId) {
    return messageRepository.getMessagesByChatId(chatId)
  }
}

module.exports = new MessageService()
