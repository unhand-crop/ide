import "@dtinsight/molecule/esm/style/mo.css";
import "reflect-metadata";

import { Display, Pane, SplitPane } from "@dtinsight/molecule/esm/components";
import {
  ILayout,
  MenuBarMode,
} from "@dtinsight/molecule/esm/model/workbench/layout";
import {
  ILayoutController,
  LayoutController,
} from "@dtinsight/molecule/esm/controller/layout";
import React, { useEffect } from "react";
import {
  classNames,
  getBEMElement,
  getBEMModifier,
  getFontInMac,
  prefixClaName,
} from "@dtinsight/molecule/esm/common/className";

import { APP_PREFIX } from "@dtinsight/molecule/esm/common/const";
import { ActivityBarView } from "@dtinsight/molecule/esm/workbench/activityBar";
import BackTest from "./Backtest";
import { EditorView } from "@dtinsight/molecule/esm//workbench/editor";
import { ID_APP } from "@dtinsight/molecule/esm/common/id";
import { IWorkbench } from "@dtinsight/molecule/esm/model/workbench";
import { LayoutService } from "@dtinsight/molecule/esm/services";
import { MenuBarView } from "@dtinsight/molecule/esm/workbench/menuBar";
import { PanelView } from "@dtinsight/molecule/esm/workbench/panel";
import { SidebarView } from "@dtinsight/molecule/esm/workbench/sidebar";
// import { SidePane } from "./SidePane";
import { StatusBarView } from "@dtinsight/molecule/esm/workbench/statusBar";
import { connect } from "@dtinsight/molecule/esm/react";
import { container } from "tsyringe";
import molecule from "@dtinsight/molecule";
import useEditorModel from "@/models/editor";
import useSettingModel from "@/models/setting";
import useTestbackModal from "@/models/testbackModals";
import InitTestBack from "@/components/InitTestBack"

const mainBenchClassName = prefixClaName("mainBench");
const workbenchClassName = prefixClaName("workbench");
const compositeBarClassName = prefixClaName("compositeBar");
const appClassName = classNames(APP_PREFIX, getFontInMac());
const workbenchWithHorizontalMenuBarClassName = getBEMModifier(
  workbenchClassName,
  "with-horizontal-menuBar"
);
const withHiddenStatusBar = getBEMModifier(
  workbenchClassName,
  "with-hidden-statusBar"
);
const displayActivityBarClassName = getBEMElement(
  workbenchClassName,
  "display-activityBar"
);

const layoutController = container.resolve(LayoutController);
const layoutService = container.resolve(LayoutService);

function WorkbenchView(props: IWorkbench & ILayout & ILayoutController) {
  const {
    activityBar,
    menuBar,
    panel,
    sidebar,
    statusBar,
    onPaneSizeChange,
    onHorizontalPaneSizeChange,
    splitPanePos,
    horizontalSplitPanePos,
  } = props;

  const { model } = useEditorModel();
  useSettingModel();

  useEffect(() => {
    const hidden = !model.dirPath;
    molecule.layout.setState({
      activityBar: { hidden },
      sidebar: { hidden, position: "left" },
      statusBar: { hidden },
    });
  }, [model.dirPath]);

  const getSizes = () => {
    if (panel.hidden) {
      return ["100%", 0];
    }
    if (panel.panelMaximized) {
      return [0, "100%"];
    }
    return horizontalSplitPanePos;
  };

  const isMenuBarVertical =
    !menuBar.hidden && menuBar.mode === MenuBarMode.vertical;
  const isMenuBarHorizontal =
    !menuBar.hidden && menuBar.mode === MenuBarMode.horizontal;
  const horizontalMenuBar = isMenuBarHorizontal
    ? workbenchWithHorizontalMenuBarClassName
    : null;
  const hideStatusBar = statusBar.hidden ? withHiddenStatusBar : null;
  const workbenchFinalClassName = classNames(
    workbenchClassName,
    horizontalMenuBar,
    hideStatusBar
  );

  const handleSideBarChanged = (sizes: number[]) => {
    if (sidebar.hidden) {
      const clientSize = sizes[1];
      const sidebarSize = splitPanePos[0];
      if (typeof sidebarSize === "string") {
        // the sideBar size is still a default value
        const numbSize = parseInt(sidebarSize, 10);
        onPaneSizeChange?.([numbSize, clientSize - numbSize]);
      } else {
        onPaneSizeChange?.([sidebarSize, clientSize - sidebarSize]);
      }
    } else {
      onPaneSizeChange?.(sizes);
    }
  };

  const handleEditorChanged = (sizes: number[]) => {
    if (panel.hidden) {
      // get the non-zero size means current client size
      const clientSize = sizes.find((s) => s)!;
      const panelSize = horizontalSplitPanePos[1];
      if (typeof panelSize === "string") {
        // the editor size is still a default value
        const editorPercent =
          parseInt(horizontalSplitPanePos[0] as string, 10) / 100;
        const numbericSize = clientSize * editorPercent;
        onHorizontalPaneSizeChange?.([numbericSize, clientSize - numbericSize]);
      } else {
        onHorizontalPaneSizeChange?.([clientSize - panelSize, panelSize]);
      }
    } else {
      onHorizontalPaneSizeChange?.(sizes);
    }
  };
  const {
    testbackModals: {
      initTestbackVisible = false
    }
  } = useTestbackModal();
  return (
    <div
      id={ID_APP}
      className={classNames(appClassName, "myMolecule")}
      tabIndex={0}
    >
      <div className={workbenchFinalClassName}>
        <Display visible={isMenuBarHorizontal}>
          <MenuBarView mode={MenuBarMode.horizontal} />
        </Display>
        <div className={mainBenchClassName}>
          <div className={compositeBarClassName}>
            {/* <Display visible={isMenuBarVertical}>
              <MenuBarView mode={MenuBarMode.vertical} />
            </Display> */}
            <Display
              visible={!activityBar.hidden}
              className={displayActivityBarClassName}
            >
              <ActivityBarView />
            </Display>
          </div>
          <SplitPane
            sizes={sidebar.hidden ? [0, "100%"] : splitPanePos}
            split="vertical"
            allowResize={[false, true]}
            onChange={handleSideBarChanged}
            onResizeStrategy={() => ["keep", "pave"]}
          >
            <Pane minSize={170} maxSize="80%">
              <SidebarView />
            </Pane>
            <SplitPane
              sizes={getSizes()}
              allowResize={[false, true]}
              split="horizontal"
              onChange={handleEditorChanged}
              onResizeStrategy={() => ["pave", "keep"]}
            >
              <Pane minSize="10%" maxSize="80%">
                {!activityBar.hidden && <BackTest />}
                <EditorView />
              </Pane>
              <PanelView />
            </SplitPane>
          </SplitPane>
          {/* <div style={{ width: 300 }}>
            <Sidebar current={SidePane.id} panes={[SidePane]} />
          </div> */}
        </div>
      </div>
      <Display visible={initTestbackVisible}>
        <InitTestBack />
      </Display>
      <Display visible={!statusBar.hidden}>
        <StatusBarView />
      </Display>
    </div>
  );
}

export default connect(layoutService, WorkbenchView, layoutController);
