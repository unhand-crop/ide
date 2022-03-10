import { Content, Header } from "@dtinsight/molecule/esm/workbench/sidebar";

import { IActionBarItemProps } from "@dtinsight/molecule/esm/components";
import { ISidebarPane } from "@dtinsight/molecule/esm/model";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import molecule from "@dtinsight/molecule";

const Toolbar = molecule.component.Toolbar;

export function SidePaneView() {
  const renderHeaderToolbar = React.useCallback((): IActionBarItemProps[] => {
    return [
      {
        icon: "arrow-both",
        id: "tools",
        title: "Layout the right SidePane",
      },
    ];
  }, []);

  return (
    <div className={"mySidePane"}>
      <Header
        title={localize("demo.rightSidebar.title", "Tools")}
        toolbar={<Toolbar data={renderHeaderToolbar()} />}
      />
      <Content>
        <p style={{ textAlign: "center" }}>Right Side Pane</p>
      </Content>
    </div>
  );
}

export const SidePane: ISidebarPane = {
  id: "mySidePane",
  title: "Tools",
  render: () => {
    return <SidePaneView />;
  },
};
