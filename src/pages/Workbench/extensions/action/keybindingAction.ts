import { KeyCode, KeyMod } from "@dtinsight/molecule/esm/monaco";

import { Action2 } from "@dtinsight/molecule/esm/monaco/action";
//@ts-ignore
import { KeyChord } from "monaco-editor/esm/vs/base/common/keyCodes";
import { KeybindingWeight } from "@dtinsight/molecule/esm/monaco/common";
import molecule from "@dtinsight/molecule";

export class KeybindingAction extends Action2 {
  static readonly ID = "AutoSave";

  constructor() {
    super({
      id: KeybindingAction.ID,
      precondition: undefined,
      f1: false, // Not show in the Command Palette
      keybinding: {
        weight: KeybindingWeight.WorkbenchContrib,
        when: undefined,
        primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyS),
      },
    });
  }

  async run(accessor: any, ...args: any[]) {
		const { current } = molecule.editor.getState();
		if(current){
			const tab = molecule.editor.getTabById<any>(
				current!.activeTab!,
				current!.id,
			)!;
			await window.api.local.writeFile(tab.id,tab.data.value);
		}
    }
}
