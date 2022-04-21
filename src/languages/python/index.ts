import * as monaco from "monaco-editor";
import * as python from "./python";

import { GetApiTreeMethodsInfoOutPut } from "@/services/api-tree";

const ID = "python";

// declare var AMD: any;
// declare var require: any;

export const register = async (data: GetApiTreeMethodsInfoOutPut[]) => {
  monaco.languages.register({
    id: ID,
    extensions: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi"],
    aliases: ["Python", "py"],
    firstLine: "^#!/.*\\bpython[0-9.-]*\\b",
    // loader: () => {
    //   if (AMD) {
    //     return new Promise((resolve, reject) => {
    //       require(["vs/basic-languages/python/python"], resolve, reject);
    //     });
    //   } else {
    //     return import("./python");
    //   }
    // },
  });
  monaco.languages.setMonarchTokensProvider(ID, python.language);
  monaco.languages.registerCompletionItemProvider(
    ID,
    python.getCompletionItemProvider(data)
  );
};
