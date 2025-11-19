import { readFile } from "node:fs/promises";
import { join } from "node:path";
import fastify from "fastify";
import type { Socket } from "socket.io";
import socketioServer from "../../src";

const app = fastify({ logger: true });

app.register(socketioServer);

app.get("/", async (_req, reply) => {
  const data = await readFile(join(__dirname, "..", "index.html"));
  reply.header("content-type", "text/html; charset=utf-8");
  reply.send(data);
});

app.ready((err) => {
  if (err) throw err;

  app.io.on("connection", (socket: Socket) =>
    console.info("Socket connected!", socket.id),
  );
});

app.listen({ port: 3000 });
