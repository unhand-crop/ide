import { Button } from "antd";
import { IconInfoBacktestButton } from "@/components/Iconfont";
import Modal from "@/components/Modal";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
// import useEngineModel from "@/models/engine";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";
import useBackTestModel from "@/models/back-test";

interface InitBackTestProps {
  icon?: React.ReactNode;
  onClick?: () => void;
}

const referenceDocuments = localize(
  "infoBacktest.referenceDocuments",
  "参考文档"
);
const next = localize("infoBacktest.next", "下一步");
const needCheckArr = [
  {
    name: localize("infoBacktest.WSL", "子系统是否已经开启?"),
  },
  {
    name: localize("infoBacktest.docker", "Docker是否已安装并启动了?"),
  },
  {
    name: localize("infoBacktest.images", "镜像是否已经下载了?"),
  },
];

const InitBackTest = ({ onClick }: InitBackTestProps) => {
  const { model: backtestModel } = useBackTestModel();
  const nextClick = () => {
    backtestModel.visible = false;
    backtestModel.customVisble = true;
  };

  return (
    <Modal
      width={399}
      visible={backtestModel.visible}
      onCancel={() => (backtestModel.visible = false)}
    >
      <div className={styles.content_body}>
        <div className={styles.check_body}>
          {needCheckArr.map((item: any, index) => {
            return (
              <div className={styles.check_item} key={index}>
                <span className={styles.check_item_name}>
                  {index + 1}、{item.name}
                </span>
                {index === 0 && (
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
                )}
              </div>
            );
          })}
        </div>
        <Button
          className={styles.content_button}
          shape="round"
          onClick={nextClick}
        >
          {next}
        </Button>
      </div>
    </Modal>
  );
};

export default InitBackTest;
