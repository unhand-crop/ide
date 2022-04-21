import {
  IEditorTab,
  IFolderTreeNodeProps,
} from "@dtinsight/molecule/esm/model";
import Icon, { getIconByName } from "@/components/FileIcon";

import React from "react";

export const isDev = process.env.NODE_ENV === "development";

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

export const getFileIcon = (name: string) => {
  return <Icon {...getIconByName(name)} />;
};

export interface TreeNode {
  id: string;
  name: string;
  type: "file" | "directory";
  fileType: "File" | "RootFolder" | "Folder";
  isLeaf?: boolean;
  data?: object;
  path: string;
  icon: any;
  extension: string;
  children?: TreeNode[];
}

export const mapTree = (node: TreeNode, level: number = 0) => {
  if (node.type === "directory") {
    node.children = node.children
      ? node.children.map((item: any) => mapTree(item, level + 1))
      : [];
    node.fileType = level === 0 ? "RootFolder" : "Folder";
    node.isLeaf = false;
  } else {
    node.fileType = "File";
    node.isLeaf = true;
  }
  node.id = node.path;
  node.icon = getFileIcon(node.name);
  return node;
};

export const isLatestVersion = (
  currentVersion: string,
  servicesVersion: string
) => {
  const CV = currentVersion.split(".");
  const SV = servicesVersion.split(".");
  return CV.every((item, index) => {
    return +item >= +SV[index];
  });
};
