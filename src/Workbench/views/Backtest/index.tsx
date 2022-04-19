import Button from "@/components/button";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";
import useBackTestModel from "@/models/backtest";
import useEngineModel from "@/models/engine";

const BackTest = () => {
  const { panel } = molecule.layout.getState();
  const { model: engineModel } = useEngineModel();
  const { model: backtestModel } = useBackTestModel();

  const handleBackTest = async () => {
    if (panel.hidden) {
      if (!panel.panelMaximized) {
        molecule.panel.toggleMaximize();
      }
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
        <Button
          disabled={engineModel.running}
          title={localize("backtest.backtest", "回测")}
          onClick={() => handleBackTest()}
        />
      </div>
      <div className={styles.button}>
        <Button
          disabled={Object.keys(engineModel.results).length < 1}
          title={localize("backtest.result", "结果")}
          onClick={() => handleResult()}
        />
      </div>
      <div className={styles.button}>
        <Button
          onClick={() =>
            (backtestModel.apiDocumentation = !backtestModel.apiDocumentation)
          }
          title={
            backtestModel.apiDocumentation
              ? localize("backtest.CloseAPIDocumentation", "关闭API文档")
              : localize("backtest.OpenAPIDocumentation", "打开API文档")
          }
        />
      </div>
    </div>
  );
};

export default BackTest;
