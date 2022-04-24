import { CompareInfo, getByVersion } from "@/services/env";
import {
  ENV_EVENT_INIT_DATA,
  ENV_EVENT_INIT_FINISH,
  ENV_EVENT_INIT_START,
} from "@/constants/env";
import { useMount, useReactive } from "ahooks";

import { ENGINE_IMAGE_NAME } from "@/constants/engine";
import { INotificationItem } from "@dtinsight/molecule/esm/model";
import { IpcRendererEvent } from "electron";
import { createModel } from "hox";
import molecule from "@dtinsight/molecule";
import { uniqueId } from "lodash";

function useEnvModel() {
  const model = useReactive<{
    initializing: boolean;
    failureMessage: string;
    platform: string;
    arch: string;
    info: CompareInfo;
  }>({
    initializing: false,
    failureMessage: null,
    platform: null,
    arch: null,
    info: null,
  });

  useMount(async () => {
    window.api.ipc.on(ENV_EVENT_INIT_START, () => {
      molecule.panel.cleanOutput();
      molecule.notification.toggleNotification();
    });
    window.api.ipc.on(
      ENV_EVENT_INIT_DATA,
      (_: IpcRendererEvent, msg: { type: string; data: string }) => {
        if (msg.type === "notification") {
          const notification: INotificationItem = {
            id: uniqueId("env-init"),
            value: msg.data,
          };
          molecule.notification.add([notification]);
        }
        molecule.panel.appendOutput(msg.data);
      }
    );
    window.api.ipc.on(ENV_EVENT_INIT_FINISH, () => {
      setTimeout(() => {
        molecule.notification.toggleNotification();
      }, 10000);
    });

    model.platform = await window.api.os.platform();
    model.arch = await window.api.os.arch();
    model.info = (await getByVersion(VERSION, model.platform, model.arch)).data;

    await window.api.store.set(
      ENGINE_IMAGE_NAME,
      model.info.currentEditVersionInfo.bestImageVersion.fullName
    );

    await window.api.env.init();
  });

  return {
    model,
  };
}

export default createModel(useEnvModel);
