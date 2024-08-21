const chatService = require('../services/chatService')
const { CHAT_DELETED_SUCCESSFULLY } = require('../constants/successMessages')
const {
  FETCH_CHATS_FAILED,
  CREATE_CHAT_FAILED,
  UPDATE_CHAT_FAILED,
  DELETE_CHAT_FAILED,
  CHAT_NOT_FOUND,
} = require('../constants/errorMessages')

class ChatController {
  async getChats(req, res) {
    try {
      const chats = await chatService.getChats()
      res.status(200).json(chats)
    } catch (error) {
      res.status(500).json({ error: FETCH_CHATS_FAILED })
    }
  }

  async createChat(req, res) {
    const { firstName, lastName } = req.body

    try {
      const newChat = await chatService.createChat({ firstName, lastName })
      res.status(201).json(newChat)
    } catch (error) {
      res.status(500).json({ error: CREATE_CHAT_FAILED })
    }
  }

  async updateChat(req, res) {
    const { id } = req.params
    const { firstName, lastName } = req.body

    try {
      const updatedChat = await chatService.updateChat(id, { firstName, lastName })
      if (!updatedChat) {
        return res.status(404).json({ error: CHAT_NOT_FOUND })
      }
      res.status(200).json(updatedChat)
    } catch (error) {
      res.status(500).json({ error: UPDATE_CHAT_FAILED })
    }
  }

  async deleteChat(req, res) {
    const { id } = req.params

    try {
      const deletedChat = await chatService.deleteChat(id)
      if (!deletedChat) {
        return res.status(404).json({ error: CHAT_NOT_FOUND })
      }
      res.status(200).json({ message: CHAT_DELETED_SUCCESSFULLY })
    } catch (error) {
      res.status(500).json({ error: DELETE_CHAT_FAILED })
    }
  }

  async searchChats(req, res) {
    const { query } = req.query

    try {
      const chats = await chatService.searchChats(query)
      res.status(200).json(chats)
    } catch (error) {
      res.status(500).json({ error: FETCH_CHATS_FAILED })
    }
  }
}

module.exports = new ChatController()
