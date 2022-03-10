import * as folderTreeController from "./folderTreeController";
import * as rightClickMenus from "./rightClickMenu";

import { IExtension } from "@dtinsight/molecule/esm/model";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import molecule from "@dtinsight/molecule";

export class FoldTreeExtension implements IExtension {
  id: string = FoldTreeExtension.name;
  name: string = FoldTreeExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.folderTree.setFileContextMenu([]);
    molecule.folderTree.setFolderContextMenu([]);
    folderTreeController.handleSelectFolderTree();
    rightClickMenus.setRightClickMenus();
  }

  dispose(extensionCtx: IExtensionService): void {}
}
