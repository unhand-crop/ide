import { useMount, useReactive } from "ahooks";

import { createModel } from "hox";

function useEnvModel() {
  const model = useReactive<{
    platform: NodeJS.Platform;
    isShellInstalled: boolean;
    isContainerInstalled: boolean;
    isGitInstalled: boolean;
  }>({
    platform: "win32",
    isShellInstalled: false,
    isContainerInstalled: false,
    isGitInstalled: false,
  });

  useMount(async () => {
    const result = await window.api.env.load();
    model.platform = result.platform;
    model.isShellInstalled = result.isShellInstalled;
    model.isContainerInstalled = result.isContainerInstalled;
    model.isGitInstalled = result.isGitInstalled;
  });

  return {
    model,
  };
}

export default createModel(useEnvModel);
