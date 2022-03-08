// import useEditorModel from "@/models/editor";
import React from "react";
import Button from "./components/Button";
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
        <p className={styles.title}>Start</p>
        <div className={styles.project_button}>
          <Button title="Creat New Algorithm" />
          <Button onClick={() => openPro()} title="Open Project" />
        </div>
      </div>
    </div>
  );
};

export default Launcher;
