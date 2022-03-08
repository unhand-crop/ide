import { BrowserWindow } from "electron";
import { registerStoreHandlers } from "./store";
import { registerLocalHandlers } from "./local";

export async function loadApi(mainWindow: BrowserWindow) {
  await registerStoreHandlers(mainWindow);
  await registerLocalHandlers(mainWindow);
}
