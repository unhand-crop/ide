/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconYes = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1424 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M523.337143 1011.346286a109.714286 109.714286 0 0 1-77.531429-187.318857l782.628572-782.628572a109.714286 109.714286 0 1 1 155.209143 155.062857L600.941714 979.236571a108.982857 108.982857 0 0 1-77.531428 32.182858z"
        fill={getIconColor(color, 0, '#0000FF')}
      />
      <path
        d="M523.337143 1011.346286c-28.013714 0-56.100571-10.678857-77.531429-32.182857L42.861714 576.365714a109.714286 109.714286 0 1 1 155.209143-155.136l402.870857 402.870857a109.714286 109.714286 0 0 1-77.531428 187.318858z"
        fill={getIconColor(color, 1, '#0000FF')}
      />
    </svg>
  );
};

IconYes.defaultProps = {
  size: 18,
};

export default IconYes;
