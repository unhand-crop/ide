import { BrowserWindow } from "electron";
import Fastify from "fastify";
import getPort from "get-port";
import { store } from "./store";

export async function initServer(mainWindow: BrowserWindow) {
  const fastify = Fastify({
    logger: true,
  });

  const port = await getPort();

  store.set("server-port", port);

  fastify.get("/", (request, reply) => {
    reply.send({ success: true, message: "OK" });
  });

  fastify.post("/", (request, reply) => {
    mainWindow.webContents.send("engine-result", request.body);
    console.log("000---->", request.body);
    reply.send({ success: true, message: "OK" });
  });

  fastify.listen({ port, host: "0.0.0.0" }, (err, address) => {
    if (err) throw err;
  });
}
