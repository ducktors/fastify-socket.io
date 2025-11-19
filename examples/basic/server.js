const fastify = require("fastify");
const socketio = require("../..");
const { join } = require("node:path");
const { readFile } = require("node:fs").promises;

const app = fastify({ logger: true });

// Add basic rate limiting to prevent abuse
app.register(require('@fastify/rate-limit'), {
  max: 100, // max 100 requests
  timeWindow: '15 minutes' // per 15 minutes per source IP
});

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
