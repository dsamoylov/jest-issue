const io = require('../SocketServer')

const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events')

const { createUser, creatMessage, createChat } = require('../Factories')

let connectedUsers = {}

exports.verifyUser = (name, callback) => {
  if (isNameTaken(connectedUsers, name)) {
    callback({ isNameTaken: true, user: null })
  } else {
    callback({ isNameTaken: false, user: createUser({ name: name }) })
  }
}

exports.connectUser = user => {
  //   console.log('USER_CONNECTED recieved')

  connectedUsers = addUser(connectedUsers, user)
  //   socket.user = user
  //   console.log(connectedUsers)
  io.getIO().emit(USER_CONNECTED, connectedUsers) // broadcast
}

/**
 * Adds user to the list passed in
 * @param {Object} users Object with key value pairs of users
 * @param {User} user the user to be added to the list
 * @returns {Object} Object with key value pairs of Users
 */
function addUser(users, user) {
  let newUsers = Object.assign({}, users)
  newUsers[user.name] = user
  return newUsers
}

/**
 * Removes user from the list passed in
 * @param {Object} users Object with key value pairs of Users
 * @param {String} name name of user to be removed
 * @returns {Object}  Object with key value pairs of Users
 */
function removeUser(users, name) {
  let newUsers = Object.assign({}, users)
  delete newUsers[name]
  return newUsers
}

/**
 * Checks if the user is in list passed in. *
 * @param {Object} users Object with key value pairs of Users
 * @param {String} name
 * @return {Boolean} if the user is in list passed in
 */
function isNameTaken(users, name) {
  return name in users
}

exports.isNameTaken = isNameTaken
