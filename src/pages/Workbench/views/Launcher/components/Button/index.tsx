import React from "react";
import styles from "./index.module.scss";

interface ButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ title, onClick, icon }: ButtonProps) => {
  return (
    <div onClick={onClick} className={`${styles.project_operation}`}>
      <div className={styles.project_icon}>{icon}</div>
      <p>{title}</p>
    </div>
  );
};

export default Button;
