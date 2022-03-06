/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconAImportWallet = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M511.861622 666.513297a27.675676 27.675676 0 0 1-27.675676-27.675675V43.478486a27.675676 27.675676 0 0 1 55.351351 0v595.359136a27.675676 27.675676 0 0 1-27.675675 27.675675zM954.672432 1012.791351h-885.621621a27.675676 27.675676 0 1 1 0-55.351351h885.621621a27.675676 27.675676 0 1 1 0 55.351351z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <path
        d="M511.861622 763.71027l262.918919-304.432432h-525.837838z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  );
};

IconAImportWallet.defaultProps = {
  size: 18,
};

export default IconAImportWallet;
