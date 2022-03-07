import { IExtension } from "@dtinsight/molecule/esm/model";
import { LauncherExtension } from "./launcher";
import { SearchExtension } from "./search";
import { AccountExtension } from "./account";
import { MarketExtension } from "./market";
import { ExplorerExtension } from "./explorer ";

const extensions: IExtension[] = [
	new LauncherExtension(),
	new SearchExtension(),
	new AccountExtension(),
	new MarketExtension(),
	new ExplorerExtension()
];

export default extensions;