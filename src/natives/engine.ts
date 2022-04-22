import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

import { ChildProcess } from "child_process";
import { factory } from "nerdctl";
import moment from "moment";
import os from "os";
import { store } from "./store";

const arch = os.arch();

const ENGINE_IMAGE =
  arch === "arm64" ? "unhand/unhand-arm64:v1.0.1" : "unhand/unhand:latest";
const CONTAINER_NAME = "unhand-algorithm-engine";

const vm = factory();

export const registerEngineHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("engine.backtest", async (_, args) => {
    mainWindow.webContents.send("engine-stream-start");

    if (!(await vm.initVM())) {
      const child = await vm.startVM();
      child.stdout.on("data", (data) => {
        console.log("--> stdout", data);
        mainWindow.webContents.send("engine-stream-data", data);
      });
      child.stderr.on("data", (data) => {
        console.log("--> stderr", data);
        mainWindow.webContents.send("engine-stream-error", data);
      });
    }

    const { id, ENDDATE, STARTDATE, SERVICECHARGE, ATTRIBUTES } = args[0];

    const images = await vm.getImages();

    if (
      !images ||
      images.length <= 0 ||
      images.findIndex(
        (img) => `${img.Repository}:${img.Tag} === ${ENGINE_IMAGE}`
      ) < 0
    ) {
      await vm.pullImage(ENGINE_IMAGE);
    }

    const port = await store.get("server-port");

    await vm.rm(CONTAINER_NAME, { force: true });

    const container = (await vm.run(ENGINE_IMAGE, {
      name: CONTAINER_NAME,
      rm: true,
      env: [
        `LOADREMOTE=true`,
        `DOMAIN=http://host.lima.internal:${port}/`,
        `STARTDATE=${moment(STARTDATE).format("YYYY-MM-DD")}`,
        `ENDDATE=${moment(ENDDATE).format("YYYY-MM-DD")}`,
        `TRADEFEE=${SERVICECHARGE}`,
        ...ATTRIBUTES,
      ],
      volume: [`${id}:/app/custom/algorithm`],
    })) as ChildProcess;

    container.stdout.on("data", (data) => {
      console.log("--> stdout", data);
      mainWindow.webContents.send("engine-stream-data", data);
    });
    container.stderr.on("data", (data) => {
      console.log("--> stderr", data);
      mainWindow.webContents.send("engine-stream-error", data);
    });
    container.stderr.on("close", () => {
      console.log("--> stderr close");
      mainWindow.webContents.send("engine-stream-finish");
    });
    container.stdout.on("close", () => {
      console.log("--> stdout close");
      mainWindow.webContents.send("engine-stream-finish");
    });
  });
  ipcMain.handle("engine.stop", async (_, args) => {
    mainWindow.webContents.send("engine-stream-finish");
    await vm.rm(CONTAINER_NAME, { force: true });
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
