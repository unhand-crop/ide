import molecule from "@dtinsight/molecule";
import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";

export class StatusBarExtension implements IExtension {
  id: string = StatusBarExtension.name;
  name: string = StatusBarExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.statusBar.remove("statusbar.problems.title");
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
