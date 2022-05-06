import { BrowserWindow, app, ipcMain, ipcRenderer } from "electron";
import {
  ENGINE_CONTAINER_NAME,
  ENGINE_EVENT_INIT_IMAGE_FINISH,
  ENGINE_EVENT_INIT_IMAGE_START,
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
import { events, factory } from "nerdctl";

import chmodr from "chmodr";
import moment from "moment";
import path from "path";
import { store } from "./store";

export const registerEngineHandlers = async (mainWindow: BrowserWindow) => {
  const appPath = app.isPackaged
    ? path.join(app.getAppPath(), ".webpack")
    : app.getAppPath();

  const vm = factory(appPath);

  vm.on(events.VM_INIT_OUTPUT, (data) => {
    console.log(data);
    mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data);
  });
  vm.on(events.IMAGE_PULL_OUTPUT, (data: string) => {
    console.log(data);
    mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data);
  });
  vm.on(events.CONTAINER_RUN_OUTPUT, (data: string) => {
    console.log(data);
    mainWindow.webContents.send(ENGINE_EVENT_STREAM_DATA, data);
  });

  ipcMain.handle("engine.init", async (_, args) => {
    const resourcesPath = path.join(appPath, "res");

    try {
      await new Promise((resolve, reject) =>
        chmodr(resourcesPath, 0o777, (err) => {
          if (err) return reject();
          resolve(true);
        })
      );
    } catch (err) {
      console.error(err);
    }

    mainWindow.webContents.send(
      ENGINE_EVENT_STREAM_DATA,
      `Checking virtual machine environment`
    );
    const checkVM = await vm.checkVM();
    mainWindow.webContents.send(
      ENGINE_EVENT_STREAM_DATA,
      `The virtual machine is ${checkVM ? "ready" : "not ready"}`
    );

    if (!checkVM) {
      mainWindow.webContents.send(
        ENGINE_EVENT_STREAM_DATA,
        `Installing virtual machine`
      );
      mainWindow.webContents.send(ENGINE_EVENT_INIT_VM_START);
      await vm.initVM();
    }
    mainWindow.webContents.send(
      ENGINE_EVENT_STREAM_DATA,
      `Virtual machine installed`
    );
    mainWindow.webContents.send(ENGINE_EVENT_INIT_VM_FINISH, true);

    mainWindow.webContents.send(
      ENGINE_EVENT_STREAM_DATA,
      `Checking algorithm engine environment`
    );

    const imageName = (await store.get(ENGINE_IMAGE_NAME)) as string;
    const images = await vm.getImages();
    const checkImage =
      !!images &&
      images.length > 0 &&
      images.findIndex(
        (img) => `${img.Repository}:${img.Tag} === ${imageName}`
      ) >= 0;

    mainWindow.webContents.send(
      ENGINE_EVENT_STREAM_DATA,
      `The algorithm engine is ${checkImage ? "ready" : "not ready"}`
    );

    if (!checkImage) {
      mainWindow.webContents.send(
        ENGINE_EVENT_STREAM_DATA,
        `Installing algorithm engine`
      );

      mainWindow.webContents.send(ENGINE_EVENT_INIT_IMAGE_START);
      const imageName = (await store.get(ENGINE_IMAGE_NAME)) as string;
      await vm.pullImage(imageName);
    }
    mainWindow.webContents.send(ENGINE_EVENT_INIT_IMAGE_FINISH, true);
    mainWindow.webContents.send(
      ENGINE_EVENT_STREAM_DATA,
      `Algorithm engine installed`
    );
  });
  ipcMain.handle("engine.backtest", async (_, args) => {
    mainWindow.webContents.send(ENGINE_EVENT_STREAM_START);

    const { id, ENDDATE, STARTDATE, SERVICECHARGE, ATTRIBUTES } = args[0];

    const port = await store.get(ENGINE_EVENT_SERVER_PORT);
    try {
      await vm.remove(ENGINE_CONTAINER_NAME, { force: true });
    } finally {
      const imageName = (await store.get(ENGINE_IMAGE_NAME)) as string;

      await vm.run(imageName, {
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
      });

      mainWindow.webContents.send(ENGINE_EVENT_STREAM_FINISH);
    }
  });
  ipcMain.handle("engine.stop", async (_, args) => {
    mainWindow.webContents.send(ENGINE_EVENT_STREAM_STOP);
    await vm.remove(ENGINE_CONTAINER_NAME, { force: true });
  });
};

export const registerEngineInvokes = () => {
  return {
    async init(...args: any[]) {
      return await ipcRenderer.invoke("engine.init", args);
    },
    async backtest(...args: any[]) {
      return await ipcRenderer.invoke("engine.backtest", args);
    },
    async stop(...args: any[]) {
      return await ipcRenderer.invoke("engine.stop", args);
    },
  };
};
