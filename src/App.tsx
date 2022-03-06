import * as React from "react";
import * as ReactDOM from "react-dom";

import { Route, HashRouter as Router, Routes } from "react-router-dom";

import Workbench from "@/pages/Workbench";

function render() {
  ReactDOM.render(
    <Router>
      <Routes>
        <Route path="/" element={<Workbench />} />
      </Routes>
    </Router>,
    document.body
  );
}

render();
