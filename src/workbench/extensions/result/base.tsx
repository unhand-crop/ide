import { IPanelItem } from "@dtinsight/molecule/esm/model";
import React from "react";
import ResultPaneView from "./ResultPaneView";

export const resultPanel: IPanelItem = {
  id: "panel.result",
  name: "Results",
  title: "Results",
  sortIndex: 2,
  closable: false,
  renderPane: () => {
    return <ResultPaneView />;
  },
};
