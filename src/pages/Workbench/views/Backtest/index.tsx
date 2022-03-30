import Button from "@/components/button";
import React, { useEffect, useState } from "react";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";
import useEngineModel from "@/models/engine";

const BackTest = () => {
  const { panel } = molecule.layout.getState();
  const { model } = useEngineModel();

  //   const state = useReactive({
  //     visible: false,
  //     radioValue: 0,
  //   });
  //   const [form] = Form.useForm();

  const handleBackTest = async () => {
    // state.visible = true;
    if (panel.hidden) {
      if (!panel.panelMaximized) {
        molecule.panel.toggleMaximize();
      }
      molecule.layout.togglePanelVisibility();
    }
    const { folderTree } = molecule.folderTree.getState();
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

  //   const handleSubmit = () => {};

  //   const handleCancel = () => {
  //     state.visible = false;
  //     form.resetFields();
  //   };
  return (
    <div className={styles.back_test_container}>
      <div className={styles.button}>
        <Button
          disabled={model.running}
          title="回测"
          onClick={() => handleBackTest()}
        />
      </div>
      <div className={styles.button}>
        <Button
          disabled={Object.keys(model.results).length < 1}
          title="结果"
          onClick={() => handleResult()}
        />
      </div>
      {/* <Modal
        title="回测"
        visible={state.visible}
        width={377}
        onCancel={() => (state.visible = false)}
      >
        <Form form={form} layout="vertical" className={styles.form}>
          <Form.Item
            label="时间间隔"
            rules={[{ required: true, message: "时间间隔必选" }]}
            name="INTERVAL"
          >
            <Radio.Group value={state.radioValue}>
              <Radio value="1d">1天</Radio>
              <Radio value="1h">1小时</Radio>
              <Radio value="1m">1分钟</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="STARTTIME"
            rules={[{ required: true, message: "回测开始时间必选" }]}
            label="回测开始时间"
          >
            <DatePicker locale={locale} />
          </Form.Item>
          <Form.Item
            name="ENDTIME"
            rules={[{ required: true, message: "回测结束时间必选" }]}
            label="回测结束时间"
          >
            <DatePicker locale={locale} />
          </Form.Item>
          <div className={styles.button_container}>
            <button onClick={() => handleSubmit()} className={styles.determine}>
              <span>确定</span>
            </button>
            <button onClick={() => handleCancel()} className={styles.cancel}>
              <span>取消</span>
            </button>
          </div>
        </Form>
      </Modal> */}
    </div>
  );
};

export default BackTest;
