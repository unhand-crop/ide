import * as React from "react";
import * as ReactDOM from "react-dom";

import { Route, HashRouter as Router, Routes } from "react-router-dom";

import Workbench from "@/pages/Workbench";
import useMarketgModel from "@/models/market";
import useSettingModel from "@/models/setting";

const App = () => {
  useSettingModel();
  useMarketgModel();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Workbench />} />
      </Routes>
    </Router>
  );
};

function render() {
  ReactDOM.render(<App />, document.body);
}

render();
