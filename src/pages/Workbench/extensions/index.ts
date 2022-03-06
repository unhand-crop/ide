import { IExtension } from "@dtinsight/molecule/esm/model";
import { LauncherExtension } from "./launcher";
import { SearchExtension } from "./search";
import { AccountExtension } from "./account";

const extensions: IExtension[] = [
	new LauncherExtension(),
	new SearchExtension(),
	new AccountExtension()
];

export default extensions;