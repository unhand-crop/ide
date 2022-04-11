/* eslint-disable */

import { SVGAttributes, FunctionComponent } from 'react';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  language?: string;
  color?: string | string[];
}

declare const IconLanguage: FunctionComponent<Props>;

export default IconLanguage;
