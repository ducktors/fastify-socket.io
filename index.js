'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('io', require('socket.io')(fastify.server, opts))
}, { fastify: '3.x' })
