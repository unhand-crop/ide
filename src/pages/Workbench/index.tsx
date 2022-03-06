import "@dtinsight/molecule/esm/style/mo.css";

import * as React from "react";

import { MoleculeProvider } from "@dtinsight/molecule";
import Workbench from "./views/Workbench";
import extensions from "./extensions";

export default () => {
  return (
    <MoleculeProvider extensions={extensions}>
      <Workbench />
    </MoleculeProvider>
  );
};
