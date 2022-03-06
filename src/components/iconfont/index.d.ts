/* eslint-disable */

import { SVGAttributes, FunctionComponent } from 'react';
export { default as IconTianjia } from './IconTianjia';
export { default as IconChart } from './IconChart';
export { default as IconCongratulations } from './IconCongratulations';
export { default as IconNo } from './IconNo';
export { default as IconYes } from './IconYes';
export { default as IconBack } from './IconBack';
export { default as IconANewwallet } from './IconANewwallet';
export { default as IconAImportWallet } from './IconAImportWallet';
export { default as IconLogo } from './IconLogo';
export { default as IconLogos } from './IconLogos';
export { default as IconSettingClose } from './IconSettingClose';
export { default as IconPreservation } from './IconPreservation';
export { default as IconATransferin } from './IconATransferin';
export { default as IconATransferout } from './IconATransferout';
export { default as IconAccountAvatar } from './IconAccountAvatar';
export { default as IconClose } from './IconClose';
export { default as IconArrowRight } from './IconArrowRight';
export { default as IconACreatnew } from './IconACreatnew';
export { default as IconAOpenproject } from './IconAOpenproject';
export { default as IconFilter01 } from './IconFilter01';
export { default as IconAAboutmore1 } from './IconAAboutmore1';
export { default as IconRefresh1 } from './IconRefresh1';
export { default as IconPlugIn } from './IconPlugIn';
export { default as IconUser } from './IconUser';
export { default as IconSearch } from './IconSearch';
export { default as IconProject } from './IconProject';
export { default as IconResource } from './IconResource';
export { default as IconDocument } from './IconDocument';
export { default as IconSetup } from './IconSetup';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: 'tianjia' | 'chart' | 'congratulations' | 'no' | 'yes' | 'back' | 'a-Newwallet' | 'a-ImportWallet' | 'logo' | 'logos' | 'setting-CLOSE' | 'preservation' | 'a-Transferin' | 'a-Transferout' | 'account-avatar' | 'close' | 'arrow-right' | 'a-creatnew' | 'a-openproject' | 'filter-01' | 'a-aboutmore1' | 'Refresh1' | 'Plug-in' | 'user' | 'search' | 'project' | 'resource' | 'document' | 'setup';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
