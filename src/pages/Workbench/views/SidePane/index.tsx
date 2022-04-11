import React, { useCallback, useEffect } from "react";

import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { IActionBarItemProps } from "@dtinsight/molecule/esm/components";
import { ISidebarPane } from "@dtinsight/molecule/esm/model";
import { getPythonMethods } from "@/services/apiTree";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import styles from "./index.module.scss";
import { useReactive } from "ahooks";

const { Panel } = Collapse;

export function SidePaneView() {
  const state = useReactive({
    fileTree: [],
  });
  //   useEffect(() => {
  //     (async () => {
  //       const { success, data } = await getPythonMethods();
  //       if (success) {
  //         const result = JSON.parse(data);
  //         state.fileTree = result.methods;
  //       }
  //     })();
  //   }, []);

  //   const handleFetchDetail = useCallback((id: number) => {
  //     if (id) {
  //       console.log(11111);
  //     }
  //   }, []);

  return (
    <div className={styles.file_tree_container}>
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
        {/* {state.fileTree.map((item, index) => (
          <Panel
            key={index}
            header={
              <div
                onClick={() => handleFetchDetail(item?.children[0]?.typeId)}
                className={styles.file_tree_header_container}
              >
                <img className={styles.header_icon} src={item.icon} />
                <span className={styles.header_text}>{item.text}</span>
              </div>
            }
          >
            1111
          </Panel>
        ))} */}
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
