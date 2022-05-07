import { TreeNode, getFileIcon } from ".";

export async function getDirectoryTree(path: string): Promise<TreeNode> {
  return new Promise((resolve) => {
    const tree = window.api.local.directoryTree(
      path,
      {
        attributes: ["extension", "type"],
        exclude: [/.DS_Store/, /.git/, /__pycache__/],
        depth: 1,
      },
      (item: any, path: string, stats: any) => {
        item.id = path;
        item.icon = getFileIcon(item.name);
        item.fileType = "File";
        item.isLeaf = true;
        return item;
      },
      (item: any, path: string, stats: any) => {
        item.id = path;
        item.icon = getFileIcon(item.name);
        item.fileType = "Folder";
        item.isLeaf = false;
        return item;
      }
    );
    tree.fileType = "RootFolder";
    resolve(tree);
  });
}
