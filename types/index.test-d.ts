import fastify from 'fastify'
import socketioServer from '.'
import { expectType, expectAssignable } from 'tsd'
import { Server, ServerOptions } from 'socket.io'

try {
  const app = fastify()

  await app.ready()

  await app.register(socketioServer)

  app.io.emit('test')

  expectType<Server>(app.io)

  expectAssignable<Partial<ServerOptions>>({
    path: '/test',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  })
} catch (err) {
  console.error(err)
}
