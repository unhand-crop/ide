import { contextBridge, ipcRenderer } from "electron";

import { registerEngineInvokes } from "./engine";
import { registerEnvInvokes } from "./env";
import { registerFsInvokes } from "./fs";
import { registerGitInvokes } from "./git";
import { registerLocalInvokes } from "./local";
import { registerPathInvokes } from "./path";
import { registerStoreInvokes } from "./store";
import { registerWatchInvokes } from "./watch";

contextBridge.exposeInMainWorld("api", {
  ipc: {
    on(
      channel: string,
      listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
    ) {
      ipcRenderer.on(channel, listener);
    },
  },
  store: registerStoreInvokes(),
  local: registerLocalInvokes(),
  watch: registerWatchInvokes(),
  path: registerPathInvokes(),
  fs: registerFsInvokes(),
  engine: registerEngineInvokes(),
  env: registerEnvInvokes(),
  gitHttp: registerGitInvokes(),
});
