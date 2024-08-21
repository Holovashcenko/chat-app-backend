const { REQUIRED_FIELDS, UPDATE_FIELDS_REQUIRED } = require('../constants/errorMessages')

const validateChatCreation = (req, res, next) => {
  const { firstName, lastName } = req.body

  if (!firstName || !lastName) {
    return res.status(400).json({ error: REQUIRED_FIELDS })
  }

  next()
}

const validateChatUpdate = (req, res, next) => {
  const { firstName, lastName } = req.body

  if (!firstName && !lastName) {
    return res.status(400).json({ error: UPDATE_FIELDS_REQUIRED })
  }

  next()
}

module.exports = {
  validateChatCreation,
  validateChatUpdate,
}
