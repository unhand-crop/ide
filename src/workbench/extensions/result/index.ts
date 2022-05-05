import { IExtension } from "@dtinsight/molecule/esm/model";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { constants } from "@dtinsight/molecule/esm/services/builtinService/const";
import molecule from "@dtinsight/molecule";
import { resultPanel } from "./base";

export class ResultExtension implements IExtension {
  id: string = ResultExtension.name;
  name: string = ResultExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.layout.setState({
      panel: {
        hidden: false,
        panelMaximized: false,
      },
    });
    molecule.panel.remove(constants.PANEL_PROBLEMS);
    molecule.panel.remove(constants.PANEL_OUTPUT);
    // molecule.panel.setActive(constants.PANEL_OUTPUT);
    molecule.panel.add(resultPanel);
  }

  dispose(extensionCtx: IExtensionService): void {
    molecule.panel.remove(resultPanel.id);
  }
}
