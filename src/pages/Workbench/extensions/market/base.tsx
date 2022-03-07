import {
  IActivityBarItem,
  IEditorTab,
  ISidebarPane,
} from "@dtinsight/molecule/esm/model";
import MarketSidebarView from "./MarketSidebarView";
//   import ResultPaneView from "../result/ResultPaneView";
import molecule from "@dtinsight/molecule";
import React from "react";

export const marketActivityBar: IActivityBarItem = {
  id: "sidebar.market",
  name: "MarketActivityBar",
  sortIndex: 1,
  title: "Market Management",
  icon: "database",
};

export const marketSidebar: ISidebarPane = {
  id: "sidebar.market",
  title: "Market Pane",
  render: () => {
    return <MarketSidebarView />;
  },
};

export function openCreateDataSourceView(name: string) {
  molecule.editor.open({
    id: name,
    name,
    renderPane: () => {
      // return <ResultPaneView />;
    },
  });
}
