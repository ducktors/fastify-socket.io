'use strict'

const fp = require('fastify-plugin')
const socketIo = require('socket.io');


module.exports = fp(async function (fastify, opts) {
  fastify.decorate('io', new socketIo.SocketIOServer(fastify.server, opts))
  fastify.addHook('onClose', (fastify, done) => {
    fastify.io.close()
    done()
  })
}, { fastify: '>=4.x', name: 'fastify-socket.io' })
