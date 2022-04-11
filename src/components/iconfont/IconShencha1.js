/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconShencha1 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M794.682182 646.574545l-48.546909-48.546909a106.356364 106.356364 0 0 0-4.538182-4.270545A232.226909 232.226909 0 0 0 756.363636 512c0-128.535273-104.192-232.727273-232.727272-232.727273s-232.727273 104.192-232.727273 232.727273 104.192 232.727273 232.727273 232.727273c22.597818 0 44.439273-3.223273 65.093818-9.227637 2.816 3.700364 5.922909 7.261091 9.309091 10.635637l44.253091 44.253091A301.568 301.568 0 0 1 523.636364 814.545455c-167.098182 0-302.545455-135.447273-302.545455-302.545455s135.447273-302.545455 302.545455-302.545455 302.545455 135.447273 302.545454 302.545455c0 48.349091-11.333818 94.045091-31.499636 134.574545z m-117.818182-79.104a104.459636 104.459636 0 0 0-78.836364 30.557091 104.366545 104.366545 0 0 0-30.626909 70.935273A163.060364 163.060364 0 0 1 523.636364 674.909091c-89.972364 0-162.909091-72.936727-162.909091-162.909091s72.936727-162.909091 162.909091-162.909091 162.909091 72.936727 162.909091 162.909091c0 19.479273-3.421091 38.155636-9.681455 55.470545z m-37.701818 71.703273a46.545455 46.545455 0 0 1 65.838545 0l98.734546 98.734546a46.545455 46.545455 0 1 1-65.826909 65.826909l-98.734546-98.734546a46.545455 46.545455 0 0 1 0-65.826909z"
        fill={getIconColor(color, 0, '#3C8BFF')}
      />
    </svg>
  );
};

IconShencha1.defaultProps = {
  size: 18,
};

export default IconShencha1;
