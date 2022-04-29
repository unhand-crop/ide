import { IExtension } from "@dtinsight/molecule/esm/model";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
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
    molecule.panel.remove("panel.problems.title");
    molecule.panel.setActive("panel.output.title");
    molecule.panel.cleanOutput();
    molecule.panel.add(resultPanel);
  }

  dispose(extensionCtx: IExtensionService): void {
    molecule.panel.remove(resultPanel.id);
  }
}
