import * as React from "react";
import * as ReactDOM from "react-dom";
import * as signalR from "@microsoft/signalr";

import { Route, HashRouter as Router, Routes } from "react-router-dom";

import Workbench from "@/pages/Workbench";
import { useMount } from "ahooks";
import useSettingModel from "@/models/setting";

const App = () => {
  useSettingModel();

  useMount(async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        "http://121.41.65.155:8085/binan?symbols=btcusdt&eventName=aggTrade&ticket="
      )
      .build();

    connection.on("binanMessage", (event, symbol, message) => {
      console.log(message);
    });

    // await connection.start();
  });

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
