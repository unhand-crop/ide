import { IExtension } from "@dtinsight/molecule/esm/model";
import { LauncherExtension } from "./launcher";

const extensions: IExtension[] = [
	new LauncherExtension()
];

export default extensions;