import fastify from 'fastify'
import assert from 'node:assert'
import { once } from 'node:events'
import { Server as HttpServer } from 'node:http'
import { test } from 'node:test'
import { Server } from 'socket.io'
import { io } from 'socket.io-client'

import plugin from '../src'

class Defer {
  promise: Promise<any>
  reject!: Function
  resolve!: Function

  constructor() {
    this.promise = new Promise((res, rej) => {
      this.reject = rej
      this.resolve = res
    })
  }
}

test('should register the correct decorator', async () => {
  const app = fastify()

  app.register(plugin)

  await app.ready()

  assert.strictEqual(app.hasDecorator('io'), true)
  assert.ok(app.io instanceof Server)
})

test('should close socket server on fastify close', async () => {
  const PORT = 3030
  const server = new HttpServer()
  server.on('error', (e: any) => {
    if (e.code === 'EADDRINUSE') {
      // Should not be here
      try {
        assert.fail('Port is already in use')
      } catch (e) {
        setTimeout(() => {
          server.close()
          server.listen(PORT)
        }, 1000)
      }
    }
  })

  const app = fastify()

  app.register(plugin, {
    path: '/test',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
  })

  await app.ready()
  app.io.listen(PORT)

  await app.close()

  server.listen(PORT)

  await once(server, 'listening')

  server.close()
  assert.ok(true)
})

test('should close socket server and connected sockets before fastify close', async () => {
  const PORT = 3030
  const app = fastify()
  await app.register(plugin)

  await app.ready()
  await app.listen({ port: PORT })

  const socket = io('http://localhost:3030', {
    transports: ['websocket'],
  })

  socket.once('connect_error', (e) => {
    assert.fail('Client unable to connect')
  })

  await once(socket, 'connect')
  const promise = once(socket, 'disconnect')
  await app.close()
  await promise
  assert.ok(true)
})

test('should close socket server and connected sockets before fastify close with custom preClose fn', async () => {
  const defer = new Defer()
  const PORT = 3030
  const app = fastify()
  await app.register(plugin, {
    preClose: (done) => {
      ;(app as any).io.local.disconnectSockets(true)
      defer.resolve([done])
      done()
    },
  })

  await app.ready()
  await app.listen({ port: PORT })

  const socket = io('http://localhost:3030', {
    transports: ['websocket'],
  })

  socket.once('connect_error', (e) => {
    assert.fail('Client unable to connect')
  })

  await once(socket, 'connect')
  const promise = once(socket, 'disconnect')
  await app.close()
  await promise
  const [done] = await defer.promise
  assert.equal(typeof done, 'function')
  assert.ok(true)
})
