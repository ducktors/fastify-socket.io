import { FastifyPluginAsync } from 'fastify'
import * as SocketIO from 'socket.io'

declare module 'fastify' {
  interface FastifyInstance {
    io: SocketIO.Server
  }
}

export const socketioServer: FastifyPluginAsync<Partial<SocketIO.ServerOptions>>
export default socketioServer
