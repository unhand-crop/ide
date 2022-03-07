/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconResource = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M322.389333 478.122667H134.4A113.194667 113.194667 0 0 1 21.333333 365.056V177.066667A113.194667 113.194667 0 0 1 134.4 64h187.989333a113.194667 113.194667 0 0 1 113.066667 113.066667v187.989333a113.194667 113.194667 0 0 1-113.066667 113.066667zM134.4 119.466667A57.6 57.6 0 0 0 76.8 177.066667v187.989333c0 31.786667 25.813333 57.6 57.6 57.6h187.989333a57.6 57.6 0 0 0 57.6-57.6V177.066667a57.6 57.6 0 0 0-57.6-57.6H134.4zM846.933333 1003.178667h-187.946666a113.194667 113.194667 0 0 1-113.066667-113.066667v-187.946667a113.194667 113.194667 0 0 1 113.066667-113.066666h187.946666a113.194667 113.194667 0 0 1 113.066667 113.066666v187.946667c0 62.293333-50.730667 113.066667-113.066667 113.066667z m-187.989333-358.656c-31.744 0-57.6 25.813333-57.6 57.6v187.946666c0 31.744 25.813333 57.6 57.6 57.6h187.946667c31.744 0 57.6-25.813333 57.6-57.6v-187.946666c0-31.744-25.813333-57.6-57.6-57.6h-187.946667zM322.389333 1003.178667H134.4a113.194667 113.194667 0 0 1-113.066667-113.066667v-187.946667a113.194667 113.194667 0 0 1 113.066667-113.066666h187.989333a113.194667 113.194667 0 0 1 113.066667 113.066666v187.946667c0 62.293333-50.730667 113.066667-113.066667 113.066667zM134.4 644.522667a57.6 57.6 0 0 0-57.6 57.6v187.946666c0 31.744 25.813333 57.6 57.6 57.6h187.989333a57.6 57.6 0 0 0 57.6-57.6v-187.946666c0-31.744-25.813333-57.6-57.6-57.6H134.4zM753.408 516.992a112.682667 112.682667 0 0 1-79.914667-33.024l-132.949333-132.949333a113.194667 113.194667 0 0 1 0-159.872l132.906667-132.949334a113.28 113.28 0 0 1 159.957333 0l132.906667 132.949334c21.333333 21.333333 33.109333 49.749333 33.109333 79.957333s-11.776 58.624-33.109333 79.957333l-132.906667 132.906667a112.810667 112.810667 0 0 1-80 33.024z m0.042667-436.437333c-14.805333 0-29.525333 5.632-40.746667 16.853333l-132.906667 132.906667c-10.88 10.88-16.896 25.344-16.896 40.746666s6.016 29.866667 16.896 40.746667l132.906667 132.949333a57.813333 57.813333 0 0 0 81.493333 0l132.864-132.906666c10.922667-10.88 16.896-25.344 16.896-40.746667s-5.973333-29.866667-16.896-40.704l-132.906666-132.949333a57.173333 57.173333 0 0 0-40.704-16.896z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconResource.defaultProps = {
  size: 18,
};

export default IconResource;