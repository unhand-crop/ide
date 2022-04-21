import React from "react";
import styles from "./index.module.scss";

interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ title, onClick, disabled = false, type }: ButtonProps) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      className={
        disabled ? styles.component_button_disabled : styles.component_button
      }
      type={type}
    >
      <p className={styles.title}>{title}</p>
    </button>
  );
};

export default Button;
