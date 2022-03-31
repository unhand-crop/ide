/* eslint-disable */

import { SVGAttributes, FunctionComponent } from 'react';
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
export { default as ProgressReslove } from './ProgressReslove';
export { default as ProgressReject } from './ProgressReject';
export { default as ProgressPending } from './ProgressPending';
export { default as ProgressWait } from './ProgressWait';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: 'add' | 'no' | 'yes' | 'back' | 'a-Newwallet' | 'a-ImportWallet' | 'logo' | 'logos' | 'preservation' | 'a-Transferin' | 'a-Transferout' | 'close' | 'arrow-right' | 'a-creatnew' | 'a-openproject' | 'Refresh1' | 'search' | 'project' | 'resource';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
