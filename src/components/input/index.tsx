import React, { CSSProperties, ReactNode } from "react";

import { Input as AntInput } from "antd";
import styles from "./index.module.scss";

interface InputProps {
  allowClear?: boolean;
  style?: CSSProperties;
  placeholder?: string;
  prefix?: ReactNode;
  onBlur?: () => void;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  allowClear,
  style,
  placeholder,
  onBlur,
  prefix,
  onChange,
  ...props
}: InputProps) {
  return (
    <AntInput
      onBlur={() => onBlur()}
      onChange={(e) => onChange(e)}
      style={style}
      prefix={prefix}
      allowClear={allowClear}
      className={styles.input}
      {...props}
      placeholder={placeholder}
    />
  );
}

export default Input;
