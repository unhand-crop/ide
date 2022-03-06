/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconSettingClose = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M69.812706 1017.072941a63.668706 63.668706 0 0 1-44.995765-108.724706L909.071059 24.094118a63.668706 63.668706 0 1 1 90.051765 90.051764l-884.254118 884.254118c-12.468706 12.408471-28.732235 18.672941-45.056 18.672941z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M954.127059 1017.072941a63.247059 63.247059 0 0 1-44.995765-18.672941L24.877176 114.145882A63.668706 63.668706 0 1 1 114.928941 24.094118l884.254118 884.254117a63.668706 63.668706 0 0 1-45.056 108.724706z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconSettingClose.defaultProps = {
  size: 18,
};

export default IconSettingClose;
