let io

module.exports = {
  init: httpServer => {
    const SocketManager = require('./SocketRouter')
    // console.log('SocketServer init')
    io = require('socket.io')(httpServer)
    io.on('connection', SocketManager) //end of on Client connection event
    return io
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized')
    }
    return io
  }
}
