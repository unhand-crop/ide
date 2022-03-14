import { GetSymbolsOutput, getPage, getPageInput } from "@/services/symbol";
import { IconAdd, IconSearch } from "@/components/iconfont";
import { Input, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useMount, useReactive } from "ahooks";

import AddList from "./components/AddList";
import List from "./components/List";
import Modal from "@/components/modal";
import { openCreateDataSourceView } from "./base";
import styles from "./index.module.scss";
import useMarketModel from "@/models/market";

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
  const state = useReactive<{
    commodityList: any;
    selectIndex: number;
    coinVisible: boolean;
    totalCount: number;
  }>({
    commodityList: [],
    selectIndex: -1,
    coinVisible: false,
    totalCount: 0,
  });

  useEffect(() => {
    fetchData();
  }, [params]);

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

  return (
    <div className={styles.coin_container}>
      <div className={styles.header}>
        <p>列表</p>
        <IconAdd
          onClick={() => (state.coinVisible = true)}
          size={18}
          color="#b2b5be"
        />
      </div>
      <div className={styles.table}>
        <div className={styles.table_column}>
          <span className={styles.column_header}>
            <span className={styles.label}>货币</span>
          </span>
          <span
            className={`${styles.last_column_header} ${styles.column_header}`}
          >
            <span className={styles.label}>最新价</span>
          </span>
          {/* <span
            className={`${styles.last_column_header} ${styles.column_header}`}
          >
            <span className={styles.label}>涨跌</span>
          </span> */}
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
              key={index}
              item={item}
              selectIndex={state.selectIndex}
              onClick={() => handleSelect(index, item.enName)}
            />
          ))}
        </div>
      </div>
      <Modal
        onCancel={() => (state.coinVisible = false)}
        title="添加货币"
        visible={state.coinVisible}
      >
        <div className={styles.add_commodity_code}>
          <Input prefix={<IconSearch color="#fff" />} placeholder="搜索" />
          <div className={styles.commodity}>
            <div className={styles.commodity_header}>
              <p className={styles.commodity_code}>货币</p>
              <p className={styles.explain}>说明</p>
            </div>
            <div className={styles.commodity_content}>
              <ul className={styles.list}>
                {state.commodityList.map(
                  (item: GetSymbolsOutput, index: number) => (
                    <AddList index={index} key={index} item={item} />
                  )
                )}
              </ul>
              <Pagination
                total={state.totalCount}
                defaultPageSize={12}
                showSizeChanger={false}
                showTotal={(total, range) => `共有${total}条数据`}
                onChange={(page, pageSize) => handleChange(page, pageSize)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
