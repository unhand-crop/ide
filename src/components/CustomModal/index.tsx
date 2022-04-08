import { Form, Input, Button, Space, DatePicker, Row, Col, Divider } from 'antd';
import { InfoBacktestButtonIcon } from "@/components/iconfont";
import Modal from "@/components/modal";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
// import useEngineModel from "@/models/engine";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";
import useBackTestModel from "@/models/backtest";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const next = localize("infoBacktest.next", "下一步");

const InitBackTest = () => {
  const { model: backtestModel } = useBackTestModel();
  const onFinish = (values: any) => {
    console.log(values)
    // backtestModel.customVisble = false;
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
        >
          <span className={styles.title}>回测属性</span>
          <Row style={{ padding: '0 38px' }}>
            <Col span={11}>
              <Form.Item className={styles.text_color} label="回测时间:" name="STARTDATE">
                <DatePicker placeholder='请选择日期' />
              </Form.Item>
            </Col>
            <Col span={1} className={styles.line}> - </Col>
            <Col span={11} offset={1}>
              <Form.Item className={styles.text_color} label='&nbsp;' name="ENDDATE">
                <DatePicker placeholder='请选择日期' />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ padding: '0 38px' }}>
            <Col span={12}>
              <Space>
                <Form.Item className={styles.text_color} label="手续费:" name="TRADEFEE">
                  <Input />
                  <span className={styles.text}>USD</span>
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <Divider style={{ background: '#5E5D61' }} />
          <div style={{ position: 'relative' }}>
            <span className={styles.title}>自定义</span>
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item style={{ float: 'left' }}>
                    <Button
                      ghost
                      shape="circle"
                      icon={<PlusOutlined />}
                      className={styles.button}
                      onClick={() => add()}
                    />
                  </Form.Item>
                  <div style={{ height: '113px', overflowY: 'scroll' }}>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8, padding: '0 38px' }}
                        align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'first']}
                          className={styles.text_color_map}
                        >
                          <Input />
                        </Form.Item>
                        <span style={{ color: '#fff' }}>:</span>
                        <Form.Item
                          {...restField}
                          name={[name, 'last']}
                          className={styles.text_color_map}
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
              className={styles.content_button}
              shape="round"
              htmlType="submit"
            >
              确定
            </Button>
            <Button
              className={styles.content_button}
              shape="round"
              htmlType="submit"
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default InitBackTest;
