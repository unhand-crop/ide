/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconXinrenqu = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1060 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M725.792656 494.924756a40.734548 40.734548 0 0 1 62.711806 51.985042l-3.258764 3.879481-167.787542 178.320333a40.734548 40.734548 0 0 1-62.711806-51.985042l3.258763-3.879481z"
        fill={getIconColor(color, 0, '#5011FF')}
      />
      <path
        d="M470.716797 33.576906c20.1733 10.047855 28.378402 52.489375 18.330546 72.662674s-52.489375 28.378402-72.662674 18.330547C325.488435 79.315984 251.797698 96.599071 179.232011 167.612966l-6.20717 6.245964C77.589615 273.833149 93.107538 412.796149 183.693413 515.738171l7.351616 7.99173 344.032353 364.011679 339.12481-363.196988c92.389834-102.80624 110.313035-248.771703 17.942598-351.59734l-5.819221-6.245964c-86.415434-89.441429-203.672739-89.228057-290.6313-0.155179l-6.944271 7.39041-232.865832 242.467547a44.808003 44.808003 0 0 1-58.890517 0c-16.429601-13.907938-16.099845-53.304065-3.258764-70.567755l3.258764-3.87948L528.9672 100.594936a292.900796 292.900796 0 0 1 433.958717-8.399076c2.657444 2.773829 5.256696 5.547657 7.758961 8.399076a363.003014 363.003014 0 0 1 7.09945 470.484028l-7.758962 8.864613-405.153572 431.087901-0.853485 0.89228-0.775897 0.737102-1.066857 0.853485-1.028062 1.028063-0.96987 0.737101 3.064789-2.618649a41.083701 41.083701 0 0 1-30.279347 11.134109 41.607431 41.607431 0 0 1-20.735824-6.94427q-1.4936-1.04746-2.890214-2.211304l-1.222036-0.96987-0.892281-0.853486-0.814691-0.892281-0.81469-0.737101L95.997751 580.040564a348.551948 348.551948 0 0 1 0-480.473691l8.282692-8.360281a320.057162 320.057162 0 0 1 366.436354-57.610289z"
        fill={getIconColor(color, 1, '#5011FF')}
      />
    </svg>
  );
};

IconXinrenqu.defaultProps = {
  size: 18,
};

export default IconXinrenqu;