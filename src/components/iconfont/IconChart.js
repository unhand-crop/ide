/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconChart = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M85.191348 938.808652V0H0v1024h1024v-85.191348H85.191348z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M412.326123 495.813644L711.347754 613.377704l295.613976-462.589018-72.412645-46.003328-257.27787 403.806988-298.169717-117.56406-270.908486 413.178037 70.708818 46.003328 233.424293-354.396007z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconChart.defaultProps = {
  size: 18,
};

export default IconChart;
