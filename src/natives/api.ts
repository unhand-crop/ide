import { BrowserWindow } from "electron";
import { registerEngineHandlers } from "./engine";
import { registerFsHandlers } from "./fs";
import { registerLocalHandlers } from "./local";
import { registerPathHandlers } from "./path";
import { registerStoreHandlers } from "./store";
import { registerWatchHandlers } from "./watch";

export async function loadApi(mainWindow: BrowserWindow) {
  await registerStoreHandlers(mainWindow);
  await registerLocalHandlers(mainWindow);
  await registerWatchHandlers(mainWindow);
  await registerPathHandlers(mainWindow);
  await registerFsHandlers(mainWindow);
  await registerEngineHandlers(mainWindow);
}
