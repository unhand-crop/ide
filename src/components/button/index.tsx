import React from "react";
import styles from "./index.module.scss";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ title, onClick, disabled = false }: ButtonProps) => {
  return (
    <div
      onClick={!disabled ? onClick : null}
      className={
        disabled ? styles.component_button_disabled : styles.component_button
      }
    >
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default Button;
