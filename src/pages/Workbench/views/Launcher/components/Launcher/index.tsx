import { IconACreatnew, IconAOpenproject } from "@/components/iconfont";
// import useEditorModel from "@/models/editor";
import React from "react";
import styles from "./index.module.scss";

const LauncherCom = () => {
  //   const { setDirPath } = useEditorModel();

  //   const createNew = async () => {
  //     const path = await window.api.local.getDirectory();
  //     await window.api.engine.create(path);
  //     setDirPath(path);
  //   };

  //   const openPro = async () => {
  //     await window.api.local.openDirectory();
  //   };

  return (
    <div className={styles.launcher}>
      <div className={styles.project}>
        <p className={styles.title}>Start</p>
        <div className={styles.project_button}>
          <div
            // onClick={createNew}
            className={`${styles.project_operation} ${styles.text_width}`}
          >
            <div className={styles.project_icon}>
              <IconACreatnew />
            </div>
            <p>Creat New Algorithm</p>
          </div>
          <div
            className={`${styles.project_operation} ${styles.text_width}`}
            // onClick={openPro}
          >
            <div className={styles.project_icon}>
              <IconAOpenproject />
            </div>
            <p>Open Project</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LauncherCom;
