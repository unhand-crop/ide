import React, { ReactNode } from "react";

import { Modal as ModalCom } from "antd";
import styles from "./index.module.scss";

interface ModalProps {
  visible: boolean;
  title?: string;
  width?: number;
  maskClosable?: boolean;
  children: ReactNode;
  onCancel: () => void;
}

const Modal = ({
  visible,
  title,
  children,
  onCancel,
  width,
  maskClosable = true,
}: ModalProps) => {
  return (
    <ModalCom
      visible={visible}
      title={title}
      footer={false}
      maskClosable={maskClosable}
      centered={true}
      width={width}
      onCancel={() => onCancel()}
      className={styles.component_modal}
    >
      {children}
    </ModalCom>
  );
};

export default Modal;
