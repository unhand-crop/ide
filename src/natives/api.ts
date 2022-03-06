import { BrowserWindow } from "electron";
import { registerStoreHandlers } from "./store";

export async function loadApi(mainWindow: BrowserWindow) {
  await registerStoreHandlers(mainWindow);
}
