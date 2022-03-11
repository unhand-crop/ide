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
  molecule.folderTree.onRightClick((file) => {
    if (file.fileType === "File") {
      molecule.folderTree.setFileContextMenu([
        { id: "rename", name: "重命名" },
        {
          id: "unlink-file",
          name: "删除",
        },
      ]);
    } else if (file.fileType === "Folder") {
      molecule.folderTree.setFolderContextMenu([
        { id: "new-file", name: "新建文件" },
        { id: "new-folder", name: "新建文件夹" },
        { id: "rename", name: "重命名" },
        {
          id: "mkdir-folder",
          name: "删除",
        },
      ]);
    }
  });
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
  molecule.folderTree.onRemove((id) => {});

  // const state = molecule.editor.getState();
  // state.groups.forEach((item) => {
  //   molecule.editor.closeTab(file.id, item.id);
  // });
  // molecule.folderTree.remove(file.id);
}

export class FoldTreeExtension implements IExtension {
  id: string = FoldTreeExtension.name;
  name: string = FoldTreeExtension.name;

  activate(extensionCtx: IExtensionService): void {
    // molecule.folderTree.setFileContextMenu([]);
    // molecule.folderTree.setFolderContextMenu([]);
    bindingEvents();
  }

  dispose(extensionCtx: IExtensionService): void {}
}
