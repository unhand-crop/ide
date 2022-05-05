import ConsoleView from "./ConsoleView";
import { IPanelItem } from "@dtinsight/molecule/esm/model";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n";

export const consolePanel: IPanelItem = {
  id: "panel.console",
  name: localize("panel.console.name", "控制台"),
  title: "Console",
  sortIndex: 1,
  closable: false,
  renderPane: () => {
    return <ConsoleView />;
  },
};
