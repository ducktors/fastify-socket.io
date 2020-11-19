const { test } = require('tap')

test('should register the correct decorator', async t => {
  t.plan(1)

  const app = require('fastify')()

  app.register(require('..'))

  await app.ready()

  t.deepEqual(app.io, require('socket.io')(app.server))
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

  t.deepEqual(
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
