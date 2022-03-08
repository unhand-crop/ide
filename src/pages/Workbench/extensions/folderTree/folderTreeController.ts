import { getLanguage, mapTree } from "@/utils";
import molecule from "@dtinsight/molecule";
import {
  Float,
  IFolderTreeNodeProps,
  TreeNodeModel,
} from "@dtinsight/molecule/esm/model";
import { IpcRendererEvent } from "electron";
import { FoldTreeExtension } from ".";

export function handleSelectFolderTree() {
  window.api.local.on(
    "open-directory",
    (_: IpcRendererEvent, dirPath: string) => {
      const data = mapTree(
        window.api.local.directoryTree(dirPath, {
          attributes: ["extension"],
        })
      );
    //   const repo = getCookie("repo");
    //   const rootNode = molecule.folderTree.get(`${repo}-root`);
    //   if (rootNode) {
    //     molecule.folderTree.update(new TreeNodeModel({ ...data }));
    //   } else {
        molecule.folderTree.add(new TreeNodeModel({ ...data }));
    //   }
    }
  );
  molecule.folderTree.onSelectFile(async (file: IFolderTreeNodeProps) => {
    const { panel } = molecule.layout.getState();
    if (panel.panelMaximized) {
      molecule.panel.toggleMaximize();
    }
    molecule.editor.open({
      id: file.id,
      name: file.name,
      data: {
        value: await window.api.local.readFile(file.path),
      },
    });
    updateStatusBarLanguage(getLanguage(file.extension));
  });
}

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
