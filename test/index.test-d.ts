import fastify from 'fastify'
import socketioServer from '..'
import { expectType, expectAssignable } from 'tsd'
import { ServerOptions } from 'socket.io'

const app = fastify()

app.register(socketioServer)

app.io.emit('test')

expectType<SocketIO.Server>(app.io)

expectAssignable<ServerOptions>({
  path: '/test',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})
