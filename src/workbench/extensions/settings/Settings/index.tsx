import AboutUs from "./AboutUs";
import CommonlyUsed from "./CommonlyUsed";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import styles from "./index.module.scss";
import { useReactive } from "ahooks";

function Settings() {
  const state = useReactive({
    settingsMenus: [
      {
        label: localize("settings.commonlyUsed", "常用设置"),
        id: "commonly-used",
      },
      { label: localize("settings.AboutUs", "关于我们"), id: "About-us" },
    ],
    selectedItem: "commonly-used",
  });

  const handleMenusClick = (item: string) => {
    state.selectedItem = item;
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
            {state.selectedItem === "commonly-used" && <CommonlyUsed />}
            {state.selectedItem === "About-us" && <AboutUs />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
