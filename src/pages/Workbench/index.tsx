import "@dtinsight/molecule/esm/style/mo.css";

import * as React from "react";

import { MoleculeProvider } from "@dtinsight/molecule";
import Workbench from "./views/Workbench";

export default () => {
  return (
    <MoleculeProvider extensions={[]}>
      <Workbench />
    </MoleculeProvider>
  );
};
