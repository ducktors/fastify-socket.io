import { FastifyPlugin } from 'fastify'
import { ServerOptions } from 'socket.io'

declare module 'fastify' {
  export interface FastifyInstance {
    io: SocketIO.Server
  }
}

declare const socketioServer: FastifyPlugin<Partial<ServerOptions>>
export default socketioServer
