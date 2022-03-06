/* eslint-disable */

import React from 'react';
import IconAdd from './IconAdd';
import IconNo from './IconNo';
import IconYes from './IconYes';
import IconBack from './IconBack';
import IconANewwallet from './IconANewwallet';
import IconAImportWallet from './IconAImportWallet';
import IconLogo from './IconLogo';
import IconLogos from './IconLogos';
import IconPreservation from './IconPreservation';
import IconATransferin from './IconATransferin';
import IconATransferout from './IconATransferout';
import IconClose from './IconClose';
import IconArrowRight from './IconArrowRight';
import IconACreatnew from './IconACreatnew';
import IconAOpenproject from './IconAOpenproject';
import IconRefresh1 from './IconRefresh1';
import IconSearch from './IconSearch';
import IconProject from './IconProject';
import IconResource from './IconResource';
export { default as IconAdd } from './IconAdd';
export { default as IconNo } from './IconNo';
export { default as IconYes } from './IconYes';
export { default as IconBack } from './IconBack';
export { default as IconANewwallet } from './IconANewwallet';
export { default as IconAImportWallet } from './IconAImportWallet';
export { default as IconLogo } from './IconLogo';
export { default as IconLogos } from './IconLogos';
export { default as IconPreservation } from './IconPreservation';
export { default as IconATransferin } from './IconATransferin';
export { default as IconATransferout } from './IconATransferout';
export { default as IconClose } from './IconClose';
export { default as IconArrowRight } from './IconArrowRight';
export { default as IconACreatnew } from './IconACreatnew';
export { default as IconAOpenproject } from './IconAOpenproject';
export { default as IconRefresh1 } from './IconRefresh1';
export { default as IconSearch } from './IconSearch';
export { default as IconProject } from './IconProject';
export { default as IconResource } from './IconResource';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'add':
      return <IconAdd {...rest} />;
    case 'no':
      return <IconNo {...rest} />;
    case 'yes':
      return <IconYes {...rest} />;
    case 'back':
      return <IconBack {...rest} />;
    case 'a-Newwallet':
      return <IconANewwallet {...rest} />;
    case 'a-ImportWallet':
      return <IconAImportWallet {...rest} />;
    case 'logo':
      return <IconLogo {...rest} />;
    case 'logos':
      return <IconLogos {...rest} />;
    case 'preservation':
      return <IconPreservation {...rest} />;
    case 'a-Transferin':
      return <IconATransferin {...rest} />;
    case 'a-Transferout':
      return <IconATransferout {...rest} />;
    case 'close':
      return <IconClose {...rest} />;
    case 'arrow-right':
      return <IconArrowRight {...rest} />;
    case 'a-creatnew':
      return <IconACreatnew {...rest} />;
    case 'a-openproject':
      return <IconAOpenproject {...rest} />;
    case 'Refresh1':
      return <IconRefresh1 {...rest} />;
    case 'search':
      return <IconSearch {...rest} />;
    case 'project':
      return <IconProject {...rest} />;
    case 'resource':
      return <IconResource {...rest} />;

  }

  return null;
};

export default IconFont;
