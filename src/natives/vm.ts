import { BrowserWindow } from "electron";

export async function install(mainWindow: BrowserWindow) {
  // if (!(await vm.initVM())) {
  //     mainWindow.webContents.send(ENGINE_EVENT_INIT_VM_START);
  //     const child = await vm.startVM();
  //     child.stdout.on("data", (data) => {
  //       mainWindow.webContents.send(ENGINE_EVENT_INIT_VM_DATA, data);
  //     });
  //     child.stderr.on("data", (data) => {
  //       mainWindow.webContents.send(ENGINE_EVENT_INIT_VM_DATA, data);
  //     });
  //     child.stderr.on("close", () => {
  //       mainWindow.webContents.send(ENGINE_EVENT_INIT_VM_FINISH);
  //     });
  //     child.stdout.on("close", () => {
  //       mainWindow.webContents.send(ENGINE_EVENT_INIT_VM_FINISH);
  //     });
  //   }
}
