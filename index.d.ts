import { FastifyPluginAsync } from 'fastify'
import { Server, ServerOptions } from 'socket.io'

declare module 'fastify' {
  interface FastifyInstance {
    io: Server
  }
}

export const socketioServer: FastifyPluginAsync<Partial<ServerOptions>>
export default socketioServer
