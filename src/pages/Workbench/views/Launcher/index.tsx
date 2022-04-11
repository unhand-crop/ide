import {
  IconACreatnew,
  IconAOpenproject,
  IconAdd,
} from "@/components/iconfont";
import React, { useEffect } from "react";

import Button from "./components/Button";
import { IconLanguage } from "@/components/iconfont";
import Modal from "@/components/modal";
import NewAlgorithmModal from "./components/NewAlgorithmModal";
import Title from "./components/Title";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import styles from "./index.module.scss";
import useEditorModel from "@/models/editor";
import { useReactive } from "ahooks";

const Launcher = () => {
  const state = useReactive({
    visible: false,
    content: [
      // { title: "demo", dirpath: "/Users/raozhi/Desktop/demo" },
      // { title: "algorithm", dirpath: "/Users/raozhi/Desktop/algorithm" },
    ],
  });

  const { setDirPath, model } = useEditorModel();

  const handleOpen = async () => {
    await window.api.local.openDirectory();
  };

  const handleCreate = async () => {
    const path = await window.api.local.getDirectory();
    await window.api.engine.create(path);
    state.visible = false;
    setDirPath(path);
  };

  const handleOpenHistoryItem = (dirpath: string) => {
    setDirPath(dirpath);
  };

  useEffect(() => {
    (async () => {
      const data = await window.api.store.get("history-path");
      const historyList = [];
      for (let i = 0; i < data.length; i++) {
        const obj: any = {};
        obj.dirpath = data[i];
        const index = obj.dirpath.lastIndexOf("/");
        const str = obj.dirpath.substring(index + 1, obj.dirpath.length);
        obj.title = str;
        historyList.unshift(obj);
      }
      state.content = historyList;
    })();
  }, [model.dirPath]);

  return (
    <div className={styles.launcher}>
      <div className={styles.project}>
        <div className={styles.project_button}>
          <Button
            icon={<IconACreatnew size={32} />}
            title={localize("launcher.newAlgorithm", "新建算法")}
            onClick={() => (state.visible = true)}
          />
          <Button
            icon={<IconAOpenproject size={32} />}
            onClick={() => handleOpen()}
            title={localize("launcher.openAlgorithm", "打开算法")}
          />
        </div>
        <div className={styles.algorithm_history}>
          <p className={styles.title}>最近打开</p>
          <ul className={styles.list}>
            {state.content.map((item, index) => (
              <li
                onClick={() => handleOpenHistoryItem(item.dirpath)}
                key={index}
                className={styles.item}
              >
                <p className={styles.item_name}>{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <NewAlgorithmModal
        visible={state.visible}
        visibleModal={() => (state.visible = !state.visible)}
      />
    </div>
  );
};

export default Launcher;
