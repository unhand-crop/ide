import { IExtension } from "@dtinsight/molecule/esm/model";
import { LauncherExtension } from "./launcher";
import { SearchExtension } from "./search";

const extensions: IExtension[] = [
	new LauncherExtension(),
	new SearchExtension()
];

export default extensions;