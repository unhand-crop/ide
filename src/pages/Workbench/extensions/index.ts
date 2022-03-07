import { IExtension } from "@dtinsight/molecule/esm/model";
import { AccountExtension } from "./account";
import { EditorExtension } from "./editor";
import { ExplorerExtension } from "./explorer ";
import { LauncherExtension } from "./launcher";
import { MarketExtension } from "./market";
import { ResultExtension } from "./result";
import { SearchExtension } from "./search";
import { StatusBarExtension } from "./statusbar";

const extensions: IExtension[] = [
	new LauncherExtension(),
	new SearchExtension(),
	new AccountExtension(),
	new MarketExtension(),
	new ExplorerExtension(),
	new ResultExtension(),
	new StatusBarExtension(),
	new EditorExtension(),
];

export default extensions;