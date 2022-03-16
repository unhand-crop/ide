import Button from "@/components/button";
import React from "react";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";

const BackTest = () => {
  const { panel } = molecule.layout.getState();
  const { folderTree } = molecule.folderTree.getState();

  const handleBackTest = async () => {
    if (panel.hidden) {
      if (!panel.panelMaximized) {
        molecule.panel.toggleMaximize();
      }
      molecule.layout.togglePanelVisibility();
    }
    if (folderTree?.data[0]?.id) {
      await window.api.engine.backtest(folderTree?.data[0]?.id);
    }
  };

  const handleResult = () => {
    if (!panel.panelMaximized) {
      molecule.panel.toggleMaximize();
    }
    molecule.layout.togglePanelVisibility();
  };
  return (
    <div className={styles.back_test_container}>
      <div className={styles.button}>
        <Button title="回测" onClick={() => handleBackTest()} />
      </div>
      <div className={styles.button}>
        <Button title="结果" onClick={() => handleResult()} />
      </div>
    </div>
  );
};

export default BackTest;
