import * as React from "react";
import * as ReactDOM from "react-dom";

import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { MoleculeProvider } from "@dtinsight/molecule";
import Workbench from "@/pages/Workbench/views/Workbench";
import extensions from "@/pages/Workbench/extensions";
import useEngineModel from "@/models/engine";

const App = () => {
  useEngineModel();
  return (
    <MoleculeProvider extensions={extensions}>
      <Router>
        <Routes>
          <Route path="/" element={<Workbench />} />
        </Routes>
      </Router>
    </MoleculeProvider>
  );
};

function render() {
  ReactDOM.render(<App />, document.body);
}

render();
