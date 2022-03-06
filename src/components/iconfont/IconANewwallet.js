/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconANewwallet = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512.553514 1011.462919a27.675676 27.675676 0 0 1-27.675676-27.675676v-940.972973a27.675676 27.675676 0 0 1 55.351351 0v940.972973a27.675676 27.675676 0 0 1-27.675675 27.675676z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <path
        d="M983.04 540.976432h-940.972973a27.675676 27.675676 0 0 1 0-55.351351h940.972973a27.675676 27.675676 0 1 1 0 55.351351z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  );
};

IconANewwallet.defaultProps = {
  size: 18,
};

export default IconANewwallet;
