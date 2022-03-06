import { useMount, useReactive } from "ahooks";

import { createModel } from "hox";

const useSettingModel = () => {
  const model = useReactive({});

  useMount(async () => {
    console.log("-->!", await window.api.store.set("settings", "test"));
    console.log("-->", await window.api.store.get("settings"));
  });

  return {
    model,
  };
};

export default createModel(useSettingModel);
