import { CompareInfo, getByVersion } from "@/services/env";
import {
  ENGINE_EVENT_INIT_IMAGE_FINISH,
  ENGINE_EVENT_INIT_VM_FINISH,
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
    checkImage: boolean;
    algorithmstep: any;
    algorithmstepConfig: any[];

    platform: string;
    arch: string;
    info: CompareInfo;
  }>({
    modalVisible: false,
    docsPanelVisible: false,
    checkVM: false,
    checkImage: false,

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

    window.api.ipc.on(ENGINE_EVENT_INIT_VM_FINISH, () => {
      model.checkVM = true;
    });
    window.api.ipc.on(ENGINE_EVENT_INIT_IMAGE_FINISH, () => {
      model.checkImage = true;
    });

    setTimeout(async () => {
      log("Querying the latest image version information");

      model.platform = await window.api.os.platform();
      model.arch = await window.api.os.arch();
      model.info = (
        await getByVersion(VERSION, model.platform, model.arch)
      ).data;

      log(
        `Latest image version: ${model.info.editVersionInfo.bestImageVersion.fullName}\n`
      );

      await window.api.store.set(
        ENGINE_IMAGE_NAME,
        model.info.editVersionInfo.bestImageVersion.fullName
      );

      log(`Checking virtual machine environment`);
      model.checkVM = await window.api.engine.checkVM();
      log(`The virtual machine is ${model.checkVM ? "ready" : "not ready"}`);

      if (!model.checkVM) {
        log(`Installing virtual machine`);
        await window.api.engine.initVM();
        log(`Virtual machine installed`);
      }

      log(`Checking algorithm engine environment`);
      model.checkImage = await window.api.engine.checkImage();
      log(
        `The algorithm engine is ${model.checkImage ? "ready" : "not ready"}`
      );

      if (!model.checkImage) {
        log(`Installing algorithm engine`);
        await window.api.engine.initImage();
        log(`Algorithm engine installed`);
      }
    }, 2000);
  });

  return {
    model,
  };
}

export default createModel(useEngineModel);
