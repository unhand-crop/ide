import { AlgorithmIcon, LanguageIcon } from "@/components/iconfont";

import React, { useEffect, useState } from "react";

import styles from "./newAlgorithmSidebar.module.scss";;

export const NewalgorithmSidebarIcon = () => {
  return <div className={styles.icon_body}>
    <AlgorithmIcon size={26} color="#e6e6e6" />
  </div>
};

const languageList = [{
  name: "python"
}];

export default () => {
  return <div className={styles.body}>
    {
      languageList.map((item: any) => {
        return <div className={styles.language_list}>
          <LanguageIcon size={26} language="python" />
          <span className={styles.language_name}>{item.name}</span>
        </div>
      })
    }
  </div>
}