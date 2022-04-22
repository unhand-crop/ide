import { BrowserWindow } from "electron";
import { fork } from "child_process";

export async function initServer(
  mainWindow: BrowserWindow,
  signal: AbortSignal
) {
  fork(__dirname + "/scripts/server.js", [], {
    signal,
  })
    .on("message", (message) => {
      console.log("--> !!!", message);
    })
    .on("error", () => {
      process.exit(0);
    });

  // const fastify = Fastify({
  //   logger: true,
  // });
  // const port = await getPort();
  // store.set("server-port", port);
  // fastify.get("/", (request, reply) => {
  //   reply.send({ success: true, message: "OK" });
  // });
  // fastify.post("/", (request, reply) => {
  //   mainWindow.webContents.send("engine-result", request.body);
  //   reply.send({ success: true, message: "OK" });
  // });
  // fastify.listen({ port, host: "0.0.0.0" }, (err, address) => {
  //   if (err) throw err;
  // });
}
