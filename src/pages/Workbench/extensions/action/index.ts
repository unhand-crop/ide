import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { KeybindingAction } from "./keybindingAction";
import molecule from "@dtinsight/molecule";

export class ActionExtension implements IExtension {
  id: string = "ActionExtension";
  name: string = "ActionExtension";

  activate(extensionCtx: IExtensionService): void {
    molecule.extension.registerAction(KeybindingAction);
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
