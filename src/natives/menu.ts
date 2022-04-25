import { BrowserWindow, Menu, dialog } from "electron";
import {
  EDITOR_EVENT_NEW_ALGO,
  EDITOR_EVENT_OPEN_DIR,
} from "@/constants/editor";

import configs from "@/configs";

export const registerMenus = async (mainWindow: BrowserWindow) => {
  const template = [
    {
      label: configs.appName,
    },
    {
      label: "算法",
      submenu: [
        {
          label: "新建算法",
          click: async () => {
            await mainWindow.webContents.send(EDITOR_EVENT_NEW_ALGO);
          },
        },
        {
          label: "打开算法",
          click: async () => {
            const dirPath = await dialog
              .showOpenDialog({
                properties: ["openDirectory"],
              })
              .then((res: any) => {
                return res.canceled ? null : res.filePaths[0];
              });
            if (dirPath) {
              mainWindow.webContents.send(EDITOR_EVENT_OPEN_DIR, dirPath);
            }
            return dirPath;
          },
        },
      ],
    },
  ];
  const appMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(appMenu);
};
