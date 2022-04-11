import { createModel } from "hox";
import { useReactive } from "ahooks";

function useBackTestModel() {
  const model = useReactive<{
    visible: boolean;
    customVisble: boolean;
  }>({
    visible: false,
    customVisble: false,
  });

  return {
    model,
  };
}

export default createModel(useBackTestModel);
