/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconShencha = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 16c4.8 0 9.5 1 14.1 3.1l400.1 187.4c14.2 6.6 24.2 20 26.3 35.6 25.9 178.7-2 334.4-83 466.3-11.4 18.8-25.5 38.7-42.4 59.7L684.6 630.8c27.8-38.2 44.2-85.2 44.2-136 0-127.4-103-230.7-230-230.7s-230 103.3-230 230.7 103 230.7 230 230.7c48.5 0 93.5-15.1 130.6-40.7L776 825.9c-13.3 13.8-27.3 27.4-41.9 40.9-8.9 7.8-18.1 15.5-27.6 23-52 41.6-111.9 79.5-179.6 113.7-4.8 2.4-10 3.5-14.9 3.5-5.1 0-10.2-1.1-14.9-3.5C165.9 836.2 22.4 580.2 71.3 242.1c2.3-15.5 12.1-28.9 26.3-35.6L497.9 19.1c4.6-2.1 9.4-3.1 14.1-3.1z m-11.8 356.4c68.5 0 124 55.6 124 124s-55.6 124-124 124-124-55.6-124-124 55.5-124 124-124z"
        fill={getIconColor(color, 0, '#4ACFB1')}
      />
    </svg>
  );
};

IconShencha.defaultProps = {
  size: 18,
};

export default IconShencha;
