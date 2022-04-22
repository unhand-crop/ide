import { CompareInfo, getByVersion } from "@/services/env";
import { useMount, useReactive } from "ahooks";

import { ENGINE_IMAGE_NAME } from "@/constants/engine";
import { createModel } from "hox";

function useEnvModel() {
  const model = useReactive<{
    platform: string;
    arch: string;
    info: CompareInfo;
  }>({
    platform: null,
    arch: null,
    info: null,
  });

  useMount(async () => {
    model.platform = await window.api.os.platform();
    model.arch = await window.api.os.arch();
    model.info = (await getByVersion(VERSION, model.platform, model.arch)).data;

    await window.api.store.set(
      ENGINE_IMAGE_NAME,
      model.info.currentEditVersionInfo.bestImageVersion.fullName
    );
  });

  return {
    model,
  };
}

export default createModel(useEnvModel);
