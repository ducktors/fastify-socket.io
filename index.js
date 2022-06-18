'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('io', require('socket.io')(fastify.server, opts))
  fastify.addHook('onClose', (fastify, done) => {
    fastify.io.close()
    done()
  })
}, { fastify: '>=3.24.x', name: 'fastify-socket.io' })
