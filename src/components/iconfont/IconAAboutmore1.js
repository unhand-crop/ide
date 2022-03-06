/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconAAboutmore1 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 6134 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M519.078341 514.359447m-509.640553 0a509.640553 509.640553 0 1 0 1019.281106 0 509.640553 509.640553 0 1 0-1019.281106 0Z"
        fill={getIconColor(color, 0, '#D8D8D8')}
      />
      <path
        d="M3072 514.359447m-509.640553 0a509.640553 509.640553 0 1 0 1019.281106 0 509.640553 509.640553 0 1 0-1019.281106 0Z"
        fill={getIconColor(color, 1, '#D8D8D8')}
      />
      <path
        d="M5620.202765 514.359447m-509.640553 0a509.640553 509.640553 0 1 0 1019.281106 0 509.640553 509.640553 0 1 0-1019.281106 0Z"
        fill={getIconColor(color, 2, '#D8D8D8')}
      />
    </svg>
  );
};

IconAAboutmore1.defaultProps = {
  size: 18,
};

export default IconAAboutmore1;
