import { GetSymbolsOutput } from "@/services/symbol";
import { IconAdd } from "@/components/iconfont";
import React from "react";
import styles from "./index.module.scss";

interface AddListProps {
  item: GetSymbolsOutput;
  index: number;
}

const AddList = ({ item, index }: AddListProps) => {
  return (
    <li key={index} className={styles.item}>
      <div className={styles.left}>
        <img className={styles.icon} src={item.imagePath} />
        <p className={styles.name}>{item.enName}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.symbol_description}>{item.remark}</div>
        <div className={styles.exchange_cell}>
          <IconAdd size={28} color="#2c62ff" />
        </div>
      </div>
    </li>
  );
};

export default AddList;
