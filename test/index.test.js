const { test } = require('tap')

test('should register the correct decorator', async t => {
  t.plan(1)

  const app = require('fastify')()

  app.register(require('..'))

  await app.ready()

  t.same(app.io, require('socket.io')(app.server))
})

test('should register the correct decorator passing options', async t => {
  t.plan(1)

  const app = require('fastify')()

  app.register(require('..'), {
    path: '/test',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  })

  await app.ready()

  t.same(
    app.io,
    require('socket.io')(app.server, {
      path: '/test',
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false
    })
  )
})

test('should close socket server on fastify close', async t => {
  t.plan(1)

  const { once } = require('events')

  const PORT = 3030
  const server = require('http').Server()
  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      t.fail('Port was not free!')
      setTimeout(() => {
        server.close()
        server.listen(PORT)
      }, 1000)
    }
  })

  const app = require('fastify')()

  app.register(require('..'), {
    path: '/test',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  })

  await app.ready()
  app.io.listen(PORT)

  await app.close()

  server.listen(PORT)

  await once(server, 'listening')

  server.close()
  t.ok(true)
})
