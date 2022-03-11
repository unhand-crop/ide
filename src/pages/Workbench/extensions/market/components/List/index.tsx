import { GetSymbolsOutput } from "@/services/symbol";
import { IconClose } from "@/components/iconfont";
import React from "react";
import styles from "./index.module.scss";
import useMarketModel from "@/models/market";

interface ListProps {
  item: GetSymbolsOutput;
  index: number;
  onClick: (index: number, name: string) => void;
  selectIndex: number;
}

const List = ({ item, index, onClick, selectIndex }: ListProps) => {
  const { model } = useMarketModel();
  // console.log(model.prices, "数据");

  return (
    <div
      className={`${styles.table_column} ${
        selectIndex === index ? styles.select_column : ""
      }
		`}
      onClick={() => onClick(index, item.enName)}
    >
      <span className={styles.column_header}>
        <span className={styles.coin_logo_container}>
          <img className={styles.logo} src={item.imagePath} />
        </span>
        <span className={styles.coin_name}>{item.enName}</span>
      </span>
      <span className={`${styles.last_column_header} ${styles.column_header}`}>
        <span className={styles.label}>
          <span className={styles.inner}>{/* {item.latestPrice.after} */}</span>
          <span className={styles.plus}>{/* {item.latestPrice.front} */}</span>
        </span>
      </span>
      <span className={`${styles.last_column_header} ${styles.column_header}`}>
        <span className={styles.label}>
          <span className={styles.fall}>{/* -{item.riseAndFall} */}</span>
        </span>
      </span>
      <span className={`${styles.last_column_header} ${styles.column_header}`}>
        <span className={styles.label}>
          <span className={styles.fall}>
            {/* -{item.percentageUpAndDown}% */}
          </span>
        </span>
      </span>
      <span className={styles.close}>
        <IconClose size={18} color="#787b86" />
      </span>
    </div>
  );
};

export default List;
