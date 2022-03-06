import "@dtinsight/molecule/esm/style/mo.css";

import * as React from "react";

import { MoleculeProvider, Workbench } from "@dtinsight/molecule";

export default () => {
  return (
    <MoleculeProvider extensions={[]}>
      <Workbench />
    </MoleculeProvider>
  );
};
