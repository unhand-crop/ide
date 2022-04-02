/* eslint-disable */

import React from 'react';

const DEFAULT_STYLE = {
    display: 'block',
};

const ProgressReslove = ({ size, color, style: _style, ...rest }) => {
    const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;
    return (
        <svg
            width={`${size}px`}
            height={`${size}px`}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...rest}
        >
            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#2154E0" />
            <path d="M360.32 709.12a24.32 24.32 0 0 1-19.52-9.6l-168.64-227.84a24 24 0 0 1 38.4-28.48l154.56 208.64L818.24 320a24.32 24.32 0 0 1 33.6 5.12 24 24 0 0 1-5.12 32L374.4 704a23.04 23.04 0 0 1-14.08 5.12z" fill="#FFFFFF" />
        </svg>
    );
};

export default ProgressReslove;
