import { GetSymbolsOutput, getPage, getPageInput } from "@/services/symbol";
import { IconAdd, IconSearch } from "@/components/iconfont";
import { useMount, useReactive } from "ahooks";

import AddList from "./components/AddList";
import { Input } from "antd";
import List from "./components/List";
import Modal from "@/components/modal";
import React from "react";
import { openCreateDataSourceView } from "./base";
import styles from "./index.module.scss";
import useMarketModel from "@/models/market";

export default () => {
  const { model } = useMarketModel();
  const state = useReactive<{
    commodityList: any;
    selectIndex: number;
    coinVisible: boolean;
  }>({
    commodityList: [],
    selectIndex: -1,
    coinVisible: false,
  });

  const handleSelect = (index: number, name: string) => {
    state.selectIndex = index;
    openCreateDataSourceView(name);
  };

  useMount(async () => {
    const data: getPageInput = {
      pageIndex: 1,
      pageSize: 100,
      order: [],
      securityType: 1,
      name: "",
      symbol: "",
    };
    const result = await getPage({ ...data });
    if (result.statusCode === 200) {
      state.commodityList = result.data?.items;
    }
  });

  return (
    <div className={styles.coin_container}>
      <div className={styles.header}>
        <p>列表</p>
        <IconAdd
          onClick={() => (state.coinVisible = true)}
          size={24}
          color="#b2b5be"
        />
      </div>
      <div className={styles.table}>
        <div className={styles.table_column}>
          <span className={styles.column_header}>
            <span className={styles.label}>商品代码</span>
          </span>
          <span
            className={`${styles.last_column_header} ${styles.column_header}`}
          >
            <span className={styles.label}>最新价</span>
          </span>
          <span
            className={`${styles.last_column_header} ${styles.column_header}`}
          >
            <span className={styles.label}>涨跌</span>
          </span>
          <span
            className={`${styles.last_column_header} ${styles.column_header}`}
          >
            <span className={styles.label}>涨跌%</span>
          </span>
        </div>
        <div className={styles.table_content}>
          {model.defaultList.map((item: GetSymbolsOutput, index: number) => (
            <List
              index={index}
              item={item}
              selectIndex={state.selectIndex}
              onClick={() => handleSelect(index, item.enName)}
            />
          ))}
        </div>
      </div>
      <Modal
        onCancel={() => (state.coinVisible = false)}
        title="添加商品代码"
        visible={state.coinVisible}
      >
        <div className={styles.add_commodity_code}>
          <Input prefix={<IconSearch color="#fff" />} placeholder="搜索" />
          <div className={styles.commodity}>
            <div className={styles.commodity_header}>
              <p className={styles.commodity_code}>商品代码</p>
              <p className={styles.explain}>说明</p>
            </div>
            <div className={styles.commodity_content}>
              <ul className={styles.list}>
                {state.commodityList.map(
                  (item: GetSymbolsOutput, index: number) => (
                    <AddList index={index} item={item} />
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
