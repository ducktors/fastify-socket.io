import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Server, ServerOptions } from "socket.io";

const fastifySocketIO: FastifyPluginAsync<Partial<ServerOptions>> = fp(
  async function (fastify, opts) {
    fastify.decorate("io", new Server(fastify.server, opts));
    fastify.addHook("onClose", (fastify: FastifyInstance, done) => {
      (fastify as any).io.close();
      done();
    });
  },
  { fastify: ">=4.x.x", name: "fastify-socket.io" }
);

export default fastifySocketIO;
