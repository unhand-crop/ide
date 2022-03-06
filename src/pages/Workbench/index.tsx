import { MoleculeProvider } from "@dtinsight/molecule";
import Workbench from "./views/Workbench";
import "@dtinsight/molecule/esm/style/mo.css";
import * as React from "react";

export default () => {
  return (
    <MoleculeProvider extensions={[]}>
      <Workbench />
    </MoleculeProvider>
  );
};
