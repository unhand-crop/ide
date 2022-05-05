import { IExtension } from "@dtinsight/molecule/esm/model";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { consolePanel } from "./base";
import molecule from "@dtinsight/molecule";

export class ConsoleExtension implements IExtension {
  id: string = ConsoleExtension.name;
  name: string = ConsoleExtension.name;

  activate(extensionCtx: IExtensionService): void {
    molecule.panel.add(consolePanel);
    molecule.panel.setActive(consolePanel.id);
  }

  dispose(extensionCtx: IExtensionService): void {
    molecule.panel.remove(consolePanel.id);
  }
}
