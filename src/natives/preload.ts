import { contextBridge, ipcRenderer } from "electron";

import { registerStoreInvokes } from "./store";
import { registerLocalInvokes } from './local';

contextBridge.exposeInMainWorld("api", {
  ipc: ipcRenderer,
  store: registerStoreInvokes(),
  local: registerLocalInvokes(),
});
