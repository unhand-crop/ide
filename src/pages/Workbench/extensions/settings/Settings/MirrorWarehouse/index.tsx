import { Input as AntdInput, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import Button from "@/components/button";
import Input from "@/components/input";
import React from "react";
import styles from "./index.module.scss";

const MirrorWarehouse = () => {
  const [imageForm] = Form.useForm();

  const handleSave = () => {
    const data = imageForm.getFieldsValue();
    if (data.mirrorAddress && data.username && data.password) {
      window.api.store.set("mirror-account", data);
    }
  };

  return (
    <div className={styles.mirror_warehouse}>
      <p className={styles.title}>镜像仓库管理</p>
      <div className={styles.mirror_warehouse_body}>
        <Form form={imageForm}>
          <div className={styles.item}>
            <div className={styles.item_label}>镜像地址</div>
            <Form.Item
              rules={[{ required: true, message: "镜像地址必填" }]}
              name="mirrorAddress"
              initialValue="registry-1.docker.io"
            >
              <Input placeholder="请输入镜像地址" style={{ width: 404 }} />
            </Form.Item>
          </div>
          <div className={styles.item}>
            <div className={styles.item_label}>用户名</div>
            <Form.Item
              rules={[{ required: true, message: "用户名必填" }]}
              name="username"
            >
              <Input placeholder="请输入用户名" style={{ width: 404 }} />
            </Form.Item>
          </div>
          <div className={styles.item}>
            <div className={styles.item_label}>密码</div>
            <Form.Item
              rules={[{ required: true, message: "密码必填" }]}
              name="password"
            >
              <AntdInput.Password
                placeholder="请输入密码"
                className={styles.password_input}
                style={{ width: 404 }}
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone twoToneColor="#999" />
                  ) : (
                    <EyeInvisibleOutlined style={{ color: "#999" }} />
                  )
                }
              />
            </Form.Item>
          </div>
          <Button type="submit" title="保存" onClick={() => handleSave()} />
        </Form>
      </div>
    </div>
  );
};

export default MirrorWarehouse;
