const messageService = require('../services/messageService')
const Chat = require('../models/Chat')
const { getSocket } = require('../config/socket')
const { getAutoMessageStatus } = require('../config/autoMessageStatus') // Import the module

const sendRandomMessage = async () => {
  try {
    const autoMessageEnabled = getAutoMessageStatus()

    if (!autoMessageEnabled) {
      return
    }

    const chats = await Chat.find()
    if (chats.length === 0) {
      console.error('No chats available to send a message')
      return
    }

    const randomChat = chats[Math.floor(Math.random() * chats.length)]

    const newMessage = await messageService.createAutoResponseMessage(randomChat._id)

    const io = getSocket()
    if (io) {
      io.emit('newMessage', newMessage)
    } else {
      console.error('Socket.IO instance is not initialized')
    }
  } catch (error) {
    console.error('Error sending random message:', error)
  }
}

module.exports = sendRandomMessage
