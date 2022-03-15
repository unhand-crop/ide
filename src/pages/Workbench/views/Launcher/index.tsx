import {
  IconACreatnew,
  IconAOpenproject,
  IconAdd,
} from "@/components/iconfont";

import Button from "./components/Button";
import Modal from "@/components/modal";
import React from "react";
import styles from "./index.module.scss";
import useEditorModel from "@/models/editor";
import { useReactive } from "ahooks";

const Launcher = () => {
  const state = useReactive({
    visible: false,
  });

  const { setDirPath } = useEditorModel();

  const handleOpen = async () => {
    await window.api.local.openDirectory();
  };

  const handleCreate = async () => {
    const path = await window.api.local.getDirectory();
    await window.api.engine.create(path);
    state.visible = false;
    setDirPath(path);
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
            onClick={() => handleOpen()}
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
              onClick={() => handleCreate()}
              className={styles.algorithm_item}
            >
              <div className={styles.container}>
                {/* <img src="./public/image/algorithm_template.png" /> */}
                <IconAdd color="#ffffff" size={64} />
              </div>
              <p className={styles.title}>新建算法</p>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default Launcher;
