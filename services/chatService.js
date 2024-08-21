const chatRepository = require('../repositories/chatRepository')

exports.getAllChats = async () => {
  return await chatRepository.findAll()
}
