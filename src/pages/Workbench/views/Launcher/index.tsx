import {
  IconACreatnew,
  IconAOpenproject,
  IconAdd,
} from "@/components/iconfont";
import { useMount, useReactive } from "ahooks";

import Button from "./components/Button";
import { IpcRendererEvent } from "electron";
import Modal from "@/components/modal";
import React from "react";
import styles from "./index.module.scss";

const Launcher = () => {
  const state = useReactive({
    visible: false,
  });

  useMount(() => {
    window.api.ipc.on("select-path", (_: IpcRendererEvent, dirPath: string) => {
      console.log(dirPath, "是啥");
    });
  });

  const openPro = async () => {
    await window.api.local.openDirectory();
  };

  const handleNewBasicTemplate = async () => {
    await window.api.local.selectPath();
  };

  return (
    <div className={styles.launcher}>
      <div className={styles.project}>
        <div className={styles.project_button}>
          <Button
            icon={<IconACreatnew size={32} />}
            title="新建算法"
            onClick={() => (state.visible = true)}
          />
          <Button
            icon={<IconAOpenproject size={32} />}
            onClick={() => openPro()}
            title="打开算法"
          />
        </div>
      </div>
      <Modal
        title="新建算法"
        visible={state.visible}
        onCancel={() => (state.visible = false)}
      >
        <div className={styles.algorithm_container}>
          <ul className={styles.algorithm_list}>
            {/* <li
              onClick={() => handleBasicTemplate()}
              className={styles.algorithm_item}
            >
              <div className={styles.container}>
                <img src="./public/image/algorithm_template.png" />
              </div>
              <p className={styles.title}>基础模版</p>
            </li> */}
            <li
              onClick={() => handleNewBasicTemplate()}
              className={styles.algorithm_item}
            >
              <div className={styles.container}>
                <img src="./public/image/algorithm_template.png" />
                {/* <IconAdd color="#ffffff" size={64} /> */}
              </div>
              <p className={styles.title}>新建基础模版</p>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default Launcher;
