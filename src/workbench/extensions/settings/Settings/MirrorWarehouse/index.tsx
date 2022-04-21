import { Input as AntdInput, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import Button from "@/components/Button";
import Input from "@/components/Input";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
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
      <p className={styles.title}>
        {localize("settings.mirrorWarehouse", "镜像仓库管理")}
      </p>
      <div className={styles.mirror_warehouse_body}>
        <Form form={imageForm}>
          <div className={styles.item}>
            <div className={styles.item_label}>
              {localize("settings.mirrorWarehouse.address", "镜像地址")}
            </div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: localize(
                    "settings.mirrorWarehouse.addressRequired",
                    "镜像地址必填"
                  ),
                },
              ]}
              name="mirrorAddress"
              initialValue="registry-1.docker.io"
            >
              <Input
                placeholder={localize(
                  "settings.mirrorWarehouse.addressInput",
                  "请输入镜像仓库地址"
                )}
                style={{ width: 404 }}
              />
            </Form.Item>
          </div>
          <div className={styles.item}>
            <div className={styles.item_label}>
              {localize("settings.mirrorWarehouse.userName", "用户名")}
            </div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: localize(
                    "settings.mirrorWarehouse.userNameRequired",
                    "用户名必填"
                  ),
                },
              ]}
              name="username"
            >
              <Input
                placeholder={localize(
                  "settings.mirrorWarehouse.userNameInput",
                  "请输入用户名"
                )}
                style={{ width: 404 }}
              />
            </Form.Item>
          </div>
          <div className={styles.item}>
            <div className={styles.item_label}>
              {localize("settings.mirrorWarehouse.password", "密码")}
            </div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: localize(
                    "settings.mirrorWarehouse.passwordRequired",
                    "密码必填"
                  ),
                },
              ]}
              name="password"
            >
              <AntdInput.Password
                placeholder={localize(
                  "settings.mirrorWarehouse.passwordInput",
                  "请输入密码"
                )}
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
          <Button
            type="submit"
            title={localize("settings.mirrorWarehouse.submit", "保存")}
            onClick={() => handleSave()}
          />
        </Form>
      </div>
    </div>
  );
};

export default MirrorWarehouse;
