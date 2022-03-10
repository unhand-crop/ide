/* eslint-disable */

import React from "react";
import { getIconColor } from "./helper";

const DEFAULT_STYLE = {
  display: "block",
};

const IconACreatnew = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size + "px"}
      height={size + "px"}
      style={style}
      {...rest}
    >
      <path
        d="M988.795217 546.578611H35.204783a34.787335 34.787335 0 0 1 0-69.57467h953.590434a34.787335 34.787335 0 0 1 0 69.57467z"
        fill={getIconColor(color, 0, "#FFFFFF")}
      />
      <path
        d="M511.976808 1023.350636a34.787335 34.787335 0 0 1-34.787335-34.787335V35.019251a34.787335 34.787335 0 0 1 69.574671 0v953.54405a34.787335 34.787335 0 0 1-34.787336 34.787335z"
        fill={getIconColor(color, 1, "#FFFFFF")}
      />
    </svg>
  );
};

IconACreatnew.defaultProps = {
  size: 18,
};

export default IconACreatnew;
