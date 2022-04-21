import { IContributeType, IExtension } from "@dtinsight/molecule/esm/model";

import DescriptionsItem from "antd/lib/descriptions/Item";

const zhCN = require("./zh-CN.json");
const en = require("./en.json");
const locales = [zhCN, en];

export const ExtendLocales: IExtension = {
  id: "ExtendLocales",
  name: "Extend locales",
  contributes: {
    [IContributeType.Languages]: locales,
  },

  activate(): void {},
  dispose(): void {},
};
