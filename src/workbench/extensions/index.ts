import { AccountExtension } from "./account";
import { ActionExtension } from "./action";
import { ConsoleExtension } from "./console";
import { ExplorerExtension } from "./explorer";
import { ExtendLocales } from "./i18n";
import { FoldTreeExtension } from "./folderTree";
import { IExtension } from "@dtinsight/molecule/esm/model";
import { LauncherExtension } from "./launcher";
import { MarketExtension } from "./market";
import { OneDarkPro } from "./oneDarkPro/index";
import { ResultExtension } from "./result";
import { SearchExtension } from "./search";
import { SettingsExtension } from "./settings";
import { StatusBarExtension } from "./statusbar";

const extensions: IExtension[] = [
  new LauncherExtension(),
  new SearchExtension(),
  new AccountExtension(),
  new MarketExtension(),
  new ExplorerExtension(),
  new ConsoleExtension(),
  new ResultExtension(),
  new StatusBarExtension(),
  new FoldTreeExtension(),
  new ActionExtension(),
  new SettingsExtension(),
  OneDarkPro,
  ExtendLocales,
];

export default extensions;
