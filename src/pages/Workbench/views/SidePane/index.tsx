import { CaretRightOutlined, CloseOutlined } from "@ant-design/icons";
import { ParametersOutput, getApiTreeMethods } from "@/services/apiTree";
import React, { useCallback, useEffect } from "react";

import { Collapse } from "antd";
import { ISidebarPane } from "@dtinsight/molecule/esm/model";
import Input from "@/components/input";
import { SearchOutlined } from "@ant-design/icons";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import styles from "./index.module.scss";
import { useReactive } from "ahooks";

const { Panel } = Collapse;

export function SidePaneView() {
  const state = useReactive({
    apiFileTree: [],
    apiFileTreeDetail: {
      description: "",
      id: 0,
    },
  });

  useEffect(() => {
    (async () => {
      const { success, data } = await getApiTreeMethods({
        code: "algorithm-api",
      });
      if (success) {
        state.apiFileTree = data;
      }
    })();
  }, []);

  return (
    <div className={styles.file_tree_container}>
      <div className={styles.search_container}>
        <Input
          prefix={<SearchOutlined />}
          style={{ height: 28, width: 301 }}
          placeholder="搜索"
        />
        <CloseOutlined style={{ fontSize: "14px" }} />
      </div>
      <Collapse
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            style={{ color: "#d8d8d8" }}
            rotate={isActive ? 90 : 0}
          />
        )}
        ghost={true}
        bordered={false}
      >
        {state.apiFileTree.map((item, index) => (
          <Panel
            key={index}
            header={
              <div className={styles.file_tree_header_container}>
                <img className={styles.header_icon} src={item.icon} />
                <span className={styles.header_text}>{item.apiName}</span>
              </div>
            }
          >
            <div className={styles.document_details_container}>
              <p>{item?.description}</p>
              <div className={styles.parameter_container}>
                <div className={styles.parameter_item}>
                  <div className={styles.left_container}>
                    <p>Name</p>
                  </div>
                  <div className={styles.right_container}>
                    <p>Descipiton</p>
                  </div>
                </div>
                {item.inParameters.map((ite: ParametersOutput, idx: number) => (
                  <div key={idx} className={styles.parameter_item}>
                    <div className={styles.left_container}>
                      <p>{ite.name}</p>
                      <a>{ite.typeName}</a>
                    </div>
                    <div className={styles.right_container}>
                      <p>{ite.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export const SidePane: ISidebarPane = {
  id: "mySidePane",
  title: "Tools",
  render: () => {
    return <SidePaneView />;
  },
};
