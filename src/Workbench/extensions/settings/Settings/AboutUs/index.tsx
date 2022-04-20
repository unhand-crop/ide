import React, { useState } from "react";
import { productName, version } from "@/../package.json";

import { Button } from "antd";
import { IconLogo } from "@/components/iconfont";
import { getlatest } from "@/services/settings";
import { isLatestVersion } from "@/utils/index";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import styles from "./index.module.scss";

const updateMap: any = {
  "0": localize("settingsAboutUs.queryLatest", "查看更新"),
  "1": localize("settingsAboutUs.downloadLatestVersion", "有新版本"),
  "2": localize("settingsAboutUs.alreadyLatest", "已经是最新版本"),
};

const AboutUs = () => {
  const [updateStatus, setUpdateStatus] = useState("0");
  const [loading, setLoading] = useState(false);

  const getV = async () => {
    setLoading(true);
    const {
      data = {
        isRequired: false,
        version: "1.0.0",
        installPath: "",
      },
    } = await getlatest();
    const ILV = isLatestVersion(version, data.version);
    setUpdateStatus(ILV ? "2" : "1");
    setLoading(false);
  };

  const handleClick = async () => {
    if (updateStatus === "0") getV();
    if (updateStatus === "1") return;
  };

  return (
    <div className={styles.AboutUs_body}>
      <div className={styles.AboutUs_content}>
        <div className={styles.AboutUs_icon}>
          <IconLogo size={151} />
        </div>
        <div className={styles.AboutUs_name}>{productName}</div>
        <div className={styles.AboutUs_version}>version: {version}</div>
        <Button
          disabled={updateStatus === "2"}
          type="default"
          className={styles.AboutUs_button}
          onClick={handleClick}
          loading={loading}
        >
          {updateMap[updateStatus]}
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
