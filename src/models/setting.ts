import { useMount, useReactive } from "ahooks";

import { createModel } from "hox";
import molecule from "@dtinsight/molecule";

const useSettingModel = () => {
  const model = useReactive({});

  useMount(async () => {
    let settings = await window.api.store.get("settings");
    if (!settings) {
      settings = molecule.settings.getSettings();
      await window.api.store.set("settings", JSON.stringify(settings));
    } else {
      molecule.settings.applySettings(JSON.parse(settings));
    }

    molecule.settings.onChangeSettings((settings) =>
      window.api.store.set("settings", JSON.stringify(settings))
    );
  });

  return {
    model,
  };
};

export default createModel(useSettingModel);
