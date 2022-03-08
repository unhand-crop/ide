import {
	IEditorTab,
	IFolderTreeNodeProps,
  } from "@dtinsight/molecule/esm/model";
  
  export function transformToEditorTab(item: IFolderTreeNodeProps): IEditorTab {
	const tabData: IEditorTab = item;
	tabData.breadcrumb = item.location
	  ? item.location
		  .split("/")
		  .map((local: string) => ({ id: local, name: local }))
	  : [];
	return tabData;
  }
  
  export const getLanguage = (extension: string) => {
	switch (extension) {
	  case ".js":
		return "Javascript";
	  case ".html":
		return "Html";
	  case ".json":
		return "Json";
	  case ".py":
		return "Python";
	  case ".text":
	  default:
		return "Plaintext";
	}
  };
  
  export interface TreeNode {
	id: string;
	name: string;
	fileType: "File" | "RootFolder" | "Folder";
	isLeaf?: boolean;
	data?: object;
	path: string;
	extension: string;
	children?: TreeNode[];
  }
  
  export const mapTree = (node: TreeNode, level: number = 0) => {
	if (node.children) {
	  node.isLeaf = false;
	  node.children = node.children.map((item: any) => mapTree(item, level + 1));
	  node.fileType = level === 0 ? "RootFolder" : "Folder";
	} else {
	  (node.fileType = "File"), (node.isLeaf = true);
	}
	node.id = node.path;
	node.path = node.path;
	node.name = node.name;
	return node;
  };
  