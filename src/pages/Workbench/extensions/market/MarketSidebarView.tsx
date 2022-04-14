import {
  GetSymbolsOutput,
  getDefaultList,
  getPage,
  getPageInput,
} from "@/services/symbol";
import { IconAdd, IconSearch } from "@/components/iconfont";
import { Input, Pagination } from "antd";
import React, { useEffect, useState } from "react";

import AddList from "./components/AddList";
import List from "./components/List";
import Modal from "@/components/modal";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import { openCreateDataSourceView } from "./base";
import styles from "./index.module.scss";
import useMarketModel from "@/models/market";
import { useReactive } from "ahooks";

export default () => {
  const { model } = useMarketModel();
  const [params, setParams] = useState<getPageInput>({
    pageIndex: 1,
    pageSize: 12,
    order: [],
    securityType: 1,
    name: "",
    symbol: "",
  });
  const [exchangeRate, setExchangeRate] = useState(1);
  const [auxiliary, setAuxiliary] = useState(1);
  const state = useReactive<{
    commodityList: any;
    selectIndex: number;
    coinVisible: boolean;
    totalCount: number;
    existence: boolean;
  }>({
    commodityList: [],
    selectIndex: -1,
    coinVisible: false,
    totalCount: 0,
    existence: false,
  });

  useEffect(() => {
    if (params && state.coinVisible) {
      fetchData();
    }
  }, [params, state.coinVisible]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    fetchExchangeRate();
  }, [auxiliary, exchangeRate]);

  const fetchExchangeRate = async () => {
    const { converted } = await window.api.store.get("currency-conversion");
    setExchangeRate(converted);
    setAuxiliary(auxiliary + 1);
  };

  const init = async () => {
    const defaultList = await getList();
    if (defaultList) {
      model.defaultList = defaultList;
      model.symbols = defaultList
        .map((item: GetSymbolsOutput) => item.name + "-USD")
        .join(",");
    }
  };

  const handleSelect = (index: number, name: string) => {
    state.selectIndex = index;
    openCreateDataSourceView(name);
  };

  const fetchData = async () => {
    const result = await getPage({ ...params });
    if (result.statusCode === 200) {
      state.commodityList = result.data?.items;
      state.totalCount = result.data?.totalCount;
    }
  };

  const handleChange = (page: number, pageSize: number) => {
    setParams({ ...params, pageIndex: page });
  };

  const getList = async (): Promise<any> => {
    const defaultList = await window.api.store.get("defaultList");
    if (defaultList) return defaultList;
    const { statusCode, data } = await getDefaultList();
    if (statusCode === 200) return data;
    return [];
  };

  const setList = async (item: GetSymbolsOutput) => {
    const defaultList = await getList();
    defaultList.push(JSON.parse(JSON.stringify(item)));
    await window.api.store.set("defaultList", defaultList);
    return defaultList;
  };

  const removeDefaultListItem = async (itemSymbol: string) => {
    const defaultList = await getList();
    const newDefaultList = defaultList.filter(
      (item: GetSymbolsOutput) => item.symbol !== itemSymbol
    );
    await window.api.store.set("defaultList", newDefaultList);
    return newDefaultList;
  };

  const handleAdd = async (item: GetSymbolsOutput) => {
    const defaultList = await setList(item);
    upModelDefultList(defaultList);
  };

  const handleCanel = async (itemSymbol: string) => {
    const defaultList = await removeDefaultListItem(itemSymbol);
    upModelDefultList(defaultList);
  };

  const upModelDefultList = (defaultList: Array<any>) => {
    model.defaultList = defaultList;
    model.symbols = defaultList
      .map((item: GetSymbolsOutput) => item.name + "-USD")
      .join(",");
  };

  const handleEnter = (e: any) => {
    setParams({ ...params, name: e.target.defaultValue });
  };

  return (
    <>
      <div className={styles.coin_container}>
        <div className={styles.header}>
          <p>{localize("market.marketTrends", "市场趋势")}</p>
          <IconAdd
            onClick={() => (state.coinVisible = true)}
            size={18}
            color="#b2b5be"
          />
        </div>
        <div className={styles.table}>
          <div className={styles.table_column}>
            <span className={styles.column_header}>
              <span className={styles.label}>
                {localize("market.name", "名称")}
              </span>
            </span>
            <span
              className={`${styles.last_column_header} ${styles.column_header}`}
            >
              <span className={styles.label}>
                {localize("market.latestPrice", "名称")}
              </span>
            </span>
            <span
              className={`${styles.last_column_header} ${styles.column_header}`}
            >
              <span className={styles.label}>
                {localize("market.change", "名称")}
              </span>
            </span>
          </div>
          <div className={styles.table_content}>
            {model.defaultList.map((item: GetSymbolsOutput, index: number) => (
              <List
                index={index}
                key={index}
                item={item}
                exchangeRate={exchangeRate}
                selectIndex={state.selectIndex}
                onClick={() => handleSelect(index, item.enName)}
                onCanel={() => handleCanel(item.symbol)}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal
        onCancel={() => (state.coinVisible = false)}
        title={localize("market.addCurrency", "添加货币")}
        visible={state.coinVisible}
        width={866}
      >
        <div className={styles.add_commodity_code}>
          <Input
            onPressEnter={(e) => handleEnter(e)}
            prefix={<IconSearch color="#fff" />}
            placeholder={localize("market.searchCurrency", "搜索货币")}
          />
          <div className={styles.commodity}>
            <div className={styles.commodity_header}>
              <p className={styles.commodity_code}>
                {localize("market.name", "名称")}
              </p>
              <p className={styles.explain}>
                {localize("market.explain", "说明")}
              </p>
            </div>
            <div className={styles.commodity_content}>
              <ul className={styles.list}>
                {state.commodityList.map(
                  (item: GetSymbolsOutput, index: number) => {
                    const shouldAdd = model.defaultList.some(
                      (everyItem: GetSymbolsOutput) =>
                        everyItem.symbol === item.symbol
                    );
                    return (
                      <AddList
                        onClick={(item) => handleAdd(item)}
                        shouldAdd={!shouldAdd}
                        existence={state.existence}
                        index={index}
                        key={index}
                        item={item}
                      />
                    );
                  }
                )}
              </ul>
              <Pagination
                total={state.totalCount}
                defaultPageSize={12}
                hideOnSinglePage={true}
                showSizeChanger={false}
                showTotal={(total, range) =>
                  `${localize("market.total", "共有")} ${total} ${localize(
                    "market.items",
                    "数据"
                  )}`
                }
                onChange={(page, pageSize) => handleChange(page, pageSize)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
