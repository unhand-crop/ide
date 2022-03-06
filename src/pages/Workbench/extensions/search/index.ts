import molecule from "@dtinsight/molecule";
import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";

export class SearchExtension implements IExtension {
  id: string = SearchExtension.name;
  name: string = SearchExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.activityBar.remove("sidebar.search.title");
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
