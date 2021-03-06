import { Button, Steps } from "antd";
import {
  CheckCircleOutlined,
  HistoryOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import Modal from "@/components/Modal";
import React from "react";
import { consolePanel } from "@/workbench/extensions/console/base";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";
import useBacktestModel from "@/models/back-test";
import useEngineModel from "@/models/engine";

interface InitBackTestProps {
  icon?: React.ReactNode;
  onClick?: () => void;
}

const { Step } = Steps;

const referenceDocuments = localize(
  "initEnvModel.referenceDocuments",
  "参考文档"
);
const next = localize("initEnvModel.next", "下一步");
const log = localize("initEnvModel.log", "查看日志");
const checkList = [
  {
    name: localize("initEnvModel.vm", "安装虚拟机容器"),
  },
  {
    name: localize("initEnvModel.image", "安装算法引擎"),
  },
];

const InitEnvModel = ({ onClick }: InitBackTestProps) => {
  const { model } = useEngineModel();
  const { model: backtestModel } = useBacktestModel();

  const nextClick = () => {
    model.modalVisible = false;
    backtestModel.visible = true;
  };

  const viewLogs = () => {
    model.modalVisible = false;
    molecule.layout.setState({
      panel: {
        hidden: false,
        panelMaximized: true,
      },
    });
    molecule.panel.setActive(consolePanel.id);
  };

  const disabled = !model.checkVM || !model.checkImage;

  return (
    <Modal
      width={399}
      visible={model.modalVisible}
      onCancel={() => (model.modalVisible = false)}
    >
      <div className={styles.content_body}>
        <div className={styles.check_body}>
          <Steps direction="vertical">
            <Step
              status={
                !model.checkingVM
                  ? model.checkVM
                    ? "finish"
                    : "wait"
                  : "process"
              }
              title={checkList[0].name}
              icon={
                !model.checkingVM ? (
                  model.checkVM ? (
                    <CheckCircleOutlined />
                  ) : (
                    <HistoryOutlined />
                  )
                ) : (
                  <LoadingOutlined />
                )
              }
            />
            <Step
              status={
                !model.checkingImage
                  ? model.checkImage
                    ? "finish"
                    : "wait"
                  : "process"
              }
              title={checkList[1].name}
              icon={
                !model.checkingImage ? (
                  model.checkImage ? (
                    <CheckCircleOutlined />
                  ) : (
                    <HistoryOutlined />
                  )
                ) : (
                  <LoadingOutlined />
                )
              }
            />
          </Steps>

          <div className={styles.check_item}>
            <span className={styles.check_item_name}></span>
            {/* {index === 0 && (
                  <Button
                    shape="round"
                    ghost={true}
                    className={styles.check_item_button}
                  >
                    <span className={styles.button_text}>
                      {referenceDocuments}
                    </span>
                    <IconInfoBacktestButton
                      size={20}
                      className={styles.button_icon}
                    />
                  </Button>
                )} */}
          </div>
        </div>
        <a className={styles.tips}>首次安装环境耗时较长，请耐心等待...</a>
        <Button
          className={`${styles.content_button} ${
            disabled ? styles.content_button_disabled : null
          }`}
          shape="round"
          onClick={nextClick}
          disabled={disabled}
        >
          {next}
        </Button>
        <a className={styles.view_logs} onClick={viewLogs}>
          {log}
        </a>
      </div>
    </Modal>
  );
};

export default InitEnvModel;
