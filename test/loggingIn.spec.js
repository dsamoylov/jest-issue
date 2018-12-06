const wsServer = require('../SocketServer')
const { USER_CONNECTED, VERIFY_USER } = require('../Events')
const http = require('http')

describe('User connection tests', function() {
  let server = undefined

  beforeEach(function(done) {
    server = http.createServer(() => console.log(' -/- '))
    wsServer.init(server)
    server.listen(7575, () => {
      console.log('BEFORE')
      done()
    })
  })

  afterEach(function(done) {
    if (server) {
      server.on('close', () => {
        console.log('AFTER')
        done()
      })
      server.close(() => {
        console.log('CLOSING')
        server.unref()
        // process.exit() // Uncomment if your process is not stopped naturally
      })
    }
  })

  // it('User should be verified', done => {
  //   const wsClient = require('socket.io-client')('http://localhost:7575/')

  //   function callback({ user, isNameTaken }) {
  //     try {
  //       expect(isNameTaken).toBe(false)
  //       expect(typeof user.id).toBe('string')
  //       expect(user.name).toBe('Sam')
  //       done()
  //     } catch (e) {
  //       done(e)
  //     }
  //   }

  //   wsClient.emit(VERIFY_USER, 'Sam', callback)
  // })

  it('Do not allow duplicate nicknames', done => {
    const wsClient = require('socket.io-client')('http://localhost:7575/')
    function callbackFinal({ user, isNameTaken }) {
      console.log('============ CALLBACK B ===============', new Date())
      console.log({ user, isNameTaken })
      console.log({ done })
      try {
        expect(isNameTaken).toBe(true) // 4. Acutal test
        expect(user).toBe(null)
        done()
        console.log('============ CALLBACK B After done() ===============', new Date())
      } catch (e) {
        done(e)
      }
    }

    function callback({ user, isNameTaken }) {
      console.log('============ CALLBACK A ===============', new Date())
      wsClient.emit(USER_CONNECTED, user) // 2. Add verified user to connected users list
      wsClient.emit(VERIFY_USER, 'Sam', callbackFinal) // 3. Try verifying user for the second time
    }

    wsClient.emit(VERIFY_USER, 'Sam', callback) // 1. Try verifying user for the first time
  })
})
