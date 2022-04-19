import { IconPython } from "@/components/iconfont";

import React, { useEffect, useState } from "react";

import styles from "./newAlgorithmSidebar.module.scss";;


const languageList = [{
  name: "python"
}];

export default () => {
  return <div className={styles.body}>
    {
      languageList.map((item: any) => {
        return <div className={styles.language_list}>
          <IconPython size={26} />
          <span className={styles.language_name}>{item.name}</span>
        </div>
      })
    }
  </div>
}