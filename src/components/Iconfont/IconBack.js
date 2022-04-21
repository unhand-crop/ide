/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconBack = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M230.821647 490.375529c-0.602353 1.144471-1.204706 2.288941-1.686588 3.433412l-0.060235 0.180706a19.516235 19.516235 0 0 0-0.662589 1.686588l-0.060235 0.180706a17.769412 17.769412 0 0 0-0.602353 1.626353l-0.060235 0.301177-0.481883 1.566117-0.12047 0.361412-0.361412 1.505882-0.060235 0.481883-0.301177 1.445647-0.060235 0.542117-0.180706 1.445647-0.060235 0.602353-0.180706 1.566118-0.060235 0.542118a49.212235 49.212235 0 0 0 0.060235 4.758588l0.120471 1.505882 0.060235 0.602353 0.180706 1.445647a1.807059 1.807059 0 0 0 0.12047 0.542118l0.301177 1.445647 0.060235 0.481882 0.361412 1.505883 0.12047 0.361411a16.624941 16.624941 0 0 0 0.481883 1.626353l0.060235 0.240942 0.542118 1.626353 0.060235 0.180705 0.722824 1.686589 0.060235 0.12047 0.783059 1.746824 0.903529 1.686588a40.357647 40.357647 0 0 0 7.047529 9.456941l488.146824 447.006118a40.598588 40.598588 0 1 0 57.464471-57.464471L326.053647 509.952l457.426824-418.454588a40.598588 40.598588 0 1 0-57.464471-57.464471L237.869176 480.978824a42.646588 42.646588 0 0 0-7.047529 9.396705z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconBack.defaultProps = {
  size: 18,
};

export default IconBack;