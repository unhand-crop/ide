import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { KeybindingAction } from "./keybindingAction";

export class ActionExtension implements IExtension {
  id: string = ActionExtension.name;
  name: string = ActionExtension.name;

  activate(extensionCtx: IExtensionService): void {
    extensionCtx.registerAction(KeybindingAction);
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
