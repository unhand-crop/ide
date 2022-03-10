import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import molecule from "@dtinsight/molecule";

export class ExplorerExtension implements IExtension {
  id: string = ExplorerExtension.name;
  name: string = ExplorerExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.explorer.removePanel("outline");
    molecule.explorer.removeAction("sidebar.explore.actionDesc");
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
