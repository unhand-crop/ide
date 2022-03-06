import { contextBridge, ipcRenderer } from "electron";

import { registerStoreInvokes } from "./store";

contextBridge.exposeInMainWorld("api", {
  ipc: ipcRenderer,
  store: registerStoreInvokes(),
});
