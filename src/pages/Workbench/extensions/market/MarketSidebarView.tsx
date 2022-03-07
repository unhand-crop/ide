import React from "react";
import { Modal, Input } from "antd";
import styles from "./index.module.scss";
import { useReactive } from "ahooks";
import { openCreateDataSourceView } from "./base";
import List from "./components/List";
import AddList from "./components/AddList";
import { IconClose, IconSearch } from "@/components/iconfont";

export default () => {
  const state = useReactive({
    coinList: [
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/usdt.png?x-oss-process=image/format,webp",
        name: "USDT",
        latestPrice: { front: 32, after: 22.1 },
        riseAndFall: 20,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/USDC.png?x-oss-process=image/format,webp",
        name: "USDC",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 9,
        percentageUpAndDown: 19,
      },
      {
        img: "https://static.coinall.ltd/cdn/wallet/logo/ETH.png?x-oss-process=image/format,webp",
        name: "ETH",
        latestPrice: { front: 41, after: 21.1 },
        riseAndFall: 10,
        percentageUpAndDown: 20,
      },
    ],
    commodityList: [
      {
        name: "BTCUSDT",
        symbol_description: "Bitcoin / TetherUS",
        market_type: "crypto",
        exchange_name: "BINANCE",
        img: "https://s3-symbol-logo.tradingview.com/provider/binance.svg",
      },
      {
        name: "BTCUSD",
        symbol_description: "Bitcoin / U.S. dollar",
        market_type: "crypto",
        exchange_name: "BITSTAMP",
        img: "https://s3-symbol-logo.tradingview.com/provider/bitstamp.svg",
      },
      {
        name: "NIFTY",
        symbol_description: "NIFTY 50",
        market_type: "指数 ",
        exchange_name: "NSE",
        img: "https://s3-symbol-logo.tradingview.com/country/IN.svg",
      },
      {
        name: "BANKNIFTY",
        symbol_description: "NIFTY BANK",
        market_type: "指数 ",
        exchange_name: "NSE",
        img: "https://s3-symbol-logo.tradingview.com/country/IN.svg",
      },
      {
        name: "BTCUSD",
        symbol_description: "BTC/USD",
        market_type: "crypto",
        exchange_name: "COINBASE",
        img: "https://s3-symbol-logo.tradingview.com/provider/coinbase.svg",
      },
      {
        name: "XAUUSD",
        symbol_description: "GOLD",
        market_type: "差价合约",
        exchange_name: "ONADA",
        img: "https://s3-symbol-logo.tradingview.com/provider/fxcm.svg",
      },
      {
        name: "EURUSD",
        symbol_description: "Euro Fx/U.S. Dollar",
        market_type: "外汇",
        exchange_name: "FXCM",
        img: "https://s3-symbol-logo.tradingview.com/provider/fxcm.svg",
      },
    ],
    selectIndex: -1,
    coinVisible: false,
  });

  const handleSelect = (index: number, name: string) => {
    state.selectIndex = index;
    openCreateDataSourceView(name);
  };

  return (
    <div className={styles.coin_container}>
      <div className={styles.header}>
        <p>列表</p>
        <div color="#b2b5be" onClick={() => (state.coinVisible = true)}>
          添加
        </div>
        {/* <IconTianjia
          onClick={() => (state.coinVisible = true)}
          size={24}
          color="#b2b5be"
        /> */}
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
          {state.coinList.map((item, index) => (
            <List
              index={index}
              item={item}
              selectIndex={state.selectIndex}
              onClick={() => handleSelect(index, item.name)}
            />
          ))}
        </div>
      </div>
      <Modal
        onCancel={() => (state.coinVisible = false)}
        title="添加商品代码"
        visible={state.coinVisible}
        footer={false}
        centered={true}
        width={840}
        className={styles.add_commodity_code}
      >
        <Input prefix={<div>占位</div>} placeholder="搜索" />
        <div className={styles.commodity}>
          <div className={styles.commodity_header}>
            <p className={styles.commodity_code}>商品代码</p>
            <p className={styles.explain}>说明</p>
          </div>
          <div className={styles.commodity_content}>
            <ul className={styles.list}>
              {state.commodityList.map((item, index) => (
                <AddList index={index} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};