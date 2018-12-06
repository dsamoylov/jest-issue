const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('./Events')
const { createUser, creatMessage, createChat } = require('./Factories')

const authController = require('./controllers/auth')

module.exports = socket => {
  // console.log(`Socket Id ${socket.id}`)

  // Verify username
  socket.on(VERIFY_USER, authController.verifyUser)

  // User Conntects with username
  socket.on(USER_CONNECTED, authController.connectUser)

  // User disconnects

  // User logs out
}
