import Button from "@/components/Button";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import molecule from "@dtinsight/molecule";
import { resultPanel } from "@/workbench/extensions/result/base";
import styles from "./index.module.scss";
import useBacktestModel from "@/models/back-test";
import useEngineModel from "@/models/engine";

const BackTest = () => {
  const { model: engineModel } = useEngineModel();
  const { model: backtestModel } = useBacktestModel();

  const handleBackTest = async () => {
    const { panel } = molecule.layout.getState();
    if (panel.hidden) {
      if (!panel.panelMaximized) {
        molecule.panel.toggleMaximize();
      }
    }
    if (
      engineModel.checkVM &&
      engineModel.checkInstance &&
      engineModel.checkImage
    ) {
      backtestModel.visible = true;
    } else {
      engineModel.modalVisible = true;
    }
  };

  const handleResult = () => {
    const { panel } = molecule.layout.getState();
    if (!panel.panelMaximized) {
      molecule.panel.toggleMaximize();
    }
    molecule.panel.setActive(resultPanel.id);
    molecule.layout.togglePanelVisibility();
  };

  return (
    <div className={styles.back_test_container}>
      <div className={styles.button}>
        <Button
          disabled={engineModel.running}
          title={localize("backtest.backtest", "回测")}
          onClick={() => {
            handleBackTest();
          }}
        />
      </div>
      <div className={styles.button}>
        <Button
          disabled={!engineModel.results}
          title={localize("backtest.result", "结果")}
          onClick={() => handleResult()}
        />
      </div>
      <div className={styles.button}>
        <Button
          onClick={() => {
            engineModel.docsPanelVisible = !engineModel.docsPanelVisible;
          }}
          title={
            engineModel.docsPanelVisible
              ? localize("backtest.CloseAPIDocumentation", "关闭API文档")
              : localize("backtest.OpenAPIDocumentation", "打开API文档")
          }
        />
      </div>
    </div>
  );
};

export default BackTest;
