let autoMessageEnabled = false

function getAutoMessageStatus() {
  return autoMessageEnabled
}

function setAutoMessageStatus(enabled) {
  autoMessageEnabled = enabled
}

module.exports = {
  getAutoMessageStatus,
  setAutoMessageStatus,
}
