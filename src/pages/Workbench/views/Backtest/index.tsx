import Button from "@/components/button";
import React from "react";
import styles from "./index.module.scss";

const BackTest = () => {
  return (
    <div className={styles.back_test_container}>
      <div className={styles.button}>
        <Button title="回测" />
      </div>
      <div className={styles.button}>
        <Button title="结果" />
      </div>
    </div>
  );
};

export default BackTest;
