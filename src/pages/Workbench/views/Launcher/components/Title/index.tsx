import React from "react";
import styles from "./index.module.scss";

interface titleProps {
  title: string;
}

const Title = ({ title }: titleProps) => {
  return (
    <div className={styles.body}>
      <span>{title}</span>
    </div>
  );
};

export default Title;
