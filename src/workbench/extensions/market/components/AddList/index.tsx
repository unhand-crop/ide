import React, { memo } from "react";

import { GetSymbolsOutput } from "@/services/symbol";
import { IconAdd } from "@/components/Iconfont";
import styles from "./index.module.scss";

interface AddListProps {
  item: GetSymbolsOutput;
  index: number;
  existence: boolean;
  shouldAdd: boolean;
  onClick: (item: GetSymbolsOutput) => void;
}

const AddList = memo(
  ({ item, index, existence, shouldAdd, onClick }: AddListProps) => {
    return (
      <li className={styles.item}>
        <div className={styles.left}>
          <img className={styles.icon} src={item.imagePath} />
          <p className={styles.name}>{item.enName}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.symbol_description}>{item.remark}</div>
          {shouldAdd && (
            <div className={styles.exchange_cell} onClick={() => onClick(item)}>
              <IconAdd size={28} color="#2c62ff" />
            </div>
          )}
        </div>
      </li>
    );
  }
);

export default AddList;
