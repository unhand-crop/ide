import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import React from "react";
import Settings from "./Settings";
import molecule from "@dtinsight/molecule";
import { settingsActivityBar } from "./base";

export class SettingsExtension implements IExtension {
  id: string = SettingsExtension.name;
  name: string = SettingsExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.activityBar.remove("global.menu.settings");
    molecule.activityBar.add(settingsActivityBar);
    molecule.activityBar.onClick((id) => {
      if (id === "sidebar.settings") {
        molecule.editor.open({
          id: "settings",
          name: "设置",
          renderPane: () => <Settings />,
        });
      }
    });
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
