import { useMount, useReactive } from "ahooks";

import { createModel } from "hox";
import molecule from "@dtinsight/molecule";

const useSettingModel = () => {
  const model = useReactive({});

  useMount(async () => {
    let settings = await window.api.store.get("settings");
    settings = settings ?? {};
    settings = {
      colorTheme: "One Dark Pro",
      "editor.renderWhitespace": "none",
      "editor.tabSize": 4,
      "editor.fontSize": 14,
      locale: "zh-CN",
      ...settings,
    };

    molecule.settings.onChangeSettings((settings) =>
      window.api.store.set("settings", settings)
    );
    molecule.settings.applySettings(settings);
  });

  return {
    model,
  };
};

export default createModel(useSettingModel);
