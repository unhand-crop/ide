import { MoleculeProvider, Workbench } from "@dtinsight/molecule";
import "@dtinsight/molecule/esm/style/mo.css";
import * as React from "react";

export default () => {
  return (
    <MoleculeProvider extensions={[]}>
      <Workbench />
    </MoleculeProvider>
  );
};
