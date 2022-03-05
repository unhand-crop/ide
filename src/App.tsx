import Workbench from "@/pages/Workbench";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

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
