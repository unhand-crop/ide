import { useMount, useReactive, useRequest } from "ahooks";

import { createModel } from "hox";
import { getApiTreeMethods } from "@/services/apiTree";

function useBackTestModel() {
  const model = useReactive<{
    visible: boolean;
    customVisble: boolean;
    apiDocumentation: boolean;
  }>({
    visible: false,
    customVisble: false,
    apiDocumentation: false,
  });

  const { data, run } = useRequest(getApiTreeMethods, {
    debounceWait: 1000,
    manual: true,
  });

  useMount(() => {
    run({ code: "algorithm-api", apiName: "" });
  });

  return {
    model,
    run,
    data,
  };
}

export default createModel(useBackTestModel);
