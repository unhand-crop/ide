import { TreeNode } from ".";

export async function getDirectoryTree(path: string): Promise<TreeNode> {
  return new Promise((resolve, reject) => {
    const tree = window.api.local.directoryTree(path, {
      attributes: ["extension", "type"],
      exclude: [/.DS_Store/],
      depth: 1,
    });
    resolve(tree);
  });
}
