import {
  IconACreatnew,
  IconAOpenproject,
  IconAdd,
} from "@/components/iconfont";

import Button from "./components/Button";

import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import styles from "./index.module.scss";
import useEditorModel from "@/models/editor";
import { useReactive } from "ahooks";
import { LanguageIcon } from "@/components/iconfont";
import Title from "./components/Title"
import NewAlgorithmModal from "./components/NewAlgorithmModal"

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
            title={localize("launcher.newAlgorithm", "新建算法")}
            onClick={() => (state.visible = true)}
          />
          <Button
            icon={<IconAOpenproject size={32} />}
            onClick={() => handleOpen()}
            title={localize("launcher.openAlgorithm", "打开算法")}
          />
        </div>
      </div>
      <NewAlgorithmModal visible={state.visible} visibleModal={() => state.visible = !state.visible} />
    </div>
  );
};

export default Launcher;
