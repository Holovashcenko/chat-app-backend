const chatService = require('../services/chatService')
const predefinedChats = require('../data/predefinedChats')

async function initializeChats() {
  try {
    const existingChats = await chatService.getChats()
    if (existingChats.length === 0) {
      for (const chat of predefinedChats) {
        await chatService.createChat(chat)
      }
      console.log('Predefined chats added to the database')
    }
  } catch (error) {
    console.error('Error initializing chats:', error)
  }
}

module.exports = initializeChats
