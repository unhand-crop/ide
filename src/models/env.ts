import { CompareInfo, getByVersion } from "@/services/env";
import { useMount, useReactive } from "ahooks";

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
  });

  return {
    model,
  };
}

export default createModel(useEnvModel);
