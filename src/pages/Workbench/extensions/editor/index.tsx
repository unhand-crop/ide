import Button from "@/components/button";
import { IExtension } from "@dtinsight/molecule/esm/model";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import React from "react";
import molecule from "@dtinsight/molecule";

function initActions() {
  const { builtInEditorInitialActions } = molecule.builtin.getModules();
  molecule.editor.setDefaultActions([
    {
      id: "action.backtest",
      name: "Backtest",
      title: "回测",
      icon: <Button title="回测" />,
      place: "outer",
    },
    {
      id: "action.results",
      name: "Results",
      title: "结果",
      icon: <Button title="结果" />,
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
