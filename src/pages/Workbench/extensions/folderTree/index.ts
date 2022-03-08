import { IExtension } from "@dtinsight/molecule/esm/model";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import * as folderTreeController from "./folderTreeController";

export class FoldTreeExtension implements IExtension {
  id: string = FoldTreeExtension.name;
  name: string = FoldTreeExtension.name;

  activate(extensionCtx: IExtensionService): void {
    folderTreeController.handleSelectFolderTree();
  }

  dispose(extensionCtx: IExtensionService): void {}
}
