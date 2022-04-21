/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconAOpenproject = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1169 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M90.267016 977.554818h-89.432314V82.635459C0.834702 37.0846 37.919301 0 83.47016 0h301.506143c19.913595 0 39.230975 7.214207 54.315225 20.330946l158.295197 137.964251c12.580146 10.970364 28.737584 17.051761 45.371994 17.051761h322.373683c45.550859 0 82.635459 37.0846 82.635458 82.635458v265.554353h-89.432314v-258.757497h-315.576827a158.235575 158.235575 0 0 1-104.158835-39.05211L380.564309 87.762911l-290.297293 1.669403V977.554818z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <path
        d="M45.014265 1020.363086a44.716157 44.716157 0 0 1-40.483028-61.648676l172.783232-421.882037a44.716157 44.716157 0 0 1 41.496594-27.724018l905.114643 2.205997a44.418049 44.418049 0 0 1 37.024978 19.853974c8.287394 12.401281 9.897176 28.022125 4.173508 41.854323l-172.842853 421.882038a44.596914 44.596914 0 0 1-41.496594 27.724018l-905.055022-2.205998-0.715458-0.059621z m200.9246-416.15837l-130.571179 334.774964 808.468122-11.626201 130.6308-334.774964-808.527743 11.626201z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  );
};

IconAOpenproject.defaultProps = {
  size: 18,
};

export default IconAOpenproject;