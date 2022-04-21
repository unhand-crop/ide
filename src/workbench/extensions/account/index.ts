import molecule from "@dtinsight/molecule";
import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";

export class AccountExtension implements IExtension {
  id: string = AccountExtension.name;
  name: string = AccountExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.activityBar.remove("global.menu.account");
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}