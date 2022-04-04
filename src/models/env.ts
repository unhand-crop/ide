import { useMount, useReactive } from "ahooks";

import { createModel } from "hox";

function useEnvModel() {
  const model = useReactive<{
    platform: string;
  }>({
    platform: null,
  });

  useMount(async () => {
    const result = await window.api.env.load();
    console.log(result);
  });

  return {
    model,
  };
}

export default createModel(useEnvModel);
