import { IconClose } from "@/components/iconfont";
import React from "react";
import styles from "./index.module.scss";

interface ItemProps {
  img: string;
  name: string;
  riseAndFall: number;
  latestPrice: {
    after: number;
    front: number;
  };
  percentageUpAndDown: number;
}

interface ListProps {
  item: ItemProps;
  index: number;
  onClick: (index: number, name: string) => void;
  selectIndex: number;
}

const List = ({ item, index, onClick, selectIndex }: ListProps) => {
  return (
    <div
      className={`${styles.table_column} ${
        selectIndex === index ? styles.select_column : ""
      }
		`}
      key={index}
      onClick={() => onClick(index, item.name)}
    >
      <span className={styles.column_header}>
        <span className={styles.coin_logo_container}>
          <img className={styles.logo} src={item.img} />
        </span>
        <span className={styles.coin_name}>{item.name}</span>
      </span>
      <span className={`${styles.last_column_header} ${styles.column_header}`}>
        <span className={styles.label}>
          <span className={styles.inner}>{item.latestPrice.after}</span>
          <span className={styles.plus}>{item.latestPrice.front}</span>
        </span>
      </span>
      <span className={`${styles.last_column_header} ${styles.column_header}`}>
        <span className={styles.label}>
          <span className={styles.fall}>-{item.riseAndFall}</span>
        </span>
      </span>
      <span className={`${styles.last_column_header} ${styles.column_header}`}>
        <span className={styles.label}>
          <span className={styles.fall}>-{item.percentageUpAndDown}%</span>
        </span>
      </span>
      <span className={styles.close}>
        <IconClose size={18} color="#787b86" />
      </span>
    </div>
  );
};

export default List;
