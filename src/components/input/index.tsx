import React, { CSSProperties } from "react";

import { Input as AntInput } from "antd";
import styles from "./index.module.scss";

interface InputProps {
  style?: CSSProperties;
  placeholder?: string;
  onBlur?: () => void;
}

function Input({ style, placeholder, onBlur, ...props }: InputProps) {
  return (
    <AntInput
      onBlur={() => onBlur()}
      style={style}
      className={styles.input}
      {...props}
      placeholder={placeholder}
    />
  );
}

export default Input;
