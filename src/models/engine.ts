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

function useEngineModel() {
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
          molecule.panel.appendOutput(data.content + "\n");
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
        console.log(data);
        // molecule.panel.appendOutput(data + "\n");
      }
    );

    window.api.ipc.on(ENGINE_EVENT_INIT_VM_FINISH, () => {
      model.checkVM = true;
    });
    window.api.ipc.on(ENGINE_EVENT_INIT_IMAGE_FINISH, () => {
      model.checkImage = true;
    });

    setTimeout(async () => {
      console.log(molecule.panel.getState());

      molecule.panel.remove("panel.problems.title");
      // molecule.panel.setActive("panel.output.title");
      molecule.panel.cleanOutput();

      molecule.panel.appendOutput(
        "Querying the latest image version information\n"
      );

      model.platform = await window.api.os.platform();
      model.arch = await window.api.os.arch();
      model.info = (
        await getByVersion(VERSION, model.platform, model.arch)
      ).data;

      molecule.panel.appendOutput(
        `Latest image version: ${model.info.editVersionInfo.bestImageVersion.fullName}\n`
      );

      await window.api.store.set(
        ENGINE_IMAGE_NAME,
        model.info.editVersionInfo.bestImageVersion.fullName
      );

      molecule.panel.appendOutput(`Checking virtual machine environment\n`);
      model.checkVM = await window.api.engine.checkVM();
      molecule.panel.appendOutput(
        `The virtual machine is ${model.checkVM ? "ready" : "not ready"}\n`
      );

      if (!model.checkVM) {
        molecule.panel.appendOutput(`Installing virtual machine\n`);
        await window.api.engine.initVM();
        molecule.panel.appendOutput(`Virtual machine installed\n`);
      }

      molecule.panel.appendOutput(`Checking algorithm engine environment\n`);
      model.checkImage = await window.api.engine.checkImage();
      molecule.panel.appendOutput(
        `The algorithm engine is ${model.checkImage ? "ready" : "not ready"}\n`
      );

      if (!model.checkImage) {
        molecule.panel.appendOutput(`Installing algorithm engine\n`);
        await window.api.engine.initImage();
        molecule.panel.appendOutput(`Algorithm engine installed\n`);
      }
    }, 2000);
  });

  return {
    model,
  };
}

export default createModel(useEngineModel);
