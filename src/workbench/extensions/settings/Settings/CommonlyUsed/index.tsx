import React, { useEffect } from "react";
import { useMount, useReactive } from "ahooks";

import { Form } from "antd";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import { getAllCurrencys } from "@/services/currency";
import { getCurrencyRates } from "@/services/currency-rate";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";

function CommonlyUsed() {
  const [settingsForm] = Form.useForm();
  const state = useReactive({
    visible: false,
    content: [],
    currency: "",
  });

  useMount(async () => {
    const data = await window.api.store.get("currency-conversion");
    if (data) {
      state.currency = data.currencyName;
    } else {
      state.currency = "USD";
    }
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

  const handleExchangeRate = () => {
    state.visible = true;
    getAllCurrencysData();
  };

  const handleSetExchangeRate = async (fullName: string, symbol: string) => {
    if (fullName !== "USD") {
      const { success, data } = await getCurrencyRates({
        from: "USD",
        to: fullName,
      });
      if (success) {
        state.currency = fullName;
        state.visible = false;
        window.api.store.set("currency-conversion", {
          currencyName: data.to,
          converted: data.converted,
          symbol: symbol,
        });
      }
    } else {
      state.currency = fullName;
      state.visible = false;
      window.api.store.set("currency-conversion", {
        currencyName: "USD",
        converted: 1,
        symbol: "$",
      });
    }
  };

  const getAllCurrencysData = async () => {
    const { success, data } = await getAllCurrencys();
    if (success) {
      state.content = data;
    }
  };

  return (
    <div className={styles.commonly_used}>
      <p className={styles.title}>
        {localize("settings.commonlyUsed", "????????????")}
      </p>
      <div className={styles.commonly_used_body}>
        <Form form={settingsForm}>
          <div className={styles.item}>
            <div className={styles.item_label}>
              {localize("settings.commonlyUsed.language", "??????")}
            </div>
            <Form.Item name="locale" initialValue="custom-zh-CN">
              <Select
                onSelect={() => handleSave()}
                style={{ width: 404 }}
                children={[
                  { value: "custom-zh-CN", label: "??????" },
                  { value: "custom-en", label: "English" },
                ]}
              />
            </Form.Item>
          </div>
          <div className={styles.item}>
            <div className={styles.item_label}>
              {localize("settings.commonlyUsed.fontSize", "??????????????????(??????)")}
            </div>
            <Form.Item name="fontSize" initialValue="11">
              <Input onBlur={() => handleSave()} style={{ width: 404 }} />
            </Form.Item>
          </div>
          <div className={styles.item}>
            <div className={styles.item_label}>
              {localize("settings.commonlyUsed.spaces", "??????")}
            </div>
            <p className={styles.item_introduce}>
              {localize(
                "settings.commonlyUsed.tab",
                "????????????????????????????????????"
              )}
            </p>
            <Form.Item name="tabSize" initialValue="3">
              <Input onBlur={() => handleSave()} style={{ width: 404 }} />
            </Form.Item>
          </div>
          <div className={styles.item}>
            <div className={styles.item_label}>
              {localize("settings.commonlyUsed.exchangeRate", "??????")}
            </div>
            <p
              onClick={() => handleExchangeRate()}
              className={styles.exchange_rate_text}
            >
              {state.currency}
            </p>
          </div>
        </Form>
      </div>
      <Modal
        title={localize("settings.commonlyUsed.exchangeRate", "??????")}
        onCancel={() => (state.visible = false)}
        visible={state.visible}
        width={840}
      >
        <div className={styles.exchange_rate_container}>
          <ul className={styles.exchange_rate_list}>
            {state.content.map((item, index) => {
              return (
                <li
                  onClick={() =>
                    handleSetExchangeRate(item.fullName, item.symbol)
                  }
                  className={styles.exchange_rate_item}
                  key={index}
                >
                  <p
                    className={`${
                      state.currency === item.fullName
                        ? styles.select_fullName
                        : styles.fullName
                    }`}
                  >
                    {item.fullName}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export default CommonlyUsed;
