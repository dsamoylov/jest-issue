const app = require('http').createServer()
const PORT = process.env.PORT || 8231
const server = app.listen(PORT)
const socketServer = require('./SocketServer').init(server)

console.log(`Connected to port: ${PORT}`)
