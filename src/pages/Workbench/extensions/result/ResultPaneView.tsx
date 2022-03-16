import React, { useEffect } from "react";
import { Spin, Table, TableColumnsType } from "antd";

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
  const state = useReactive<{
    results: any;
    loading: boolean;
  }>({
    results: {},
    loading: false,
  });
  useEffect(() => {
    const Statistics = model?.results?.content?.oResults || {};
    state.results = Statistics;
    if (Object.keys(state.results).length > 0) {
      state.loading = false;
    } else {
      state.loading = false;
    }
  }, [model.results]);

  return (
    <div className={styles.container}>
      <Spin size="large" tip="加载中..." spinning={state.loading}>
        {state.loading && <div className={styles.occlusion}></div>}
        <div className={styles.card_container}>
          <div className={styles.card_header}>
            <p>Statistics</p>
          </div>
          <div className={styles.card_body}>
            <ul className={styles.card_list}>
              {state.results?.Statistics &&
                Object.keys(state.results?.Statistics).map((key, index) => {
                  const item = state.results?.Statistics[key];
                  return (
                    <li className={styles.card_item} key={index}>
                      <div className={styles.item}>
                        <p className={styles.value}>{item}</p>
                        <p className={styles.label}>{key}</p>
                      </div>
                    </li>
                  );
                })}
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
            <p>RuntimeStatistics</p>
          </div>
          <div style={{ padding: 0 }} className={styles.card_body}>
            <ul className={styles.card_list}>
              {state.results?.RuntimeStatistics &&
                Object.keys(state.results?.RuntimeStatistics).map(
                  (key, index) => {
                    const item = state.results?.RuntimeStatistics[key];
                    return (
                      <li className={styles.card_item} key={index}>
                        <div className={styles.item}>
                          <p className={styles.value}>{item}</p>
                          <p className={styles.label}>{key}</p>
                        </div>
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        </div>
        <div className={styles.card_container}>
          {/* <div className={styles.card_header}>
            <p>Activity</p>
          </div> */}
          <div style={{ padding: 0 }} className={styles.card_body}>
            {/* <ul className={styles.row}>
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
            </ul> */}
            <div className={styles.split_line}></div>
            <Table columns={columns} dataSource={[]} pagination={false} />
          </div>
        </div>
      </Spin>
    </div>
  );
};
