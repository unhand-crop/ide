import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import {
  ENGINE_CONTAINER_NAME,
  ENGINE_EVENT_INIT_IMAGE_FINISH,
  ENGINE_EVENT_INIT_IMAGE_START,
  ENGINE_EVENT_INIT_INSTANCE_FINISH,
  ENGINE_EVENT_INIT_INSTANCE_START,
  ENGINE_EVENT_INIT_VM_FINISH,
  ENGINE_EVENT_INIT_VM_START,
  ENGINE_EVENT_SERVER_PORT,
  ENGINE_EVENT_STREAM_DATA,
  ENGINE_EVENT_STREAM_FINISH,
  ENGINE_EVENT_STREAM_START,
  ENGINE_EVENT_STREAM_STOP,
  ENGINE_HOST_DOMAIN,
  ENGINE_IMAGE_NAME,
} from "@/constants/engine";

import { factory } from "nerdctl";
import moment from "moment";
import shell from "shelljs";
import { store } from "./store";

shell.config.execPath = shell.which("node").toString();

export const vm = factory();

export const registerEngineHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("engine.backtest", async (_, args) => {
    mainWindow.webContents.send(ENGINE_EVENT_STREAM_START);

    const { id, ENDDATE, STARTDATE, SERVICECHARGE, ATTRIBUTES } = args[0];

    const port = await store.get(ENGINE_EVENT_SERVER_PORT);

    await vm.remove(ENGINE_CONTAINER_NAME, { force: true });

    const imageName = (await store.get(ENGINE_IMAGE_NAME)) as string;

    await vm.run(
      imageName,
      {
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
      },
      (data: string) => {
        mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data);
      }
    );

    mainWindow.webContents.send(ENGINE_EVENT_STREAM_FINISH);
  });
  ipcMain.handle("engine.stop", async (_, args) => {
    mainWindow.webContents.send(ENGINE_EVENT_STREAM_STOP);
    await vm.remove(ENGINE_CONTAINER_NAME, { force: true });
  });
  ipcMain.handle("engine.checkVM", async () => {
    return await vm.checkVM();
  });
  ipcMain.handle("engine.initVM", async () => {
    mainWindow.webContents.send(ENGINE_EVENT_INIT_VM_START);
    await vm.initVM((data) => {
      mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data);
    });
    mainWindow.webContents.send(ENGINE_EVENT_INIT_VM_FINISH);
  });
  ipcMain.handle("engine.checkInstance", async () => {
    return await vm.checkInstance();
  });
  ipcMain.handle("engine.initInstance", async () => {
    mainWindow.webContents.send(ENGINE_EVENT_INIT_INSTANCE_START);
    await vm.initInstance((data) => {
      mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data);
    });
    mainWindow.webContents.send(ENGINE_EVENT_INIT_INSTANCE_FINISH);
  });
  ipcMain.handle("engine.checkImage", async () => {
    const imageName = (await store.get(ENGINE_IMAGE_NAME)) as string;
    const images = await vm.getImages();
    return (
      !images ||
      images.length <= 0 ||
      images.findIndex(
        (img) => `${img.Repository}:${img.Tag} === ${imageName}`
      ) < 0
    );
  });
  ipcMain.handle("engine.initImage", async () => {
    mainWindow.webContents.send(ENGINE_EVENT_INIT_IMAGE_START);
    const imageName = (await store.get(ENGINE_IMAGE_NAME)) as string;
    await vm.pullImage(imageName, (data) => {
      console.log(data);
      mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data);
    });
    mainWindow.webContents.send(ENGINE_EVENT_INIT_IMAGE_FINISH);
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
    async checkVM() {
      return await ipcRenderer.invoke("engine.checkVM");
    },
    async initVM() {
      return await ipcRenderer.invoke("engine.initVM");
    },
    async checkInstance() {
      return await ipcRenderer.invoke("engine.checkInstance");
    },
    async initInstance() {
      return await ipcRenderer.invoke("engine.initInstance");
    },
    async checkImage() {
      return await ipcRenderer.invoke("engine.checkImage");
    },
    async initImage() {
      return await ipcRenderer.invoke("engine.initImage");
    },
  };
};
