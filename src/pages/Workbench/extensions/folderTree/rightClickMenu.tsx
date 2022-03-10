import React from "react";
import molecule from "@dtinsight/molecule";

export function setRightClickMenus() {
  molecule.folderTree.onRightClick((file) => {
    if (file.fileType === "File") {
      molecule.folderTree.setFileContextMenu([
        { id: "unlink-file", name: "删除文件" },
        { id: "rename", name: "重命名" },
      ]);
    } else if (file.fileType === "Folder") {
      molecule.folderTree.setFolderContextMenu([
        { id: "new-file", name: "新建文件" },
        { id: "new-folder", name: "新建文件夹" },
        { id: "mkdir-folder", name: "删除文件夹" },
        { id: "rename", name: "重命名" },
      ]);
    }
  });
}
