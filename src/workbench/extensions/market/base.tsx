import { IActivityBarItem, ISidebarPane } from "@dtinsight/molecule/esm/model";

import MarketSidebarView from "./MarketSidebarView";
import NewAlgorithmSidebar from "./NewAlgorithmSidebar";
import React from "react";
import { ResolutionString } from "@/components/TradingView/Chart/datafeed-api";
import TradingView from "@/components/TradingView";
import configs from "@/configs";
import molecule from "@dtinsight/molecule";

export const marketActivityBar: IActivityBarItem = {
  id: "sidebar.market",
  name: "MarketActivityBar",
  sortIndex: 1,
  title: "Market Management",
  icon: "database",
};

export const marketSidebar: ISidebarPane = {
  id: "sidebar.market",
  title: "Market Pane",
  render: () => {
    return <MarketSidebarView />;
  },
};

export const algorithmSidebar: ISidebarPane = {
  id: "sidebar.algorithm",
  title: "New algorithmSidebar",
  render: () => {
    return <NewAlgorithmSidebar />;
  },
};

export function openCreateDataSourceView(name: string) {
  const id = `market-symbol-${name}`;
  molecule.editor.open({
    id,
    name,
    renderPane: () => {
      return (
        <TradingView
          options={{
            symbol: name + "USD",
            interval: "1D" as ResolutionString,
            datafeedUrl: configs.baseUrl + "/eapi/v1/kline",
            timeframe: "3D",
            fullscreen: true,
            autosize: true,
            studiesOverrides: {},
            locale: "zh",
            theme: "Dark",
            height: 400,
            key: id,
          }}
        />
      );
    },
  });
}
