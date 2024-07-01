import fastify from 'fastify'
import socketioServer from '../../src'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { Server } from 'socket.io'

const app = fastify({ logger: true })

app.register(socketioServer)

app.get('/', async (_req, reply) => {
  const data = await readFile(join(__dirname, '..', 'index.html'))
  reply.header('content-type', 'text/html; charset=utf-8')
  reply.send(data)
})

app.ready((err) => {
  if (err) throw err

  app.io.on('connection', (socket: any) =>
    console.info('Socket connected!', socket.id),
  )
})

app.listen({ port: 3000 })

declare module 'fastify' {
  interface FastifyInstance {
    io: Server<{ hello: string }>
  }
}
