const fastify = require("fastify");
const socketio = require("../..");
const { join } = require("node:path");
const { readFile } = require("node:fs").promises;

const app = fastify({ logger: true });

app.register(socketio);

app.get("/", async (_req, reply) => {
  const data = await readFile(join(__dirname, "..", "index.html"));
  reply.header("content-type", "text/html; charset=utf-8");
  reply.send(data);
});

app.ready((err) => {
  if (err) throw err;

  app.io.on("connect", (socket) =>
    console.info("Socket connected!", socket.id),
  );
});

app.listen({ port: 3000 });
