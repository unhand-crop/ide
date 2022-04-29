import "moment/locale/zh-cn";

import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";

import Modal from "@/components/Modal";
import { PickerLocale } from "antd/lib/date-picker/generatePicker";
import en_US from "antd/es/date-picker/locale/en_US";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import molecule from "@dtinsight/molecule";
import moment from "moment";
import styles from "./index.module.scss";
import useBackTestModel from "@/models/back-test";
import useEditorModel from "@/models/editor";
import { useReactive } from "ahooks";
import zh_CN from "antd/es/date-picker/locale/zh_CN";

moment.locale("zh-cn");

const { RangePicker } = DatePicker;

interface ATTRIBUTESItem {
  first: string;
  last: string;
}

interface formValue {
  DATE: string;
  SERVICECHARGE: string;
  ATTRIBUTES: any;
}

const CustomBackTest = () => {
  const { model: editorModel } = useEditorModel();
  const { model: backtestModel } = useBackTestModel();
  const state = useReactive<{ locale: PickerLocale }>({
    locale: null,
  });
  const onFinish = async (values: formValue) => {
    const STARTDATE = moment(values.DATE[0]).format("YYYY-MM-DD");
    const ENDDATE = moment(values.DATE[1]).format("YYYY-MM-DD");
    const SERVICECHARGE = values.SERVICECHARGE;
    const ATTRIBUTES =
      values?.ATTRIBUTES?.map((item: ATTRIBUTESItem) => {
        return `${item.first}=${item.last}`;
      }) || [];

    backtestModel.visible = false;

    if (editorModel.dirPath) {
      await window.api.engine.backtest({
        id: editorModel.dirPath,
        ENDDATE,
        STARTDATE,
        SERVICECHARGE,
        ATTRIBUTES,
      });
    }
  };

  useEffect(() => {
    const locale = molecule.i18n.getCurrentLocale();
    if (locale.id === "custom-zh-CN") {
      state.locale = zh_CN;
    } else {
      state.locale = en_US;
    }
  }, []);

  return (
    <Modal
      width={476}
      visible={backtestModel.visible}
      onCancel={() => (backtestModel.visible = false)}
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
          <Form.Item
            name="DATE"
            className={styles.text_color}
            label={`${localize("customModal.backtestDate", "回测时间")}:`}
            rules={[
              {
                required: true,
                message: localize(
                  "customModal.backtestStartDate",
                  "请填写回测时间"
                ),
              },
            ]}
          >
            <RangePicker
              locale={state.locale}
              disabledDate={(current) => {
                return current && current > moment().endOf("day");
              }}
              allowClear={false}
            />
          </Form.Item>
          <Row>
            <Space>
              <Form.Item
                name="SERVICECHARGE"
                className={styles.text_color}
                label={`${localize("customModal.serviceCharge", "手续费")}:`}
                initialValue={0.1}
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
                <InputNumber precision={1} max={100} min={0} />
              </Form.Item>
            </Space>
            <div className={styles.service_charge_name}>
              <span className={styles.text}>%</span>
            </div>
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
              onClick={() => {
                backtestModel.visible = false;
              }}
            >
              {localize("customModal.cancel", "取消")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CustomBackTest;
