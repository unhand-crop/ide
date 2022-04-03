/* eslint-disable */

import { SVGAttributes, FunctionComponent } from 'react';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  language?: string;
  color?: string | string[];
}

declare const LanguageIcon: FunctionComponent<Props>;

export default LanguageIcon;
