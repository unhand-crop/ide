import Button from "./components/Button";
import { IconAdd } from "@/components/iconfont";
import Modal from "@/components/modal";
import { Pagination } from "antd";
import React from "react";
import styles from "./index.module.scss";
import { useReactive } from "ahooks";

const Launcher = () => {
  const state = useReactive({
    visible: false,
  });

  const openPro = async () => {
    await window.api.local.openDirectory();
  };

  return (
    <div className={styles.launcher}>
      <div className={styles.project}>
        <p className={styles.title}>启动</p>
        <div className={styles.project_button}>
          <Button title="新建算法" onClick={() => (state.visible = true)} />
          <Button onClick={() => openPro()} title="打开算法" />
        </div>
      </div>
      <Modal
        title="新建算法"
        visible={state.visible}
        onCancel={() => (state.visible = false)}
      >
        <div className={styles.algorithm_container}>
          <ul className={styles.algorithm_list}>
            <li className={styles.algorithm_item}>
              <div className={styles.container}>
                <img src="./public/image/algorithm_template.png" />
              </div>
              <p className={styles.title}>基础模版</p>
            </li>
            <li className={styles.algorithm_item}>
              <div className={styles.container}>
                <IconAdd color="#ffffff" size={64} />
              </div>
              <p className={styles.title}>新建模版</p>
            </li>
          </ul>
          {/* <Pagination /> */}
        </div>
      </Modal>
    </div>
  );
};

export default Launcher;
