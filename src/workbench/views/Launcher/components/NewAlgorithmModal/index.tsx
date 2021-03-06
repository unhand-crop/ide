import { Button as AntButton, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  TemplateListResponse,
  getTemplateList,
  requistTemplateDetails,
} from "@/services/new-algorithm";

import Button from "@/components/Button";
import { IconPython } from "@/components/Iconfont";
import Modal from "@/components/Modal";
import { createPortal } from "react-dom";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import molecule from "@dtinsight/molecule";
import styles from "./index.module.scss";
import useEditorModel from "@/models/editor";

const languageList = [
  {
    name: "python",
    change: true,
  },
];

interface NewAlgorithmModalProps {
  visible: boolean;
  visibleModal: () => void;
}
const NewAlgorithmModal = ({
  visible,
  visibleModal,
}: NewAlgorithmModalProps) => {
  const [currentTemplateList, upCurrentTemplateList] = useState([]);
  const [currentChangeTemplateIndex, upCurrentChangeTemplateIndex] =
    useState(0);
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [templateDetails, upTemplateDetails]: any = useState({});
  const [extractUrl, upExtractUrl] = useState(null);
  const [fileName, upFileName] = useState(null);
  const { setDirPath } = useEditorModel();

  const handleOpen = async () => {
    const url = await window.api.local.openDirectory();
    if (!url) return;
    await window.api.store.set("defaultExtractUrl", url);
    upExtractUrl(url);
    setIsCreate(false);
  };

  const getTemplate = async ({
    pageIndex = 1,
    pageSize = 10,
    programLanguage = 1,
  }) => {
    let {
      data: { items = [] },
    } = (await getTemplateList({ pageIndex, pageSize, programLanguage })) || {};
    items = items.map((item: any, index: number) => {
      item.change = index === 0;
      return item;
    });
    return items;
  };

  const getTemplateDetails = async (id: string) => {
    let { data = {} }: any = (await requistTemplateDetails(id)) || {};
    return data;
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const templateList = await getTemplate({
      pageIndex: 1,
      pageSize: 10,
      programLanguage: 1,
    });
    const defaultExtractUrl = await window.api.store.get("defaultExtractUrl");
    upCurrentTemplateList(templateList);
    upExtractUrl(defaultExtractUrl);
    if (defaultExtractUrl) {
      setIsCreate(false);
    }
    if (templateList.length === 0) return;
    const templateDetails = await getTemplateDetails(templateList[0].id);
    upTemplateDetails(templateDetails);
    upFileName(templateDetails.templateName);
  };

  const changeTemplate = async (templateIndex: number) => {
    upCurrentChangeTemplateIndex(templateIndex);
    const templateDetails = await getTemplateDetails(
      currentTemplateList[templateIndex].id
    );
    upFileName(templateDetails.templateName);
    upTemplateDetails(templateDetails);
  };

  const creactTemplateFile = async () => {
    setLoading(true);
    const path = await window.api.gitHttp.clone({
      templateUrl: templateDetails.templateUrl,
      fileName: fileName + new Date().getTime().toString().substr(8),
      gitFileName: templateDetails.templateDir,
      extractUrl,
    });
    if (path) {
      await window.api.fs.unlink(
        extractUrl + "/" + templateDetails.templateDir
      );
      setLoading(false);
      visibleModal();
      setDirPath(path);
    }
  };

  const defaultAlgorithmDir = localize(
    "newAlgorithm.selectFolder",
    "??????????????????"
  );

  const handlCancel = async () => {
    setLoading(false);
  };
  return (
    <Modal
      title={localize("launcher.newAlgorithm", "????????????")}
      width={1000}
      visible={visible}
      onCancel={visibleModal}
      maskClosable={false}
    >
      {loading &&
        createPortal(
          <Spin
            tip={<Button onClick={() => handlCancel()} title="????????????" />}
            className={styles.spin_loading}
            spinning={loading}
          />,
          document.body
        )}
      <div id="modal" className={styles.modal_body}>
        <div className={styles.language_select_body}>
          {/* <Title
            title={localize("newAlgorithm.selectLanguage", "?????????????????????")}
          /> */}
          <div className={styles.language_list_body}>
            {languageList.map((item: any, index) => {
              return (
                <div
                  className={styles.language_list}
                  key={item.name}
                  style={item.change ? { backgroundColor: "#1e1e1e" } : {}}
                >
                  <IconPython size={28} />
                  <span className={styles.language_name}>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.language_template_body}>
          {/* <Title
            title={localize("newAlgorithm.selectTemplate", "?????????????????????")}
            style={{ paddingLeft: "23px" }}
          /> */}
          <div className={styles.template_select_body}>
            {currentTemplateList.map((item: TemplateListResponse, index) => {
              const {
                description = "",
                id = "",
                shortDesc = "",
                templateName = "",
              } = item;
              const change = currentChangeTemplateIndex === index;
              return (
                <div
                  className={styles.template_select_item}
                  key={id}
                  style={change ? { backgroundColor: "#1e1e1e" } : {}}
                  onClick={() => changeTemplate(index)}
                >
                  <div className={styles.item_name}>{templateName}</div>
                  <div className={styles.item_desc}>
                    {shortDesc.length > 0 ? shortDesc : description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.language_content_body}>
          {templateDetails.templateName && (
            <div className={styles.language_content_div}>
              <div className={styles.language_content_folder}>
                <div className={styles.folder_title}>
                  {!extractUrl && <span style={{ color: "red" }}>*</span>}
                  {localize("newAlgorithm.setDownloadFolder", "??????????????????")}
                </div>
                <div className={styles.folder_content}>
                  <div
                    className={styles.folder_input}
                    style={extractUrl ? { color: "#ffffff" } : {}}
                  >
                    {extractUrl || defaultAlgorithmDir}
                  </div>
                  <AntButton
                    className={styles.folder_button}
                    color="#2154E0"
                    type="primary"
                    onClick={() => handleOpen()}
                  >
                    {localize("newAlgorithm.selectFolder", "???????????????")}
                  </AntButton>
                </div>
              </div>
              {/* <div className={styles.language_content_select}>
                <div className={styles.select_title}>
                  {localize("newAlgorithm.selectFolder", "??????????????????")}
                </div>
                <div className={styles.select_content}>
                  <Input
                    className={styles.content_input}
                    placeholder={templateDetails.templateName}
                    onChange={(res) => {
                      const reg = /[^\w\u4e00-\u9fa5]/g;
                      const str = res?.target?.value
                        .toString()
                        .replace(reg, "");
                      upFileName(str);
                    }}
                  />
                  <Button
                    className={styles.content_button}
                    color="#2154E0"
                    type="primary"
                    onClick={() => creactTemplateFile()}
                  >
                    {localize("newAlgorithm.creactNow", "????????????")}
                  </Button>
                </div>
              </div> */}
              <div className={styles.language_content_container}>
                <div className={styles.language_content_describe}>
                  <div className={styles.content_describe_title}>
                    {localize("newAlgorithm.algorithmDescribe", "????????????")}
                  </div>
                  <div className={styles.content_describe_value}>
                    {templateDetails.description}
                  </div>
                </div>
                <div className={styles.language_content_source}>
                  <div className={styles.content_source_title}>
                    {localize("newAlgorithm.sourceCode", "?????????")}
                  </div>
                  {templateDetails.imageUrl.length > 0 && (
                    <img
                      className={styles.content_source_image}
                      src={templateDetails.imageUrl}
                    />
                  )}
                </div>
              </div>
              <div className={styles.language_operation}>
                <Button
                  disabled={isCreate}
                  onClick={() => creactTemplateFile()}
                  title={localize("newAlgorithm.create", "??????")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NewAlgorithmModal;
