import { useMount, useReactive } from "ahooks";

import CommonlyUsed from "./CommonlyUsed";
import { Form } from "antd";
import React from "react";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import AboutUs from "./AboutUs";


function Settings() {
  const [settingsForm] = Form.useForm();
  const state = useReactive({
    settingsMenus: [
      { label: localize("settings.commonlyUsed", "常用设置"), id: "commonly-used" },
      { label: localize("settings.textEditor", "文本编辑器"), id: "text-editor" },
      { label: localize("settings.AboutUs", "关于我们"), id: "About-us" },
    ],
    selectedItem: "commonly-used",
  });

  useMount(async () => {
    let settings = await window.api.store.get("settings");
    settingsForm.setFieldsValue({
      locale: settings.locale,
      fontSize: settings.editor.fontSize,
      tabSize: settings.editor.tabSize,
      colorTheme: "One Dark Pro",
      // renderWhitespace: settings.editor.renderWhitespace,
    });
  });

  const handleMenusClick = (item: string) => {
    state.selectedItem = item;
  };

  const handleSave = () => {
    const data = settingsForm.getFieldsValue();
    const settings = {
      editor: {
        fontSize: data.fontSize,
        // renderWhitespace: "none",
        tabSize: data.tabSize,
      },
      colorTheme: "One Dark Pro",
      locale: data.locale,
    };
    window.api.store.set("settings", settings);
    molecule.settings.applySettings(settings);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settings_content}>
        <div className={styles.settings_content_body}>
          <div className={styles.left_content}>
            <ul className={styles.menus}>
              {state.settingsMenus.map((item) => (
                <li
                  onClick={() => handleMenusClick(item.id)}
                  className={`${styles.menus_item} ${state.selectedItem === item.id ? styles.isActive : ""
                    }`}
                  key={item.id}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.right_content}>
            {state.selectedItem === "commonly-used" && (
              <Form form={settingsForm}>
                <CommonlyUsed handleSave={() => handleSave()} />
              </Form>
            )}
            {state.selectedItem === "text-editor" && (
              <span className="text-white">text editor</span>
            )}
            {state.selectedItem === "About-us" && (
              <AboutUs />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
