import { IconACreatnew, IconAOpenproject } from "@/components/iconfont";

import React from "react";
import styles from "./index.module.scss";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <div onClick={onClick} className={`${styles.project_operation}`}>
      <div className={styles.project_icon}>
        <IconACreatnew />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default Button;
