import { createModel } from "hox";
import { useReactive } from "ahooks";

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

  return {
    model,
  };
}

export default createModel(useBackTestModel);
