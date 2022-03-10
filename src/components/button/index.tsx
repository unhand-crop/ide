import React from "react";
import styles from "./index.module.scss";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <div onClick={onClick} className={styles.component_button}>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default Button;
