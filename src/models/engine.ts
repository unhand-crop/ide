import { CompareInfo, getByVersion } from "@/services/env";
import {
  ENGINE_EVENT_INIT_IMAGE_FINISH,
  ENGINE_EVENT_INIT_IMAGE_START,
  ENGINE_EVENT_INIT_VM_FINISH,
  ENGINE_EVENT_INIT_VM_START,
  ENGINE_EVENT_RESULT,
  ENGINE_EVENT_STREAM_DATA,
  ENGINE_EVENT_STREAM_FINISH,
  ENGINE_EVENT_STREAM_START,
  ENGINE_EVENT_STREAM_STOP,
  ENGINE_IMAGE_NAME,
} from "@/constants/engine";
import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { createModel } from "hox";
import molecule from "@dtinsight/molecule";
import { resultPanel } from "@/workbench/extensions/result/base";
import useConsoleModel from "./console";

function useEngineModel() {
  const { log } = useConsoleModel();
  const model = useReactive<{
    running: boolean;
    results: any;
    modalVisible: boolean;
    docsPanelVisible: boolean;
    checkVM: boolean;
    checkingVM: boolean;
    checkImage: boolean;
    checkingImage: boolean;
    algorithmstep: any;
    algorithmstepConfig: any[];

    platform: string;
    arch: string;
    info: CompareInfo;
  }>({
    modalVisible: false,
    docsPanelVisible: false,
    checkVM: false,
    checkingVM: false,
    checkImage: false,
    checkingImage: false,

    running: false,
    results: null,

    algorithmstep: {},
    algorithmstepConfig: [
      "initconfig",
      "downloaddata",
      "algorithmrunning",
      "responseresult",
    ],

    platform: null,
    arch: null,
    info: null,
  });

  useMount(async () => {
    window.api.ipc.on(ENGINE_EVENT_RESULT, (_: IpcRendererEvent, data: any) => {
      switch (data.type) {
        case "algorithmstepConfig":
          model.algorithmstepConfig = data.content || [];
          break;
        case "algorithmstep":
          model.algorithmstep[data.progressType] = data;
          break;
        case "backtestresult":
          model.results = data;
          break;
        case "kline":
          model.results = data;
          break;
        case "end":
          model.running = false;
          break;
        case "error":
          console.error(data.content);
          log(data.content);
          break;
        default:
          break;
      }
    });
    window.api.ipc.on(ENGINE_EVENT_STREAM_START, () => {
      molecule.panel.cleanOutput();
      model.running = true;
      model.results = null;
      molecule.layout.setState({
        panel: {
          hidden: false,
          panelMaximized: true,
        },
      });
      molecule.panel.setActive(resultPanel.id);
    });
    window.api.ipc.on(ENGINE_EVENT_STREAM_STOP, () => {
      model.running = false;
      model.results = null;
    });
    window.api.ipc.on(ENGINE_EVENT_STREAM_FINISH, () => {
      model.running = false;
    });
    window.api.ipc.on(
      ENGINE_EVENT_STREAM_DATA,
      (_: IpcRendererEvent, data: string) => {
        log(data);
      }
    );
    window.api.ipc.on(ENGINE_EVENT_INIT_VM_START, (_: IpcRendererEvent) => {
      model.checkingVM = true;
    });
    window.api.ipc.on(
      ENGINE_EVENT_INIT_VM_FINISH,
      (_: IpcRendererEvent, data: boolean) => {
        model.checkVM = data;
        model.checkingVM = false;
      }
    );
    window.api.ipc.on(ENGINE_EVENT_INIT_IMAGE_START, (_: IpcRendererEvent) => {
      model.checkingImage = true;
    });
    window.api.ipc.on(
      ENGINE_EVENT_INIT_IMAGE_FINISH,
      (_: IpcRendererEvent, data: boolean) => {
        model.checkImage = data;
        model.checkingImage = false;
      }
    );

    log("Querying the latest image version information");

    model.platform = await window.api.os.platform();
    model.arch = await window.api.os.arch();
    model.info = (await getByVersion(VERSION, model.platform, model.arch)).data;

    if (!model.info?.editVersionInfo?.bestImageVersion?.fullName) {
      return log("Failed to query the image version information");
    }

    log(
      `Latest image version: ${model.info.editVersionInfo.bestImageVersion.fullName}\n`
    );

    await window.api.store.set(
      ENGINE_IMAGE_NAME,
      model.info.editVersionInfo.bestImageVersion.fullName
    );

    window.api.engine.init();
  });

  return {
    model,
  };
}

export default createModel(useEngineModel);
