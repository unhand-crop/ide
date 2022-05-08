import {
  ENGINE_EVENT_INIT_SERVER_ERROR,
  ENGINE_EVENT_INIT_SERVER_FINISH,
  ENGINE_EVENT_INIT_SERVER_MESSAGE,
  ENGINE_EVENT_RESULT,
  ENGINE_EVENT_SERVER_PORT,
  ENGINE_EVENT_STREAM_DATA,
} from "@/constants/engine";

import { BrowserWindow } from "electron";
import { fork } from "child_process";
import getPort from "get-port";
import path from "path";
import request from "umi-request";
import { store } from "./store";

export async function initServer(
  mainWindow: BrowserWindow,
  signal: AbortSignal
) {
  try {
    mainWindow.webContents.send(
      ENGINE_EVENT_STREAM_DATA,
      `Starting web server...`
    );

    const port = await getPort();
    store.set(ENGINE_EVENT_SERVER_PORT, port);

    const child = fork(
      path.join(__dirname, "scripts", "server.js"),
      [port.toString()],
      {
        signal,
      }
    );

    child
      .on("exit", (code, signal) => {
        console.log(
          `The web server exit: code = ${code}, signal = ${JSON.stringify(
            signal
          )}`
        );
      })
      .on("error", (err: any) => {
        if (err?.code === "ABORT_ERR") {
          console.error(`Process exit: ${err.name}`);
          return;
        }
        mainWindow.webContents.send(
          ENGINE_EVENT_STREAM_DATA,
          `Failed to initialize web server: ${JSON.stringify(err)}`
        );
        mainWindow.webContents.send(
          ENGINE_EVENT_STREAM_DATA,
          JSON.stringify(err)
        );
      })
      .on("message", (data: any) => {
        if (data?.type === ENGINE_EVENT_INIT_SERVER_FINISH) {
          mainWindow.webContents.send(
            ENGINE_EVENT_STREAM_DATA,
            `Web server initialization succeeded`
          );
          console.log(`Web server initialization succeeded`);
          request(`http://127.0.0.1:${port}`)
            .then((res) => {
              mainWindow.webContents.send(
                ENGINE_EVENT_STREAM_DATA,
                `Ping web server: ${JSON.stringify(res)}`
              );
              console.log(`Ping web server: ${JSON.stringify(res)}`);
            })
            .catch((err) => {
              mainWindow.webContents.send(
                ENGINE_EVENT_STREAM_DATA,
                `Ping web server error: ${JSON.stringify(err)}`
              );
              console.log(`Ping web server error: ${JSON.stringify(err)}`);
            });
          return;
        }
        if (data?.type === ENGINE_EVENT_INIT_SERVER_MESSAGE) {
          mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data?.data);
          mainWindow.webContents.send(ENGINE_EVENT_RESULT, data?.data);
          return;
        }
        if (data?.type === ENGINE_EVENT_INIT_SERVER_ERROR) {
          console.error(`Failed to initialize web server`);
          return;
        }
        mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data);
      });
  } catch (err) {
    console.error(err);
  }
}
