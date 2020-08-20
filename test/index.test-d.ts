import fastify from 'fastify'
import socketioServer from '..'
import { expectType } from 'tsd'

const app = fastify()

app.register(socketioServer)

app.io.emit('test')

expectType<SocketIO.Server>(app.io)
