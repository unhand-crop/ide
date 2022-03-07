import molecule from "@dtinsight/molecule";
import { IExtension } from "@dtinsight/molecule/esm/model";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { Button } from "antd";
import React from "react";

function initActions() {
  const { builtInEditorInitialActions } = molecule.builtin.getModules();
  molecule.editor.setDefaultActions([
    {
      id: "action.backtest",
      name: "Backtest",
      title: "回测",
      icon: (
        <Button className="editor-test-button" type="primary" size="small">
          回测
        </Button>
      ),
      place: "outer",
    },
    {
      id: "action.results",
      name: "Results",
      title: "结果",
      icon: (
        <Button className="editor-test-button" type="primary" size="small">
          结果
        </Button>
      ),
      place: "outer",
    },
    ...builtInEditorInitialActions,
  ]);
}

function emitEvent() {
  molecule.editor.onActionsClick(async (menuId, current) => {
    const { panel } = molecule.layout.getState();
    switch (menuId) {
      case "action.backtest":
        if (panel.hidden) {
          if (!panel.panelMaximized) {
            molecule.panel.toggleMaximize();
          }
          molecule.layout.togglePanelVisibility();
        }
        break;
      case "action.results":
        if (!panel.panelMaximized) {
          molecule.panel.toggleMaximize();
        }
        molecule.layout.togglePanelVisibility();
        break;
      default:
        break;
    }
  });
}

export class EditorExtension implements IExtension {
  id: string = EditorExtension.name;
  name: string = EditorExtension.name;

  activate(extensionCtx: IExtensionService): void {
    initActions();
    emitEvent();
  }

  dispose(extensionCtx: IExtensionService): void {}
}
