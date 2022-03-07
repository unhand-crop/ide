import React from "react";
import styles from "./index.module.scss";

interface AddListProps {
  item: {
    name: string;
    symbol_description: string;
    market_type: string;
    exchange_name: string;
    img: string;
  };
  index: number;
}

const AddList = ({ item, index }: AddListProps) => {
  return (
    <li key={index} className={styles.item}>
      <div className={styles.left}>
        <p className={styles.name}>{item.name}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.symbol_description}>
          {item.symbol_description}
        </div>
        <div className={styles.exchange_cell}>
          <p className={styles.market_type}>{item.market_type}</p>
          <p className={styles.exchange_name}>{item.exchange_name}</p>
          <img className={styles.icon} src={item.img} />
          {/* <IconTianjia size={28} color="#2c62ff" /> */}
        </div>
      </div>
    </li>
  );
};

export default AddList;
