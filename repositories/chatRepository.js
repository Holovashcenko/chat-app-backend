const Chat = require('../models/Chat')

exports.findAll = async () => {
  return await Chat.find()
}
