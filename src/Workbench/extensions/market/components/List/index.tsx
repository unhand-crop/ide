import React, { useEffect } from "react";

import { GetSymbolsOutput } from "@/services/symbol";
import { IconClose } from "@/components/Iconfont";
import styles from "./index.module.scss";
import useMarketModel from "@/models/market";

interface ListProps {
  item: GetSymbolsOutput;
  index: number;
  exchangeRate: number;
  onClick: (index: number, name: string) => void;
  selectIndex: number;
  onCanel: (item: string) => void;
}

const List = ({
  item,
  index,
  exchangeRate,
  onClick,
  onCanel,
  selectIndex,
}: ListProps) => {
  const { model } = useMarketModel();

  return (
    <div
      className={`${styles.table_column} ${
        selectIndex === index ? styles.select_column : ""
      }
		`}
      onClick={(e) => {
        onClick(index, item.enName), e.stopPropagation();
      }}
    >
      <span className={styles.column_header}>
        <span className={styles.coin_logo_container}>
          <img className={styles.logo} src={item.imagePath} />
        </span>
        <span className={styles.coin_name}>{item.enName}</span>
      </span>
      <span className={`${styles.last_column_header} ${styles.column_header}`}>
        <span className={styles.label}>
          <span className={styles.inner}>
            $
            {Number(
              model.prices[item.enName + "-USD"]?.content?.currentPrice *
                exchangeRate ?? 0
            ).toFixed(2)}
          </span>
        </span>
      </span>
      <span className={`${styles.last_column_header} ${styles.column_header}`}>
        <span className={styles.label}>
          <span
            className={
              model.prices[item.enName + "-USD"]?.content?.direction === 1
                ? styles.plus
                : model.prices[item.enName + "-USD"]?.content?.direction === -1
                ? styles.fall
                : styles.inner
            }
          >
            {Number(
              model.prices[item.enName + "-USD"]?.content?.priceChangePercent ??
                0
            ).toFixed(2)}
            %
          </span>
        </span>
      </span>
      <span
        onClick={(e) => {
          onCanel(item.symbol), e.stopPropagation();
        }}
        className={styles.close}
      >
        <IconClose size={18} color="#787b86" />
      </span>
    </div>
  );
};

export default List;
