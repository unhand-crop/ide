import {
  Float,
  IExtension,
  IFolderTreeNodeProps,
} from "@dtinsight/molecule/esm/model";
import { getFileIcon, getLanguage } from "@/utils";

import { IExtensionService } from "@dtinsight/molecule/esm/services";
import molecule from "@dtinsight/molecule";

export function updateStatusBarLanguage(language: string) {
  if (!language) return;
  const languageStatusItem = molecule.statusBar.getStatusBarItem(
    "FoldTreeExtension",
    Float.right
  );
  if (languageStatusItem) {
    languageStatusItem.name = language;
    molecule.statusBar.update(languageStatusItem, Float.right);
  } else {
    molecule.statusBar.add(
      Object.assign({}, { id: FoldTreeExtension.name }, { name: language }),
      Float.right
    );
  }
}

export function bindingEvents() {
  molecule.folderTree.onSelectFile(async (file: IFolderTreeNodeProps) => {
    const { panel } = molecule.layout.getState();
    if (panel.panelMaximized) {
      molecule.panel.toggleMaximize();
    }
    molecule.editor.open({
      id: file.id,
      name: file.name,
      icon: getFileIcon(file.name),
      data: {
        value: await window.api.local.readFile(file.path),
      },
    });
    updateStatusBarLanguage(getLanguage(file.extension));
  });
  molecule.folderTree.onCreate((type, id) => {
    if (type !== "RootFolder") {
      molecule.folderTree.add(
        {
          id: "input",
          name: "",
          fileType: type,
          isLeaf: type === "File",
          isEditable: true,
          path: id,
        },
        id
      );
    }
  });
  molecule.folderTree.onRename((id) => {
    console.log(id);
  });
  molecule.folderTree.onRemove(async (id) => {
    await window.api.fs.unlink(id);
  });
}

export class FoldTreeExtension implements IExtension {
  id: string = FoldTreeExtension.name;
  name: string = FoldTreeExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.folderTree.setFileContextMenu([
      { id: "explorer.rename", name: "重命名" },
      {
        id: "explorer.delete",
        name: "删除",
      },
    ]);
    molecule.folderTree.setFolderContextMenu([
      { id: "explorer.newFile", name: "新建文件" },
      { id: "explorer.newFolder", name: "新建文件夹" },
      { id: "explorer.rename", name: "重命名" },
      {
        id: "explorer.delete",
        name: "删除",
      },
    ]);
    bindingEvents();
  }

  dispose(extensionCtx: IExtensionService): void {}
}
