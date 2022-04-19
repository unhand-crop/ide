import * as monaco from "monaco-editor";

import log from "./log";

export const registerLanguages = () => {
  console.log("register languages");
  monaco.languages.register({
    id: "log",
    extensions: ["log", ".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi"],
    aliases: ["log", "Python", "py"],
  });
  monaco.languages.setMonarchTokensProvider("log", log);
  console.log(monaco.languages.getLanguages());
};
