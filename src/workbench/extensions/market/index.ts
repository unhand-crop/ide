import molecule from "@dtinsight/molecule";
import { UniqueId } from "@dtinsight/molecule/esm/common/types";
import { IExtension } from "@dtinsight/molecule/esm/model";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { marketActivityBar, marketSidebar } from "./base";

export class MarketExtension implements IExtension {
  id: UniqueId = marketSidebar.id;
  name: string = MarketExtension.name;

  activate(extensionCtx: IExtensionService): void {
    this.initUI();
  }

  initUI() {
    molecule.sidebar.add(marketSidebar);
    molecule.activityBar.add(marketActivityBar);
    molecule.activityBar.onClick((id) => {
      if (id === marketSidebar.id) {
        const { panel, sidebar } = molecule.layout.getState();
        if (!panel.hidden) {
          molecule.layout.togglePanelVisibility();
        }
        if (!sidebar.hidden) {
          molecule.layout.toggleSidebarVisibility();
        }
      }
    });
  }

  dispose(extensionCtx: IExtensionService): void {
    molecule.activityBar.remove(marketActivityBar.id);
    molecule.sidebar.remove(marketSidebar.id);
  }
}
