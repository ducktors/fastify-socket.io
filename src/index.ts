import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { Server, ServerOptions } from 'socket.io'

export type FastifySocketioOptions = Partial<ServerOptions> & {
  preClose?: (done: () => void) => void
}

const fastifySocketIO: FastifyPluginAsync<FastifySocketioOptions> = fp(
  async function (fastify, opts: FastifySocketioOptions) {
    function defaultPreClose(done: () => void) {
      // Disconnect all local sockets to allow graceful shutdown
      (fastify as any).io.local.disconnectSockets(true) // 'as any' cast intentional per README (allows custom Socket.IO types)
      done()
    }
    fastify.decorate('io', new Server(fastify.server, opts))
    fastify.addHook('preClose', (done) => {
      if (opts.preClose) {
        return opts.preClose(done)
      }
      return defaultPreClose(done)
    })
    fastify.addHook('onClose', async (fastify: FastifyInstance) => {
      const io = (fastify as any).io
      try {
        if (io.httpServer?.listening) {
          await new Promise<void>((resolve, reject) => {
            io.httpServer.on('close', resolve)
            io.httpServer.on('error', reject)
            io.close()
          })
        } else {
          io.close()
        }
      } catch (error) {
        // Log or handle shutdown errors if needed
        console.error('Error during Socket.IO server shutdown:', error)
        throw error // Re-throw to let Fastify handle it
      }
    })
  },
  { fastify: '>=4.x.x', name: 'fastify-socket.io' },
)

export default fastifySocketIO
