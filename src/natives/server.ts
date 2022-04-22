import { BrowserWindow } from "electron";
import { fork } from "child_process";
import getPort from "get-port";
import { store } from "./store";

export async function initServer(
  mainWindow: BrowserWindow,
  signal: AbortSignal
) {
  const port = await getPort();

  store.set("server-port", port);

  fork(__dirname + "/scripts/server.js", [port.toString()], {
    signal,
  })
    .on("message", (data) => {
      mainWindow.webContents.send("engine-result", data);
    })
    .on("error", () => {
      process.exit(0);
    });
}
