import { MoleculeProvider } from "@dtinsight/molecule";
import Workbench from "./views/Workbench";
import extensions from "./extensions";
import "@dtinsight/molecule/esm/style/mo.css";
import * as React from "react";

export default () => {
  return (
    <MoleculeProvider extensions={extensions}>
      <Workbench />
    </MoleculeProvider>
  );
};
