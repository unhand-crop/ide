/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconDocument = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M859.873002 737.280229h-450.55964a81.346495 81.346495 0 0 1-57.917394-23.96158A81.633215 81.633215 0 0 1 327.434388 655.360295V81.920754c0-21.872623 8.519673-42.475486 24.00254-57.917394A81.223615 81.223615 0 0 1 409.354322 0.000819h269.188905l263.331629 263.37259V655.360295a81.715135 81.715135 0 0 1-82.001854 81.919934zM409.354322 53.248777c-7.659514 0-14.868468 2.990078-20.275184 8.396793s-8.437753 12.61567-8.437753 20.275184v573.439541a28.549097 28.549097 0 0 0 28.671977 28.631017h450.55964a28.590057 28.590057 0 0 0 28.671977-28.631017V285.409871L656.424844 53.248777H409.354322z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M630.783905 986.31683h-450.55964a108.666793 108.666793 0 0 1-108.543913-108.543913v-573.439541A108.666793 108.666793 0 0 1 180.224265 195.789463h166.010748v53.247957H180.224265a55.295956 55.295956 0 0 0-55.295955 55.295956v573.439541c0 30.474216 24.78078 55.295956 55.295955 55.295956h450.55964c30.474216 0 55.295956-24.78078 55.295956-55.295956v-158.310273h53.288917v158.310273c0 59.842512-48.742361 108.543913-108.584873 108.543913zM913.325759 299.909699H671.743872a26.623979 26.623979 0 0 1-26.623978-26.623978V31.662874a26.705899 26.705899 0 0 1 45.465563-18.841585l241.540927 241.622847a26.623979 26.623979 0 0 1-18.800625 45.465563z m-214.916948-53.247957h150.650759l-150.650759-150.73268v150.73268z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconDocument.defaultProps = {
  size: 18,
};

export default IconDocument;
