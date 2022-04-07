import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  getTemplateList,
  requistTemplateDetails,
  templateListResponse,
} from "@/services/newAlgorithm";

import { LanguageIcon } from "@/components/iconfont";
import Modal from "@/components/modal";
import Title from "../Title";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
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
  const [currentChangeTemplateIndex, upCurrentChangeTemplateIndex] = useState(0);
  const [templateDetails, upTemplateDetails]: any = useState({});
  const [extractUrl, upExtractUrl] = useState(null);
  const [fileName, upFileName] = useState(null);
  const { setDirPath } = useEditorModel();

  const handleOpen = async () => {
    const url = await window.api.local.openDirectory();
    upExtractUrl(url);
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
    upCurrentTemplateList(items || []);
    return items;
  };

  const getTemplateDetails = async (
    templateList: any,
    templateIndex: number
  ) => {
    const id = templateList[templateIndex].id || 0;
    let { data = {} }: any = (await requistTemplateDetails(id)) || {};
    upTemplateDetails(data);
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
    await getTemplateDetails(
      templateList,
      currentChangeTemplateIndex
    );
  };

  const changeTemplate = (templateIndex: number) => {
    upCurrentChangeTemplateIndex(templateIndex);
  };

  const extractCallback = async (progress: number, path: string) => {
    if (progress === 100) {
      await window.api.engine.create(path);
      visibleModal();
      setDirPath(path);
    } else {

    }
  };

  const creactTemplateFile = async () => {
    await window.api.gitHttp.clone({ gitUrl: templateDetails.gitUrl, fileName, gitFileName: templateDetails.gitDir, extractUrl, extractCallback: extractCallback });
  };

  const defaultAlgorithmDir = localize("newAlgorithm.selectFolder", "请选择文件夹");
  return (
    <Modal
      title={localize("launcher.newAlgorithm", "新建算法")}
      width={900}
      visible={visible}
      onCancel={visibleModal}
    >
      <div className={styles.modal_body}>
        <div className={styles.language_select_body}>
          <Title
            title={localize("newAlgorithm.selectLanguage", "选择使用的语言")}
          />
          <div className={styles.language_list_body}>
            {languageList.map((item: any, index) => {
              return (
                <div
                  className={styles.language_list}
                  key={item.name}
                  style={item.change ? { backgroundColor: "#1e1e1e" } : {}}
                >
                  <LanguageIcon size={26} language="python" />
                  <span className={styles.language_name}>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.language_template_body}>
          <Title
            title={localize("newAlgorithm.selectTemplate", "选择使用的模版")}
          />
          <div className={styles.template_select_body}>
            {currentTemplateList.map((item: templateListResponse, index) => {
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
                <div className={styles.folder_title}>{localize("newAlgorithm.setDownloadFolder", "设置存放路径")}</div>
                <div className={styles.folder_content}>
                  <div className={styles.folder_input}>{extractUrl || defaultAlgorithmDir}</div>
                  <Button
                    className={styles.folder_button}
                    color="#2154E0"
                    type="primary"
                    onClick={() => handleOpen()}
                  >{localize("newAlgorithm.selectFolder", "选择文件夹")}</Button>
                </div>
              </div>
              <div className={styles.language_content_select}>
                <div className={styles.select_title}>{localize("newAlgorithm.selectFolder", "请选择文件夹")}</div>
                <div className={styles.select_content}>
                  <Input
                    className={styles.content_input}
                    placeholder={templateDetails.templateName}
                    onChange={(res) => {
                      const reg = /[^\w\u4e00-\u9fa5]/g;
                      const str = res?.target?.value.toString().replace(reg, "");
                      upFileName(str);
                    }}
                  />
                  <Button
                    className={styles.content_button}
                    color="#2154E0"
                    type="primary"
                    onClick={() => creactTemplateFile()}
                  >
                    {localize("newAlgorithm.creactNow", "立即创建")}
                  </Button>
                </div>
              </div>
              <div className={styles.language_content_describe}>
                <div className={styles.content_describe_title}>{localize("newAlgorithm.algorithmDescribe", "算法描述")}</div>
                <div className={styles.content_describe_value}>
                  {templateDetails.description}
                </div>
              </div>
              <div className={styles.language_content_source}>
                <div className={styles.content_source_title}>{localize("newAlgorithm.sourceCode", "源代码")}</div>
                {templateDetails.imageUrl.length > 0 && (
                  <img
                    className={styles.content_source_image}
                    src={templateDetails.imageUrl}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NewAlgorithmModal;
