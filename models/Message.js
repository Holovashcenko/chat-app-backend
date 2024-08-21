const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000,
  },
  owner: {
    type: String,
    enum: ['me', 'user'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

MessageSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

MessageSchema.set('toJSON', {
  virtuals: true,
})

MessageSchema.set('toObject', {
  virtuals: true,
})

module.exports = mongoose.model('Message', MessageSchema)
