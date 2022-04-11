/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconProgressReject = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#DD685A')}
      />
      <path
        d="M291.2 761.6c-6.4 0-12.8-3.2-16-6.4-9.6-9.6-9.6-25.6 0-35.2L713.6 281.6c9.6-9.6 25.6-9.6 35.2 0s9.6 25.6 0 35.2L310.4 755.2c-6.4 6.4-12.8 6.4-19.2 6.4z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M732.8 761.6c-6.4 0-12.8-3.2-16-6.4L275.2 316.8c-9.6-9.6-9.6-25.6 0-35.2s25.6-9.6 35.2 0l438.4 438.4c9.6 9.6 9.6 25.6 0 35.2-3.2 6.4-9.6 6.4-16 6.4z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </svg>
  );
};

IconProgressReject.defaultProps = {
  size: 18,
};

export default IconProgressReject;
