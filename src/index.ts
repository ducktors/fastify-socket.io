import type {
  FastifyInstance,
  FastifyPluginAsync,
  HookHandlerDoneFunction,
} from "fastify";
import fp from "fastify-plugin";
import { Server, type ServerOptions } from "socket.io";

export type FastifySocketioOptions = Partial<ServerOptions> & {
  preClose?: (done: HookHandlerDoneFunction) => void;
};

const fastifySocketIO: FastifyPluginAsync<FastifySocketioOptions> = fp(
  async (fastify, opts: FastifySocketioOptions) => {
    function defaultPreClose(done: HookHandlerDoneFunction) {
      fastify.io.local.disconnectSockets(true);
      done();
    }
    fastify.decorate("io", new Server(fastify.server, opts));
    fastify.addHook("preClose", (done) => {
      if (opts.preClose) {
        return opts.preClose(done);
      }
      return defaultPreClose(done);
    });
    fastify.addHook("onClose", (fastify: FastifyInstance, done) => {
      fastify.io.close();
      done();
    });
  },
  { fastify: ">=4.0.0", name: "fastify-socket.io" },
);

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}

export default fastifySocketIO;
