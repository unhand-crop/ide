import { AccountExtension } from "./account";
import { ActionExtension } from "./action";
import { ExplorerExtension } from "./explorer ";
import { FoldTreeExtension } from "./folderTree";
import { IExtension } from "@dtinsight/molecule/esm/model";
import { LauncherExtension } from "./launcher";
import { MarketExtension } from "./market";
import { OneDarkPro } from "./oneDarkPro/index";
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
  new FoldTreeExtension(),
  new ActionExtension(),
  OneDarkPro,
];

export default extensions;
