const { Server } = require('socket.io')

let io

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('disconnect', () => {
      console.log('User disconnected')
    })
  })
}

const getSocket = () => io

module.exports = {
  initSocket,
  getSocket,
}
