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
  const [currentChangeTemplateIndex, upCurrentChangeTemplateIndex] =
    useState(0);
  const [templateDetails, upTemplateDetails]: any = useState({});
  const [fileName, upFileName] = useState("my_algorithm");
  const { setDirPath } = useEditorModel();

  const handleOpen = async () => {
    await window.api.local.openDirectory();
  };

  const handleCreate = async () => {
    const path = await window.api.local.getDirectory();
    await window.api.engine.create(path);
    visibleModal();
    setDirPath(path);
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
    const dtl: any = await getTemplateDetails(
      templateList,
      currentChangeTemplateIndex
    );
  };

  const changeTemplate = (templateIndex: number) => {
    upCurrentChangeTemplateIndex(templateIndex);
  };

  const creactTemplateFile = async () => {
    await window.api.gitHttp.clone({ gitUrl: templateDetails.gitUrl, fileName: "~/Desktop", gitFileName: templateDetails.gitDir });
  };

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
                id = "4030405953277923328",
                shortDesc = "测试 空算法",
                templateName = "空算法",
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
              <div className={styles.language_content_title}>
                <Input
                  className={styles.content_title_input}
                  placeholder={templateDetails.templateName}
                  onChange={(e) => upFileName(e?.target?.value || "")}
                />
                <Button
                  className={styles.content_title_button}
                  color="#2154E0"
                  type="primary"
                  onClick={() => creactTemplateFile()}
                >
                  立即创建
                </Button>
              </div>
              <div className={styles.language_content_describe}>
                <div className={styles.content_describe_title}>算法描述</div>
                <div className={styles.content_describe_value}>
                  {templateDetails.description}
                </div>
              </div>
              <div className={styles.language_content_source}>
                <div className={styles.content_source_title}>源代码</div>
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
