/* eslint-disable */

import React from 'react';

const DEFAULT_STYLE = {
    display: 'block',
};

const ProgressReject = ({ size, color, style: _style, ...rest }) => {
    const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;
    return (
        <svg
            class="icon"
            width={`${size}px`}
            height={`${size}px`}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...rest}
        >
            <path d="M512 512m-496 0a496 496 0 1 0 992 0 496 496 0 1 0-992 0Z" fill="#D8D8D8" />
            <path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m0-992C246.4 32 32 246.4 32 512s214.4 480 480 480 480-214.4 480-480S777.6 32 512 32z" fill="#979797" />
            <path d="M361.6 710.4c-6.4 0-16-3.2-19.2-9.6l-169.6-227.2c-6.4-9.6-6.4-25.6 6.4-32 9.6-6.4 25.6-6.4 32 6.4l153.6 208L819.2 320c9.6-6.4 25.6-6.4 32 6.4 6.4 9.6 6.4 25.6-6.4 32L374.4 704c-3.2 3.2-9.6 6.4-12.8 6.4z" fill="#FFFFFF" />
        </svg>
    );
};

export default ProgressReject;
