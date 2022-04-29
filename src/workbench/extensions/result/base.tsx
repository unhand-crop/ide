import { IPanelItem } from "@dtinsight/molecule/esm/model";
import React from "react";
import ResultPaneView from "./ResultPaneView";
import { localize } from "@dtinsight/molecule/esm/i18n";

export const resultPanel: IPanelItem = {
  id: "panel.result",
  name: localize("panel.result.name", "结果"),
  title: "Results",
  sortIndex: 2,
  closable: false,
  renderPane: () => {
    return <ResultPaneView />;
  },
};
