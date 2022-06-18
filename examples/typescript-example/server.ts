import fastify from 'fastify'
import socketioServer from 'fastify-socket.io'
import { join } from 'path'
const { readFile } = require('fs').promises

const app = fastify({ logger: true })

app.register(socketioServer)

app.get('/', async (req, reply) => {
  const data = await readFile(join(__dirname, '..', 'index.html'))
  reply.header('content-type', 'text/html; charset=utf-8')
  reply.send(data)
})

app.ready(err => {
  if (err) throw err

  app.io.on('connection', (socket: any) => console.info('Socket connected!', socket.id))
})

app.listen(3000)
