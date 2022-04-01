/* eslint-disable */

import React from 'react';

const DEFAULT_STYLE = {
    display: 'block',
};

const InfoBacktestButtonIcon = ({ size, color, style: _style, ...rest }) => {
    const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;
    return (
        <svg
            t="1648804439437"
            width={`${size}px`}
            height={`${size}px`}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...rest}
        >
            <path
                d="M885.113 489.373L628.338 232.599c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255l203.3 203.3H158.025c-17.036 0-30.846 13.811-30.846 30.846 0 17.036 13.811 30.846 30.846 30.846h628.36L583.084 746.147c-12.497 12.496-12.497 32.758 0 45.255 6.248 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372l256.775-256.775a31.999 31.999 0 0 0 0-45.254z"
                fill={color}
                p-id="2189"
            ></path>
        </svg>
    );
};

export default InfoBacktestButtonIcon;
