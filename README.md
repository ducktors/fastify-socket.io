# fastify-socket.io

![CI workflow](https://github.com/ducktors/fastify-socket.io/workflows/CI%20workflow/badge.svg)

`fastify-socket.io` enables the use of [Socket.io](https://socket.io/) in a Fastify application.

Supports Fastify versions `4.x`

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

### Hook

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
