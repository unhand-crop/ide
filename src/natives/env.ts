import * as sudo from "sudo-prompt";

import {
  ENV_EVENT_INIT_ERROR,
  ENV_EVENT_INIT_FINISH,
  ENV_EVENT_INIT_START,
} from "@/constants/env";

import { BrowserWindow } from "electron";
import { isWindows } from "./utils";

export async function initEnvironment(mainWindow: BrowserWindow) {
  mainWindow.webContents.send(ENV_EVENT_INIT_START);
  try {
    if (isWindows) {
    } else {
      await new Promise((resolve, reject) => {
        sudo.exec(
          `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`,
          {
            name: PRODUCT_NAME,
          },
          (error, stdout, stderr) => {
            console.log("sudo:", error, stdout, stderr);
            if (error) return reject(error);
            if (stderr) return reject(stderr);
            resolve(stdout);
          }
        );
      });
    }
    mainWindow.webContents.send(ENV_EVENT_INIT_FINISH);
  } catch (err) {
    console.error(err);
    mainWindow.webContents.send(ENV_EVENT_INIT_ERROR, "初始化失败");
  }
}
