const chatService = require('../services/chatService')

exports.getChats = async (req, res) => {
  try {
    const chats = await chatService.getAllChats()
    res.json(chats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
