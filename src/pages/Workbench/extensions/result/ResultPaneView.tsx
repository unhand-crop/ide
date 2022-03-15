import { Table, TableColumnsType } from "antd";

import React from "react";
import { ResolutionString } from "@/components/TradingView/Chart/datafeed-api";
import TradingView from "@/components/TradingView";
import styles from "./ResultPaneView.module.scss";
import useEngineModel from "@/models/engine";
import { useReactive } from "ahooks";

const columns: TableColumnsType<never> | undefined = [
  {
    title: "Time",
    key: "Time",
    dataIndex: 1,
  },
  {
    title: "Type",
    key: "Type",
    dataIndex: 2,
  },
  {
    title: "Liquidity",
    key: "Liquidity",
    dataIndex: 3,
  },
  {
    title: "Price",
    key: "Price",
    dataIndex: 4,
  },
  {
    title: "Gas Fee",
    key: "Gas Fee",
    dataIndex: 5,
  },
  {
    title: "Fees Collected",
    key: "Fees Collected",
    dataIndex: 6,
  },
  {
    title: "Rebalance Loss",
    key: "Rebalance Loss",
    dataIndex: 7,
  },
  {
    title: "Net Profit",
    key: "Net Profit",
    dataIndex: 8,
  },
];

export default () => {
  const { model } = useEngineModel();
  const state = useReactive({
    // performanceList: [
    //   { label: "Pool", value: 0 },
    //   { label: "Time Range", value: 0 },
    //   { label: "Total Days", value: 0 },
    //   { label: "Price Range Size", value: 0 },
    //   { label: "Rebalance Strategy", value: 0 },
    //   { label: "Gross Fee APR", value: 0 },
    //   { label: "Gross Fee Return", value: 0 },
    //   { label: "Net APR", value: 0 },
    //   { label: "Net Returns", value: 0 },
    //   { label: "Rebalance Times", value: 0 },
    //   { label: "Rebalance Winning Ratio", value: 0 },
    //   { label: "Max Drawdown", value: 0 },
    //   { label: "Volatility", value: 0 },
    //   { label: "Sharpe Ratio", value: 0 },
    // ],
    marketList: [
      { label: "Open Price", value: 0 },
      { label: "Close Price", value: 0 },
      { label: "High Price", value: 0 },
      { label: "Low Price", value: 0 },
      { label: "Change", value: 0 },
      { label: "Amplitude", value: 0 },
    ],
  });
  return (
    <div className={styles.container}>
      <div className={styles.card_container}>
        <div className={styles.card_header}>
          <p>Performance</p>
        </div>
        <div className={styles.card_body}>
          <ul className={styles.card_list}>
            {model.Statistics.map(
              (item: { value: string; label: string }, index: number) => (
                <li className={styles.card_item} key={index}>
                  <div className={styles.item}>
                    <p className={styles.value}>{item.value}</p>
                    <p className={styles.label}>{item.label}</p>
                  </div>
                </li>
              )
            )}
          </ul>
          <div className={styles.chart}>
            <TradingView
              options={{
                symbol: "AAPL",
                interval: "D" as ResolutionString,
                datafeedUrl: "https://demo_feed.tradingview.com",
                chartsStorageUrl: "https://saveload.tradingview.com",
                chartsStorageApiVersion: "1.1",
                clientId: "tradingview.com",
                userId: "public_user_id",
                fullscreen: false,
                autosize: true,
                studiesOverrides: {},
                locale: "zh",
                theme: "Dark",
                height: 400,
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.card_container}>
        <div className={styles.card_header}>
          <p>Market</p>
        </div>
        <div style={{ padding: 0 }} className={styles.card_body}>
          <ul className={styles.card_list}>
            {state.marketList.map((item, index) => (
              <li className={styles.card_item} key={index}>
                <div className={styles.item}>
                  <p className={styles.value}>{item.value}</p>
                  <p className={styles.label}>{item.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.card_container}>
        <div className={styles.card_header}>
          <p>Activity</p>
        </div>
        <div style={{ padding: 0 }} className={styles.card_body}>
          <ul className={styles.row}>
            <li className={styles.row_item}>
              <div className={styles.content}>
                <div className={styles.title}>Initial Position</div>
                <div className={styles.title}>- -</div>
                <div className={styles.title}>- -</div>
              </div>
            </li>
            <li className={styles.row_item}>
              <div className={styles.content}>
                <div className={styles.title}>Final Position</div>
                <div className={styles.title}>- -</div>
                <div className={styles.title}>- -</div>
              </div>
            </li>
            <li className={styles.row_item}>
              <div className={styles.content}>
                <div className={styles.title}>Fees Collected</div>
                <div className={styles.title}>- -</div>
                <div className={styles.title}>- -</div>
              </div>
            </li>
          </ul>
          <div className={styles.split_line}></div>
          <Table columns={columns} dataSource={[]} pagination={false} />
        </div>
      </div>
    </div>
  );
};
