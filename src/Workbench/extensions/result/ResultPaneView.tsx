import { Button, Progress, Table, TableColumnsType } from "antd";
import {
  IconProgressPending,
  IconProgressReject,
  IconProgressResolve,
  IconProgressWait,
} from "@/components/iconfont";
import React, { useEffect } from "react";

import TradingViewDataBase from "@/components/TradingView/TradingViewDataBase";
import molecule from "@dtinsight/molecule";
import styles from "./ResultPaneView.module.scss";
import useEngineModel from "@/models/engine";
import { useReactive } from "ahooks";

const columns: TableColumnsType<never> | undefined = [
  {
    title: "Date Time",
    dataIndex: "Time",
    key: "1",
  },
  {
    title: "Symbol",
    dataIndex: "Symbol",
    key: "2",
  },
  {
    title: "Type",
    dataIndex: "Type",
    key: "3",
  },
  {
    title: "Price",
    dataIndex: "Price",
    key: "4",
  },
  {
    title: "Quantity",
    dataIndex: "Quantity",
    key: "5",
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "6",
  },
  {
    title: "Tag",
    dataIndex: "Tag",
    key: "7",
  },
];

interface statisticsListProps {
  label: string;
}

export default () => {
  const { model } = useEngineModel();
  const state = useReactive<{
    oResults: any;
    loading: boolean;
    statisticsList: statisticsListProps[];
    selectItem: number;
    dateResult: any;
    orders: readonly object[];
    TradeBars?: any;
    symbol?: string;
  }>({
    oResults: {},
    loading: false,
    statisticsList: [{ label: "周期统计" }, { label: "订单" }],
    selectItem: 0,
    dateResult: {},
    orders: [],
    TradeBars: [],
    symbol: "",
  });

  useEffect(() => {
    molecule.layout.onUpdateState(async (prevState, nextState) => {
      try {
        if (nextState.panel.hidden) {
          await window.api.engine.stop();
          initState();
        }
      } catch (e) {}
    });
  }, []);

  useEffect(() => {
    const { type = "", content = {} } = model?.results;
    if (type === "backtestresult") {
      const { Orders = {} } = (state.oResults = content?.oResults || {});
      state.orders = Orders;
      fetchData();
      state.loading = false;
    } else if (type === "kline") {
      state.symbol = content?.Symbol?.Value || "";
      state.TradeBars = content?.TradeBars || [];
      console.log('state.symbol, state.TradeBars', state.TradeBars);
    } else {
      state.loading = true;
    }
  }, [model.results]);

  const initState = () => {
    state.oResults = {};
    state.loading = true;
    state.statisticsList = [{ label: "周期统计" }, { label: "订单" }];
    state.selectItem = 0;
    state.dateResult = {};
    state.orders = [];
    state.TradeBars = [];
    state.symbol = "";
    model.algorithmstep = {};
  };

  const fetchData = () => {
    const datas = Object.keys(state.oResults?.RollingWindow).map((key) => {
      return key.split("_")[1];
    });
    const setArr = Array.from(new Set(datas));
    const config = ["M1", "M3", "M6", "M12"];
    const res: any = {};
    setArr.map((itemKey) => {
      const obj: any = {};
      for (let i = 0; i < 4; i++) {
        const key = `${config[i]}`;
        obj[key] = state.oResults?.RollingWindow[`${key}_${itemKey}`];
      }
      res[itemKey] = obj;
    });

    state.dateResult = res;
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.loading_container_body}
        style={{ display: state.loading ? "flex" : "none" }}
      >
        <div className={styles.loading_container_content}>
          {model.algorithmstepConfig.map((key: any, index) => {
            const obj = model.algorithmstep[key] || {};
            const { progress = 0, status = true } = obj;
            return (
              <div key={index} className={styles.loading_container_item}>
                <span className={styles.loading_item_title}>{key}</span>
                <div className={styles.loading_item_content}>
                  <Progress
                    percent={progress}
                    showInfo={false}
                    strokeColor="#2154E0"
                    trailColor="#3C3F41"
                    className={styles.loading_item_progress}
                  />
                  {progress === 0 && <IconProgressWait size={29} />}
                  {progress >= 100 && <IconProgressResolve size={29} />}
                  {progress > 0 && progress < 100 && (
                    <IconProgressPending
                      size={29}
                      color="rgb(33, 84, 224)"
                      className={styles.transform_rotate_loop}
                    />
                  )}
                  {!status && <IconProgressReject size={29} />}
                </div>
              </div>
            );
          })}
          <div className={styles.loading_item_buttonsize}>
            <Button
              type="primary"
              shape="round"
              size="large"
              block
              color="#2154E0"
              onClick={() => molecule.layout.togglePanelVisibility()}
            >
              取消
            </Button>
          </div>
        </div>
      </div>
      <div
        className={styles.all_container}
        style={{ visibility: state.loading ? "hidden" : "visible" }}
      >
        <div className={styles.card_container}>
          <div className={styles.card_header}>
            <p>重要指标</p>
          </div>
          <div className={styles.card_body}>
            <ul className={styles.card_list}>
              {state.oResults?.RuntimeStatistics &&
                Object.keys(state.oResults?.RuntimeStatistics).map(
                  (key, index) => {
                    const item = state.oResults?.RuntimeStatistics[key];
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
            <div className={styles.chart}>
              {state.TradeBars.length > 0 && (
                <TradingViewDataBase
                  TradeBars={state.TradeBars}
                  symbol={state.symbol}
                  orders={state.orders}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.card_container}>
          <div className={styles.card_header}>
            <p>详细指标</p>
          </div>
          <div style={{ padding: 0 }} className={styles.card_body}>
            <ul className={styles.card_list}>
              {state.oResults?.Statistics &&
                Object.keys(state.oResults?.Statistics).map((key, index) => {
                  const item = state.oResults?.Statistics[key];
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
          </div>
        </div>
        <div className={styles.card_container}>
          <div style={{ padding: 0 }} className={styles.card_body}>
            <div className={styles.statistics}>
              <div className={styles.statistics_header}>
                <ul className={styles.header_list}>
                  {state.statisticsList.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => (state.selectItem = index)}
                      className={`${styles.header_item} ${
                        state.selectItem === index ? styles.select_item : null
                      }`}
                    >
                      <p>{item.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
              {state.selectItem === 0 && (
                <div className={styles.statistics_body}>
                  <ul className={styles.date_list}>
                    <li className={styles.date_item}>
                      <p className={styles.text}></p>
                      <p className={styles.text}>1Month</p>
                      <p className={styles.text}>3Month</p>
                      <p className={styles.text}>6Month</p>
                      <p className={styles.text}>12Month</p>
                    </li>
                    {Object.keys(state.dateResult).map((item, index) => (
                      <li className={styles.date_item} key={index}>
                        <p className={styles.text}>{item}</p>
                        <p className={styles.text}>
                          {
                            state.dateResult[item]?.M1?.PortfolioStatistics
                              ?.SharpeRatio
                          }
                        </p>
                        <p className={styles.text}>
                          {
                            state.dateResult[item]?.M3?.PortfolioStatistics
                              ?.SharpeRatio
                          }
                        </p>
                        <p className={styles.text}>
                          {
                            state.dateResult[item]?.M6?.PortfolioStatistics
                              ?.SharpeRatio
                          }
                        </p>
                        <p className={styles.text}>
                          {
                            state.dateResult[item]?.M12?.PortfolioStatistics
                              ?.SharpeRatio
                          }
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {state.selectItem === 1 && (
                <Table
                  columns={columns}
                  dataSource={Object.values(state.orders)}
                  pagination={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
