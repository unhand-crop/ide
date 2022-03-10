import { Float, IFolderTreeNodeProps } from "@dtinsight/molecule/esm/model";
import { getFileIcon, getLanguage } from "@/utils";

import { FoldTreeExtension } from ".";
import molecule from "@dtinsight/molecule";

export function handleSelectFolderTree() {
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
