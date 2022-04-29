import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";

import { Collapse } from "antd";
import { ISidebarPane } from "@dtinsight/molecule/esm/model";
import Input from "@/components/Input";
import { ParametersOutput } from "@/services/api-tree";
import React from "react";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import styles from "./index.module.scss";
import useBackTestModel from "@/models/back-test";

const { Panel } = Collapse;

export function SidePaneView() {
  const { data, run } = useBackTestModel();

  return (
    <>
      <div className={styles.search_container}>
        <Input
          prefix={<SearchOutlined />}
          style={{ height: 28, width: 301 }}
          placeholder={localize("sidePane.search", "搜索API")}
          allowClear={true}
          onChange={(e) =>
            run({ code: "algorithm-api", apiName: e.target.value })
          }
        />
      </div>
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
          {data?.data ? (
            data?.data.map((item, index) => (
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
                    {item.inParameters.map(
                      (ite: ParametersOutput, idx: number) => (
                        <div key={idx} className={styles.parameter_item}>
                          <div className={styles.left_container}>
                            <p>{ite.name}</p>
                            <a>{ite.typeName}</a>
                          </div>
                          <div className={styles.right_container}>
                            <p>{ite.description}</p>
                          </div>
                        </div>
                      )
                    )}
                    {item.outParameters.map(
                      (ite: ParametersOutput, idx: number) => (
                        <div key={idx} className={styles.parameter_item}>
                          <div className={styles.left_container}>
                            <p className={styles.return}>Return</p>
                            <p>{ite.name}</p>
                            <a>{ite.typeName}</a>
                          </div>
                          <div className={styles.right_container}>
                            <p>{ite.description}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Panel>
            ))
          ) : (
            <div className={styles.empty_container}>
              <p>{localize("sidePane.noData", "没有此API")}~</p>
            </div>
          )}
        </Collapse>
      </div>
    </>
  );
}

export const SidePane: ISidebarPane = {
  id: "mySidePane",
  title: "Tools",
  render: () => {
    return <SidePaneView />;
  },
};
