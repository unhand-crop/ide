import { IPanelItem } from "@dtinsight/molecule/esm/model";
// import ResultPaneView from "./ResultPaneView";

export const resultPanel: IPanelItem = {
  id: "panel.result",
  name: "Results",
  title: "Results",
  sortIndex: 1,
  closable: false,
  renderPane: () => {
    // return <ResultPaneView />;
  },
};
