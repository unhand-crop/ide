import Button from "./components/Button";
// import useEditorModel from "@/models/editor";
import React from "react";
import styles from "./index.module.scss";

const Launcher = () => {
  //   const { setDirPath } = useEditorModel();

  //   const createNew = async () => {
  //     const path = await window.api.local.getDirectory();
  //     await window.api.engine.create(path);
  //     setDirPath(path);
  //   };

  const openPro = async () => {
    await window.api.local.openDirectory();
  };

  return (
    <div className={styles.launcher}>
      <div className={styles.project}>
        <p className={styles.title}>启动</p>
        <div className={styles.project_button}>
          <Button title="新建算法" />
          <Button onClick={() => openPro()} title="打开算法" />
        </div>
      </div>
    </div>
  );
};

export default Launcher;
