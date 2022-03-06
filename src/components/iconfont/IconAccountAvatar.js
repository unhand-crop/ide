/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconAccountAvatar = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 1023.120808c282.282667 0 511.120808-228.838141 511.120808-511.120808S794.282667 0.879192 512 0.879192 0.879192 229.717333 0.879192 512 229.717333 1023.120808 512 1023.120808z m-4.313212-782.63596c103.434343 0 189.626182 86.191838 189.626182 189.626182s-86.191838 189.626182-189.626182 189.626182S318.060606 533.545374 318.060606 430.11103 404.252444 240.484848 507.686788 240.484848zM193.080889 856.219152c56.030384-124.979717 176.696889-206.868687 314.616242-206.868687s258.585859 81.88897 314.616243 206.868687c-77.565414 80.213333-193.939394 129.292929-314.616243 129.292929-120.676848-4.302869-234.496-47.393616-314.616242-129.292929z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconAccountAvatar.defaultProps = {
  size: 18,
};

export default IconAccountAvatar;
