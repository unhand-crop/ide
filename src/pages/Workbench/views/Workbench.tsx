import "reflect-metadata";

import {
  ILayoutController,
  LayoutController,
} from "@dtinsight/molecule/esm/controller/layout";
import React, { useEffect } from "react";
import {
  classNames,
  getFontInMac,
  prefixClaName,
} from "@dtinsight/molecule/esm/common/className";

import { APP_PREFIX } from "@dtinsight/molecule/esm/common/const";
import { ActivityBarView } from "@dtinsight/molecule/esm/workbench/activityBar";
import { EditorView } from "@dtinsight/molecule/esm//workbench/editor";
import { ID_APP } from "@dtinsight/molecule/esm/common/id";
import { ILayout } from "@dtinsight/molecule/esm/model/workbench/layout";
import { IWorkbench } from "@dtinsight/molecule/esm/model/workbench";
import { LayoutService } from "@dtinsight/molecule/esm/services";
//@ts-ignore
import Pane from "react-split-pane/lib/Pane";
import { PanelView } from "@dtinsight/molecule/esm//workbench/panel";
import { SidebarView } from "@dtinsight/molecule/esm//workbench/sidebar";
import SplitPane from "react-split-pane";
import { StatusBarView } from "@dtinsight/molecule/esm//workbench/statusBar";
import { connect } from "@dtinsight/molecule/esm/react";
import { container } from "tsyringe";
// import useEditorModel from "@/models/editor";
// import useSettingModel from "@/models/setting";
import molecule from "@dtinsight/molecule";

const mainBenchClassName = prefixClaName("mainBench");
const workbenchClassName = prefixClaName("workbench");
const compositeBarClassName = prefixClaName("compositeBar");
const appClassName = classNames(APP_PREFIX, getFontInMac());

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

  //   const { model } = useEditorModel();
  //   const { loadSettings } = useSettingModel();

  //   useEffect(() => {
  //     loadSettings();
  //   }, []);

  //   useEffect(() => {
  //     const hidden = !model.dirPath;
  //     molecule.layout.setState({
  //       activityBar: { hidden },
  //       sidebar: { hidden, position: "left" },
  //       statusBar: { hidden },
  //     });
  //   }, [model.dirPath]);

  const getContent = (panelMaximized: boolean, panelHidden: boolean) => {
    const editor = (
      <Pane
        key="editorView"
        initialSize={panelHidden ? "100%" : horizontalSplitPanePos[0]}
        maxSize="100%"
        minSize="10%"
      >
        <EditorView />
      </Pane>
    );

    const panel = (
      <Pane key="panelView">
        <PanelView />
      </Pane>
    );

    if (panelHidden) {
      return editor;
    }
    if (panelMaximized) {
      return panel;
    }
    return [editor, panel];
  };

  return (
    <div
      id={ID_APP}
      className={classNames(appClassName, "myMolecule")}
      tabIndex={0}
    >
      <div className={workbenchClassName}>
        {/* <TitleBar /> */}
        <div className={mainBenchClassName}>
          <div className={compositeBarClassName}>
            {!activityBar.hidden && <ActivityBarView />}
          </div>
          <SplitPane
            split="vertical"
            primary="first"
            allowResize={true}
            onChange={onPaneSizeChange as any}
          >
            <Pane
              minSize="170px"
              initialSize={splitPanePos[0]}
              maxSize="80%"
              className={sidebar.hidden && "hidden"}
            >
              <SidebarView />
            </Pane>
            <SplitPane
              primary="first"
              split="horizontal"
              allowResize={true}
              // react-split-pane onChange: (newSizes: [size, ratio]) => void；
              onChange={onHorizontalPaneSizeChange as any}
            >
              {getContent(!!panel.panelMaximized, !!panel.hidden)}
            </SplitPane>
            {/* <Pane
              minSize="40px"
              initialSize="240px"
              maxSize="40%"
              className={"rightSidebar"}
            >
              <Sidebar current={MySidePane.id} panes={[MySidePane]} />
            </Pane> */}
          </SplitPane>
        </div>
      </div>
      {!statusBar.hidden && <StatusBarView />}
    </div>
  );
}

export default connect(layoutService, WorkbenchView, layoutController);
