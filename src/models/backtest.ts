import { createModel } from "hox";
import { useReactive } from "ahooks";

function useBackTestModel() {
  const model = useReactive<{
    visible: boolean;
  }>({
    visible: false,
  });

  return {
    model,
  };
}

export default createModel(useBackTestModel);
