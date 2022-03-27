import { Button, Form } from "antd";

import CommonlyUsed from "./CommonlyUsed";
import React from "react";
import styles from "./index.module.scss";
import { useReactive } from "ahooks";

function Settings() {
  const [settingsForm] = Form.useForm();
  const state = useReactive({
    settingsMenus: [
      { label: "Commonly Used", id: "commonly-used" },
      { label: "Text Editor", id: "text-editor" },
    ],
    selectedItem: "commonly-used",
  });

  const handleMenusClick = (item: string) => {
    state.selectedItem = item;
  };

  const handleSave = () => {
    const data = settingsForm.getFieldsValue();
    console.log(data, "设置表单的值");
  };

  return (
    <div className={styles.settings}>
      <Button type="primary" onClick={handleSave}>
        保存
      </Button>
      <div className={styles.settings_content}>
        <div className={styles.search}>
          <input placeholder="Search settings" />
        </div>
        <div className={styles.settings_content_body}>
          <div className={styles.left_content}>
            <ul className={styles.menus}>
              {state.settingsMenus.map((item) => (
                <li
                  onClick={() => handleMenusClick(item.id)}
                  className={`${styles.menus_item} ${
                    state.selectedItem === item.id ? styles.isActive : ""
                  }`}
                  key={item.id}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.right_content}>
            <Form form={settingsForm}>
              {state.selectedItem === "commonly-used" && <CommonlyUsed />}
              {state.selectedItem === "text-editor" && (
                <span className="text-white">text editor</span>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
