import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import {
  ENGINE_CONTAINER_NAME,
  ENGINE_EVENT_SERVER_PORT,
  ENGINE_EVENT_STREAM_DATA,
  ENGINE_EVENT_STREAM_ERROR,
  ENGINE_EVENT_STREAM_FINISH,
  ENGINE_EVENT_STREAM_START,
  ENGINE_EVENT_STREAM_STOP,
  ENGINE_HOST_DOMAIN,
  ENGINE_IMAGE_NAME,
} from "@/constants/engine";

import { ChildProcess } from "child_process";
import { factory } from "nerdctl";
import moment from "moment";
import shell from "shelljs";
import { store } from "./store";

shell.config.execPath = shell.which("node").toString();

export const vm = factory();

export const registerEngineHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("engine.backtest", async (_, args) => {
    mainWindow.webContents.send(ENGINE_EVENT_STREAM_START);

    const imageName = (await store.get(ENGINE_IMAGE_NAME)) as string;

    const { id, ENDDATE, STARTDATE, SERVICECHARGE, ATTRIBUTES } = args[0];

    const port = await store.get(ENGINE_EVENT_SERVER_PORT);

    await vm.remove(ENGINE_CONTAINER_NAME, { force: true });

    const container = (await vm.run(imageName, {
      name: ENGINE_CONTAINER_NAME,
      rm: true,
      env: [
        `LOADREMOTE=true`,
        `DOMAIN=http://${ENGINE_HOST_DOMAIN}:${port}/`,
        `STARTDATE=${moment(STARTDATE).format("YYYY-MM-DD")}`,
        `ENDDATE=${moment(ENDDATE).format("YYYY-MM-DD")}`,
        `TRADEFEE=${SERVICECHARGE}`,
        ...ATTRIBUTES,
      ],
      volume: [`${id}:/app/custom/algorithm`],
    })) as ChildProcess;

    container.stdout.on("data", (data) => {
      mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data);
    });
    container.stderr.on("data", (data) => {
      mainWindow.webContents.send(ENGINE_EVENT_STREAM_ERROR, data);
    });
    container.stderr.on("close", () => {
      mainWindow.webContents.send(ENGINE_EVENT_STREAM_FINISH);
    });
    container.stdout.on("close", () => {
      mainWindow.webContents.send(ENGINE_EVENT_STREAM_FINISH);
    });
  });
  ipcMain.handle("engine.stop", async (_, args) => {
    mainWindow.webContents.send(ENGINE_EVENT_STREAM_STOP);
    await vm.remove(ENGINE_CONTAINER_NAME, { force: true });
  });
};

export const registerEngineInvokes = () => {
  return {
    async backtest(...args: any[]) {
      return await ipcRenderer.invoke("engine.backtest", args);
    },
    async stop(...args: any[]) {
      return await ipcRenderer.invoke("engine.stop", args);
    },
  };
};
