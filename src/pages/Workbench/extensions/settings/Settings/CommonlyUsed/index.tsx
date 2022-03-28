import Checkbox from "@/components/checkbox";
import { Form } from "antd";
import Input from "@/components/input";
import React from "react";
import Select from "@/components/select";
import styles from "./index.module.scss";

function CommonlyUsed() {
  return (
    <div className={styles.commonly_used}>
      <p className={styles.title}>常用设置</p>
      <div className={styles.commonly_used_body}>
        <div className={styles.item}>
          <div className={styles.item_label}>语言</div>
          <Form.Item name="locale" initialValue="en">
            <Select
              style={{ width: 404 }}
              children={[
                { value: "zh-CN", label: "中文" },
                { value: "en", label: "英语" },
              ]}
            />
          </Form.Item>
        </div>
        <div className={styles.item}>
          <div className={styles.item_label}>控制字体大小(像素)。</div>
          <Form.Item name="fontSize" initialValue="11">
            <Input style={{ width: 404 }} />
          </Form.Item>
        </div>
        <div className={styles.item}>
          <div className={styles.item_label}>空格</div>
          <p className={styles.item_introduce}>一个制表符等于一个空格数。</p>
          <Form.Item name="tabSize" initialValue="3">
            <Input style={{ width: 404 }} />
          </Form.Item>
        </div>
        {/* <div className={styles.item}>
          <div className={styles.item_label}>Editor：Font Family</div>
          <p className={styles.item_introduce}>控制字体系列。</p>
          <Form.Item
            name="fontFamily"
            initialValue="Menlo Monaco，'Courier New'，Monospace"
          >
            <Input style={{ width: 404 }} />
          </Form.Item>
        </div> */}
        {/* <div className={styles.item}>
          <div className={styles.item_label}>Editor：Insert Spaces</div>
          <div className={styles.item_flex_introduce}>
            <Form.Item
              name="insertSpaces"
              valuePropName="checked"
              initialValue={false}
            >
              <Checkbox />
            </Form.Item>
            <p className={styles.item_introduce}>
              Insert spaces when pressing tab.this setting is overridden based
              on the file contents when{" "}
              <a className={styles.blue_text}>Editor:Detect Indentation </a> is
              on.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default CommonlyUsed;
