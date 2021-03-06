import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import Launcher from "../../views/Launcher";
import React from "react";
import molecule from "@dtinsight/molecule";

export class LauncherExtension implements IExtension {
  id: string = LauncherExtension.name;
  name: string = LauncherExtension.name;

  activate(extensionCtx: IExtensionService): void {
    this.initUI();
  }

  initUI() {
    molecule.editor.setEntry(<Launcher />);
  }

  dispose(extensionCtx: IExtensionService): void {}
}
