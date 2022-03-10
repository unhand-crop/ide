import { BrowserWindow } from "electron";
import { registerLocalHandlers } from "./local";
import { registerPathHandlers } from "./path";
import { registerStoreHandlers } from "./store";
import { registerWatchHandlers } from "./watch";

export async function loadApi(mainWindow: BrowserWindow) {
  await registerStoreHandlers(mainWindow);
  await registerLocalHandlers(mainWindow);
  await registerWatchHandlers(mainWindow);
  await registerPathHandlers(mainWindow);
}
