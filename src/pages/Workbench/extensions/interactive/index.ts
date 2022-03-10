import { IExtension } from "@dtinsight/molecule/esm/model";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { TreeViewUtil } from "@dtinsight/molecule/esm/common/treeUtil";
import { getFileIcon } from "@/utils";
// import { getLanguageByExt, getFileExt, convertToTreeModel } from '@/utils';
import molecule from "@dtinsight/molecule";

function createNode() {
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

  molecule.folderTree.onUpdateFileName(async (file) => {
    if (file.name) {
      if (file.id === "input") {
        const catalog = `${file.path}/${file.name}`;
        const data = {
          id: catalog,
          path: catalog,
          name: file.name,
          icon: getFileIcon(file.name),
          fileType: file.fileType,
          isLeaf: file.isLeaf,
        };
        molecule.folderTree.remove("input");
        molecule.folderTree.add(data, file.path);
        if (file.fileType === "Folder") {
          await window.api.local.mkdirFile(catalog);
        } else {
          await window.api.local.writeFile(catalog, "");
        }
      } else {
        const filePath = file.path.substring(0, file.path.lastIndexOf("/"));
        const stitchingName = `${filePath}/${file.name}`;
        const { folderTree } = molecule.folderTree.getState();
        const treeHelp = new TreeViewUtil(folderTree!.data![0]!);
        const hashMap = treeHelp.getHashMap(file.id)!;
        molecule.folderTree.remove(file.id);
        const data = {
          id: stitchingName,
          path: stitchingName,
          name: file.name,
          icon: getFileIcon(file.name),
          fileType: file.fileType,
          isLeaf: file.isLeaf,
          children: file.children,
        };
        molecule.folderTree.add(data, hashMap.parent);
        await window.api.local.renameFile(file.path, stitchingName);
      }
    }
  });

  molecule.folderTree.onRemove(async (id) => {
    if (id) {
      await window.api.local.unlinkFile(id);
      molecule.folderTree.remove(id);
    }
  });
}

export class InteractiveExtension implements IExtension {
  id: string = InteractiveExtension.name;
  name: string = InteractiveExtension.name;
  activate(extensionCtx: IExtensionService): void {
    createNode();
  }
  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
