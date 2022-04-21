/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconXinjianwenjian = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 96h277.12a64 64 0 0 1 59.328 40l32.384 80.096a64 64 0 0 0 59.328 40H896a64 64 0 0 1 64 64V864a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64V160a64 64 0 0 1 64-64z m0 96v640a32 32 0 0 0 32 32h704a32 32 0 0 0 32-32V352.096a32 32 0 0 0-32-32h-307.808c-52.16 0-99.136-31.68-118.72-80.032l-24.288-60.064A32 32 0 0 0 383.52 160H160a32 32 0 0 0-32 32z"
        fill={getIconColor(color, 0, '#8f8f8f')}
      />
      <path
        d="M352 576m32 0l256 0q32 0 32 32l0 0q0 32-32 32l-256 0q-32 0-32-32l0 0q0-32 32-32Z"
        fill={getIconColor(color, 1, '#8f8f8f')}
      />
      <path
        d="M544 448m0 32l0 256q0 32-32 32l0 0q-32 0-32-32l0-256q0-32 32-32l0 0q32 0 32 32Z"
        fill={getIconColor(color, 2, '#8f8f8f')}
      />
    </svg>
  );
};

IconXinjianwenjian.defaultProps = {
  size: 18,
};

export default IconXinjianwenjian;
