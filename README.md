# fastify-socket.io

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  ![CI workflow](https://github.com/alemagio/fastify-socket.io/workflows/CI%20workflow/badge.svg)

`fastify-socket.io` enables the use of [Socket.io](https://socket.io/) in a Fastify application.

Supports Fastify versions `3.x`

## Install
```
npm i fastify-socket.io socket.io
```

## Usage
Require `fastify-socket.io` and register it as any other plugin, it will add a `io` decorator.
```js
const fastify = require('fastify')()

fastify.register(require('fastify-socket.io'), {
  // put your options here
})

fastify.get('/', (req, reply) => {
  fastify.io.emit('hello')
})

fastify.listen(3000)
```
For more details see [examples](https://github.com/alemagio/fastify-socket.io/tree/master/examples)

You can use it as is without passing any option, or you can configure it as explained by Socket.io [doc](https://socket.io/docs/server-api/).

### Hook

The plugin also adds an `onClose` hook which closes the socket server when the `fastify` instance is closed.

## Typescript

From v4 types will no longer be included in the plugin package but will need to be installed separately:
```
npm i -D types-fastify-socket.io
```

This is necessary to allow, eventually, the developer to be able to define custom types and make use of the `socket.io` new types system ([doc](https://socket.io/docs/v4/typescript/)).

## Acknowledgements

The code is a port for Fastify of [`socket.io`](https://github.com/socketio/socket.io).

## License

Licensed under [MIT](./LICENSE).<br/>
[`socket.io` license](https://github.com/socketio/socket.io/blob/master/LICENSE)
