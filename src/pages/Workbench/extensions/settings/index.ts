import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import molecule from "@dtinsight/molecule";

export class SettingsExtension implements IExtension {
  id: string = SettingsExtension.name;
  name: string = SettingsExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.activityBar.remove("global.menu.settings");
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
