/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconSearch = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M77.824 978.28864a26.624 26.624 0 0 1-18.80064-45.4656l368.64-368.64a26.624 26.624 0 1 1 37.64224 37.6832l-368.64 368.64a26.8288 26.8288 0 0 1-18.8416 7.7824z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M642.8672 675.84c-184.1152 0-333.86496-147.00544-333.86496-327.68s149.79072-327.68 333.86496-327.68c184.1152 0 333.90592 147.00544 333.90592 327.68s-149.79072 327.68-333.90592 327.68z m0-602.112c-154.74688 0-280.65792 123.12576-280.65792 274.432s125.91104 274.39104 280.65792 274.39104c154.74688 0 280.65792-123.0848 280.65792-274.39104s-125.87008-274.432-280.65792-274.432z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconSearch.defaultProps = {
  size: 18,
};

export default IconSearch;
