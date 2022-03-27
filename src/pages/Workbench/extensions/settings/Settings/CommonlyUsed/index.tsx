import { Form } from "antd";
// import Checkbox from '@/components/Checkbox';
import Input from "@/components/input";
import React from "react";
import Select from "@/components/select";
import styles from "./index.module.scss";

function CommonlyUsed() {
  return (
    <div className={styles.commonly_used}>
      <p className={styles.title}>Commonly Used</p>
      <div className={styles.commonly_used_body}>
        <div className={styles.item}>
          <div className={styles.item_label}>Files：Auto Save</div>
          <p className={styles.item_introduce}>
            Controls auto save of editors that have unsaved changes. Read more
            about autosave <a className={styles.blue_text}>here</a>.
          </p>
          <Form.Item name="autoSave" initialValue="off">
            <Select
              style={{ width: 404 }}
              children={[
                { value: "off", label: "OFF" },
                { value: "on", label: "ON" },
              ]}
            />
          </Form.Item>
        </div>
        <div className={styles.item}>
          <div className={styles.item_label}>Editor：Font Size</div>
          <p className={styles.item_introduce}>
            Controls the font size in pixels.
          </p>
          <Form.Item name="fontSize" initialValue="12">
            <Input style={{ width: 404 }} />
          </Form.Item>
        </div>
        <div className={styles.item}>
          <div className={styles.item_label}>Editor：Font Family</div>
          <p className={styles.item_introduce}>Controls the font family.</p>
          <Form.Item
            name="fontFamily"
            initialValue="Menlo Monaco，'Courier New'，Monospace"
          >
            <Input style={{ width: 404 }} />
          </Form.Item>
        </div>
        <div className={styles.item}>
          <div className={styles.item_label}>Editor：Insert Spaces</div>
          <div className={styles.item_flex_introduce}>
            <Form.Item
              name="insertSpaces"
              valuePropName="checked"
              initialValue={false}
            >
              {/* <Checkbox /> */}
            </Form.Item>
            <p className={styles.item_introduce}>
              Insert spaces when pressing tab.this setting is overridden based
              on the file contents when{" "}
              <a className={styles.blue_text}>Editor:Detect Indentation </a> is
              on.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonlyUsed;
