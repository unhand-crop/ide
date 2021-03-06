import React, { CSSProperties } from "react";

import { Select as AntSelect } from "antd";
import styles from "./index.module.scss";

const { Option } = AntSelect;

interface ChildrenProps {
  value: string;
  label: string;
}

interface SelectProps {
  children: ChildrenProps[];
  style?: CSSProperties;
  onSelect?: () => void;
}

const Select = ({ children, style, onSelect, ...props }: SelectProps) => {
  return (
    <AntSelect
      onSelect={() => onSelect()}
      style={style}
      className={styles.select}
      dropdownStyle={{ backgroundColor: "#3f3c41" }}
      {...props}
    >
      {children.map((item: ChildrenProps, index: number) => (
        <Option key={index} value={item.value}>
          {item.label}
        </Option>
      ))}
    </AntSelect>
  );
};

export default Select;
