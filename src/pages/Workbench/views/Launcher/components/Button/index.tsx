import styles from "./index.module.scss";
import { IconACreatnew, IconAOpenproject } from "@/components/iconfont";
import React from "react";

interface ButtonProps {
  title: string;
}

const Button = ({ title }: ButtonProps) => {
  return (
    <div
      // onClick={createNew}
      className={`${styles.project_operation}`}
    >
      <div className={styles.project_icon}>{/* <IconACreatnew /> */}</div>
      <p>{title}</p>
    </div>
  );
};

export default Button;
