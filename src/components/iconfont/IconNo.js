/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconNo = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M97.400471 1014.723765a90.352941 90.352941 0 0 1-63.849412-154.262589L861.003294 32.888471a90.352941 90.352941 0 1 1 127.759059 127.759058L161.310118 988.220235c-17.709176 17.648941-40.839529 26.503529-63.849412 26.50353z"
        fill={getIconColor(color, 0, '#2222FF')}
      />
      <path
        d="M924.912941 1014.723765c-23.070118 0-46.200471-8.854588-63.849412-26.50353L33.370353 160.647529A90.352941 90.352941 0 1 1 161.310118 32.948706l827.51247 827.51247a90.352941 90.352941 0 0 1-63.849412 154.202353z"
        fill={getIconColor(color, 1, '#2222FF')}
      />
    </svg>
  );
};

IconNo.defaultProps = {
  size: 18,
};

export default IconNo;
