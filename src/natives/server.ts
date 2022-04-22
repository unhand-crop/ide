import {
  ENGINE_EVENT_RESULT,
  ENGINE_EVENT_SERVER_PORT,
} from "@/constants/engine";

import { BrowserWindow } from "electron";
import { fork } from "child_process";
import getPort from "get-port";
import { store } from "./store";

export async function initServer(
  mainWindow: BrowserWindow,
  signal: AbortSignal
) {
  const port = await getPort();

  store.set(ENGINE_EVENT_SERVER_PORT, port);

  fork(__dirname + "/scripts/server.js", [port.toString()], {
    signal,
  })
    .on("message", (data) => {
      mainWindow.webContents.send(ENGINE_EVENT_RESULT, data);
    })
    .on("error", () => {
      process.exit(0);
    });
}
