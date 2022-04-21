import React from "react";
import styles from "./index.module.scss";

interface titleProps {
  title: string;
  style?: any;
}

const Title = ({ title, style }: titleProps) => {
  return (
    <div className={styles.body} style={style ?? {}}>
      <span>{title}</span>
    </div>
  );
};

export default Title;
