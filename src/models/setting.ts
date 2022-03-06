import { createModel } from "hox";
import { useReactive } from "ahooks";

const useSettingModel = () => {
  const model = useReactive({});

  return {
    model,
  };
};

export default createModel(useSettingModel);
