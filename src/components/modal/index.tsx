import React, { ReactNode } from "react";

import { Modal as ModalCom } from "antd";
import styles from "./index.module.scss";

interface ModalProps {
  visible: boolean;
  title: string;
  children: ReactNode;
  onCancel: () => void;
}

const Modal = ({ visible, title, children, onCancel }: ModalProps) => {
  return (
    <ModalCom
      visible={visible}
      title={title}
      footer={false}
      centered={true}
      width={866}
      onCancel={() => onCancel()}
      className={styles.component_modal}
    >
      {children}
    </ModalCom>
  );
};

export default Modal;
