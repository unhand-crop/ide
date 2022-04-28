import {
  Float,
  IExtension,
  IFolderTreeNodeProps,
} from "@dtinsight/molecule/esm/model";
import { getFileIcon, getLanguage } from "@/utils";

import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { getDirectoryTree } from "@/utils/directory-tree";
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
  molecule.folderTree.onLoadData(async (treeNode, callback) => {
    treeNode = await getDirectoryTree(treeNode.id as string);
    callback(treeNode);
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
        value: await window.api.fs.readFile(file.path),
      },
    });
    updateStatusBarLanguage(getLanguage(file.extension));
  });
  molecule.folderTree.onRemove(async (id) => {
    await window.api.fs.unlink(id);
  });
  molecule.folderTree.onUpdateFileName(async (file) => {
    if (file.name) {
      if (file.id === "input") {
        molecule.folderTree.remove("input");
        const path = await window.api.path.join(file.path, file.name);
        // TODO: 判断文件或文件夹是否存在，如果存在则为新文件或文件夹的名字添加 _copy 后缀
        if (file.fileType === "Folder") {
          await window.api.fs.mkdir(path);
        } else {
          await window.api.fs.writeFile(path, "");
        }
      } else {
        const path = await window.api.path.join(
          await window.api.path.dirname(file.path),
          file.name
        );
        await window.api.fs.rename(file.path, path);
      }
    }
  });
  molecule.folderTree.onDropTree(async (source, target) => {
    const stat = await window.api.fs.stat(target.path);
    if (!stat || !stat.isDirectory) return;

    // TODO: 判断文件或文件夹是否存在，如果存在则询问用户是否覆盖

    await window.api.fs.rename(
      source.path,
      await window.api.path.join(target.path, source.name)
    );
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
