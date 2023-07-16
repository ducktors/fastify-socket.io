'use strict'

import fp from "fastify-plugin";
import { Server as SocketIOServer } from "socket.io";

module.exports = fp(
    async function (fastify, opts) {
        fastify.decorate("io", new SocketIOServer(fastify.server, opts));
        fastify.addHook("onClose", async (_instance, done) => {
            fastify.io.close();
            done();
        });
    },
      {
        fastify: ">=4.x",
        name: "fastify-socket.io",
    }
);
