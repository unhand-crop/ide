/* eslint-disable */

import IconACreatnew from "./IconACreatnew";
import IconAImportWallet from "./IconAImportWallet";
import IconANewwallet from "./IconANewwallet";
import IconAOpenproject from "./IconAOpenproject";
import IconATransferin from "./IconATransferin";
import IconATransferout from "./IconATransferout";
import IconAdd from "./IconAdd";
import IconArrowRight from "./IconArrowRight";
import IconBack from "./IconBack";
import IconClose from "./IconClose";
import IconLogo from "./IconLogo";
import IconLogos from "./IconLogos";
import IconNo from "./IconNo";
import IconPreservation from "./IconPreservation";
import IconProject from "./IconProject";
import IconRefresh1 from "./IconRefresh1";
import IconResource from "./IconResource";
import IconSearch from "./IconSearch";
import IconYes from "./IconYes";
import IconProgressReslove from "./IconProgressReslove";
import IconProgressReject from "./IconProgressReject";
import IconProgressPending from "./IconProgressPending";
import IconProgressWait from "./IconProgressWait";
import IconInfoBacktestButton from "./IconInfoBacktestButton";
import IconAlgorithm from "./IconAlgorithm";
import IconLanguage from "./IconLanguage";

import React from "react";
export { default as IconAdd } from "./IconAdd";
export { default as IconNo } from "./IconNo";
export { default as IconYes } from "./IconYes";
export { default as IconBack } from "./IconBack";
export { default as IconANewwallet } from "./IconANewwallet";
export { default as IconAImportWallet } from "./IconAImportWallet";
export { default as IconLogo } from "./IconLogo";
export { default as IconLogos } from "./IconLogos";
export { default as IconPreservation } from "./IconPreservation";
export { default as IconATransferin } from "./IconATransferin";
export { default as IconATransferout } from "./IconATransferout";
export { default as IconClose } from "./IconClose";
export { default as IconArrowRight } from "./IconArrowRight";
export { default as IconACreatnew } from "./IconACreatnew";
export { default as IconAOpenproject } from "./IconAOpenproject";
export { default as IconRefresh1 } from "./IconRefresh1";
export { default as IconSearch } from "./IconSearch";
export { default as IconProject } from "./IconProject";
export { default as IconResource } from "./IconResource";
export { default as IconProgressReslove } from "./IconProgressReslove";
export { default as IconProgressReject } from "./IconProgressReject";
export { default as IconProgressPending } from "./IconProgressPending";
export { default as IconProgressWait } from "./IconProgressWait";
export { default as IconInfoBacktestButton } from "./IconInfoBacktestButton";
export { default as IconAlgorithm } from "./IconAlgorithm";
export { default as IconLanguage } from "./IconLanguage";

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case "add":
      return <IconAdd {...rest} />;
    case "no":
      return <IconNo {...rest} />;
    case "yes":
      return <IconYes {...rest} />;
    case "back":
      return <IconBack {...rest} />;
    case "a-Newwallet":
      return <IconANewwallet {...rest} />;
    case "a-ImportWallet":
      return <IconAImportWallet {...rest} />;
    case "logo":
      return <IconLogo {...rest} />;
    case "logos":
      return <IconLogos {...rest} />;
    case "preservation":
      return <IconPreservation {...rest} />;
    case "a-Transferin":
      return <IconATransferin {...rest} />;
    case "a-Transferout":
      return <IconATransferout {...rest} />;
    case "close":
      return <IconClose {...rest} />;
    case "arrow-right":
      return <IconArrowRight {...rest} />;
    case "a-creatnew":
      return <IconACreatnew {...rest} />;
    case "a-openproject":
      return <IconAOpenproject {...rest} />;
    case "Refresh1":
      return <IconRefresh1 {...rest} />;
    case "search":
      return <IconSearch {...rest} />;
    case "project":
      return <IconProject {...rest} />;
    case "resource":
      return <IconResource {...rest} />;
    case "IconProgressReslove":
      return <IconProgressReslove {...rest} />;
    case "IconProgressReject":
      return <IconProgressReject {...rest} />;
    case "IconProgressPending":
      return <IconProgressPending {...rest} />;
    case "ProgressWait":
      return <IconProgressWait {...rest} />;
    case "IconInfoBacktestButton":
      return <IconInfoBacktestButton {...rest} />;
    case "IconAlgorithm":
      return <IconAlgorithm {...rest} />;
    case "IconLanguage":
      return <IconLanguage {...rest} />;
  }

  return null;
};

export default IconFont;
