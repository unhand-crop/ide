import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import Modal from "@/components/Modal";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";
import useBackTestModel from "@/models/back-test";

interface ATTRIBUTESItem {
  first: string;
  last: string;
}

interface formValue {
  ENDDATE: string;
  STARTDATE: string;
  SERVICECHARGE: string;
  ATTRIBUTES: any;
}

const greaterThanNine = (value: number) => {
  return value > 9 ? value : `0${value}`;
};

const formatDate = (date: any) => {
  const newDate = new Date(date);
  const y = newDate.getFullYear();
  const m = greaterThanNine(newDate.getMonth() + 1);
  const d = greaterThanNine(newDate.getDate());
  return `${y}-${m}-${d}`;
};

const InitBackTest = () => {
  const { model: backtestModel } = useBackTestModel();

  const onFinish = async (values: formValue) => {
    const STARTDATE = formatDate(values.STARTDATE);
    const ENDDATE = formatDate(values.ENDDATE);
    const SERVICECHARGE = values.SERVICECHARGE;
    const ATTRIBUTES =
      values?.ATTRIBUTES?.map((item: ATTRIBUTESItem) => {
        return `${item.first}=${item.last}`;
      }) || [];
    molecule.layout.togglePanelVisibility();
    backtestModel.customVisble = false;
    const { folderTree } = molecule.folderTree.getState();
    if (folderTree?.data[0]?.id) {
      await window.api.engine.backtest({
        id: folderTree?.data[0]?.id,
        ENDDATE,
        STARTDATE,
        SERVICECHARGE,
        ATTRIBUTES,
      });
    }
  };

  return (
    <Modal
      width={476}
      visible={backtestModel.customVisble}
      onCancel={() => (backtestModel.customVisble = false)}
    >
      <div className={styles.content_body}>
        <Form
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{}}
        >
          <span className={styles.title}>
            {localize("customModal.backtestAttribute", "回测属性")}
          </span>
          <Row style={{ padding: "0 38px" }}>
            <Col span={11}>
              <Form.Item
                name="STARTDATE"
                className={styles.text_color}
                label={`${localize("customModal.backtestDate", "回测时间")}:`}
                rules={[
                  {
                    required: true,
                    message: localize(
                      "customModal.backtestStartDate",
                      "请填写回测开始时间"
                    ),
                  },
                ]}
              >
                <DatePicker
                  allowClear={false}
                  placeholder={localize(
                    "customModal.pleaseSelectDate",
                    "请选择日期"
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={1} className={styles.line}>
              {" "}
              -{" "}
            </Col>
            <Col span={11} offset={1}>
              <Form.Item
                className={styles.text_color}
                label="&nbsp;"
                name="ENDDATE"
                rules={[
                  {
                    required: true,
                    message: localize(
                      "customModal.backtestEndDate",
                      "请填写回测结束时间"
                    ),
                  },
                ]}
              >
                <DatePicker
                  allowClear={false}
                  placeholder={localize(
                    "customModal.pleaseSelectDate",
                    "请选择日期"
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ padding: "0 38px" }}>
            <Col span={12}>
              <Row>
                <Space>
                  <Form.Item
                    name="SERVICECHARGE"
                    className={styles.text_color}
                    label={`${localize(
                      "customModal.serviceCharge",
                      "手续费"
                    )}:`}
                    rules={[
                      {
                        required: true,
                        message: localize(
                          "customModal.backtestServiceCharge",
                          "请填写回测手续费"
                        ),
                      },
                    ]}
                  >
                    <Input type="number" max={100} min={0} />
                  </Form.Item>
                </Space>
                <div className={styles.service_charge_name}>
                  <span className={styles.text}>%</span>
                </div>
              </Row>
            </Col>
          </Row>
          <Divider style={{ background: "#5E5D61" }} />
          <div style={{ position: "relative" }}>
            <span className={styles.title}>
              {localize("customModal.custom", "自定义")}
            </span>
            <Form.List name="ATTRIBUTES">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item style={{ float: "left" }}>
                    <Button
                      ghost
                      shape="circle"
                      icon={<PlusOutlined />}
                      className={styles.button}
                      onClick={() => add()}
                    />
                  </Form.Item>
                  <div className={styles.custom_item}>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                          padding: "0 38px",
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "first"]}
                          className={styles.text_color_map}
                          rules={[
                            {
                              required: true,
                              message: localize(
                                "customModal.customAttribute",
                                "请填写自定义属性"
                              ),
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <span style={{ color: "#fff" }}>:</span>
                        <Form.Item
                          {...restField}
                          name={[name, "last"]}
                          className={styles.text_color_map}
                          rules={[
                            {
                              required: true,
                              message: localize(
                                "customModal.customValue",
                                "请填写属性值"
                              ),
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Button
                          ghost
                          shape="circle"
                          icon={<MinusOutlined />}
                          className={styles.buttons}
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                  </div>
                </>
              )}
            </Form.List>
          </div>
          <Form.Item className={styles.center}>
            <Button
              className={styles.content_submit_button}
              color="#2154e0"
              shape="round"
              htmlType="submit"
              type="primary"
              disabled={false}
            >
              {localize("customModal.submit", "提交")}
            </Button>
            <Button
              className={styles.content_button}
              shape="round"
              htmlType="button"
              ghost={true}
              onClick={() => (backtestModel.customVisble = false)}
            >
              {localize("customModal.cancel", "取消")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default InitBackTest;
