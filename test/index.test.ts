import { expect, test } from "vitest";
import fastify from "fastify";
import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";
import { once } from "node:events";

import plugin from "../src";

test("should register the correct decorator", async () => {
  const app = fastify();

  app.register(plugin);

  await app.ready();

  expect(app.hasDecorator("io")).toBe(true);
  expect(app.io).toBeInstanceOf(Server);
});

test("should close socket server on fastify close", async () => {
  expect.hasAssertions();

  const PORT = 3030;
  const server = new HttpServer();
  server.on("error", (e: any) => {
    if (e.code === "EADDRINUSE") {
      // Should not be here
      expect(false).toBe(true);
      setTimeout(() => {
        server.close();
        server.listen(PORT);
      }, 1000);
    }
  });

  const app = fastify();

  app.register(plugin, {
    path: "/test",
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
  });

  await app.ready();
  app.io.listen(PORT);

  await app.close();

  server.listen(PORT);

  await once(server, "listening");

  server.close();
  expect(true).toBe(true);
});
