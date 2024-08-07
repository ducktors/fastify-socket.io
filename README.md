# fastify-socket.io

[![CI](https://github.com/ducktors/fastify-socket.io/actions/workflows/ci.yml/badge.svg)](https://github.com/ducktors/fastify-socket.io/actions/workflows/ci.yml) [![Test](https://github.com/ducktors/fastify-socket.io/actions/workflows/test.yaml/badge.svg)](https://github.com/ducktors/fastify-socket.io/actions/workflows/test.yaml) [![npm](https://img.shields.io/npm/v/fastify-socket.io)](https://www.npmjs.com/package/fastify-socket.io) [![Coverage Status](https://coveralls.io/repos/github/ducktors/fastify-socket.io/badge.svg?branch=master)](https://coveralls.io/github/ducktors/fastify-socket.io?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/8415332abe3ff865131d/maintainability)](https://codeclimate.com/github/ducktors/fastify-socket.io/maintainability) [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/ducktors/fastify-socket.io/badge)](https://securityscorecards.dev/viewer/?uri=github.com/ducktors/fastify-socket.io)


`fastify-socket.io` enables the use of [Socket.io](https://socket.io/) in a Fastify application.

Supports Fastify versions `4.x`
Supports socket.io version `4.x`

## Install

```
npm i fastify-socket.io socket.io
```

## Usage

Require `fastify-socket.io` and register it as any other plugin, it will add a `io` decorator.

```js
const fastify = require("fastify")();

fastify.register(require("fastify-socket.io"), {
  // put your options here
});

fastify.get("/", (req, reply) => {
  fastify.io.emit("hello");
});

fastify.listen({ port: 3000 });
```

For more details see [examples](https://github.com/ducktors/fastify-socket.io/tree/master/examples)

You can use it as is without passing any option, or you can configure it as explained by Socket.io [doc](https://socket.io/docs/server-api/).

### Hooks

By default the plugin will add a `preClose` hook that disconnects [all the local sockets](https://socket.io/docs/v4/server-api/#serverdisconnectsocketsclose) in order to close correctly the fastify server. In order to change this behaviour you can use `preClose` option:

```javascript
await fastify.register(require('fastify-socket.io'), {
  preClose: (done) => {
    // do other things
    fastify.io.local.disconnectSockets(true);
    done();
  }
})
```

The plugin also adds an `onClose` hook which closes the socket server when the `fastify` instance is closed.

## Typescript

The `io` decorator is NOT typed.

This is necessary to allow, eventually, the developer to be able to define custom types and make use of the `socket.io` new types system ([doc](https://socket.io/docs/v4/typescript/)).

For more info see the [example](https://github.com/ducktors/fastify-socket.io/tree/master/examples)

## Acknowledgements

The code is a port for Fastify of [`socket.io`](https://github.com/socketio/socket.io).

## License

Licensed under [MIT](./LICENSE).<br/>
[`socket.io` license](https://github.com/socketio/socket.io/blob/master/LICENSE)
