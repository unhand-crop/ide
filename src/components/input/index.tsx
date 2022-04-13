import React, { CSSProperties, ReactNode } from "react";

import { Input as AntInput } from "antd";
import styles from "./index.module.scss";

interface InputProps {
  style?: CSSProperties;
  placeholder?: string;
  prefix?: ReactNode;
  onBlur?: () => void;
}

function Input({ style, placeholder, onBlur, prefix, ...props }: InputProps) {
  return (
    <AntInput
      onBlur={() => onBlur()}
      style={style}
      prefix={prefix}
      className={styles.input}
      {...props}
      placeholder={placeholder}
    />
  );
}

export default Input;
