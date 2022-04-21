/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconMistakebeifen = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#DD685A')}
      />
      <path
        d="M518.4 832c-176 0-320-144-320-320s144-320 320-320 320 144 320 320c0 12.8-9.6 25.6-25.6 25.6s-25.6-9.6-25.6-25.6c0-150.4-121.6-272-272-272S243.2 361.6 243.2 512s121.6 272 272 272c12.8 0 25.6 9.6 25.6 25.6s-9.6 22.4-22.4 22.4z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M816.768 562.688c-6.72-2.528-13.088-1.856-16.928-7.872-10.24-5.376-11.904-21.28-3.36-31.84l79.424-101.664a25.12 25.12 0 0 1 35.008-3.68c10.56 8.544 12.224 24.48 3.68 35.008l-79.744 98.496c-5.696 7.04-11.712 10.88-18.08 11.52z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <path
        d="M813.568 563.008c-3.52-2.848-9.888-2.176-13.728-8.192l-98.464-79.744a25.12 25.12 0 0 1-3.68-35.008 25.12 25.12 0 0 1 35.008-3.68l95.616 83.264c10.56 8.544 12.224 24.448 3.68 35.008-2.848 3.52-12.064 7.68-18.432 8.352z"
        fill={getIconColor(color, 3, '#FFFFFF')}
      />
    </svg>
  );
};

IconMistakebeifen.defaultProps = {
  size: 18,
};

export default IconMistakebeifen;
