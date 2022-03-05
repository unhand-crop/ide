import Index from "@/pages/Index";
import Workbench from "@/pages/Workbench";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function render() {
  ReactDOM.render(
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/workbench" element={<Workbench />} />
      </Routes>
    </Router>,
    document.body
  );
}

render();
