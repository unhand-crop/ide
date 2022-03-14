import { GetSymbolsOutput } from "@/services/symbol";
import { IconAdd } from "@/components/iconfont";
import React from "react";
import styles from "./index.module.scss";

interface AddListProps {
  item: GetSymbolsOutput;
  index: number;
}

const AddList = ({ item, index }: AddListProps) => {
  const handleAdd = async (item: GetSymbolsOutput) => {
    let addList = await window.api.store.get("defaultList");
    addList.push(JSON.parse(JSON.stringify(item)));
    await window.api.store.set("defaultList", addList);
  };

  return (
    <li className={styles.item}>
      <div className={styles.left}>
        <img className={styles.icon} src={item.imagePath} />
        <p className={styles.name}>{item.enName}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.symbol_description}>{item.remark}</div>
        <div className={styles.exchange_cell} onClick={() => handleAdd(item)}>
          <IconAdd size={28} color="#2c62ff" />
        </div>
      </div>
    </li>
  );
};

export default AddList;
