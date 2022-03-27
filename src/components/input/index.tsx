import React, { CSSProperties } from 'react';
import { Input as AntInput } from 'antd';
import styles from './index.module.scss';

interface InputProps {
    style?: CSSProperties;
    placeholder?: string;
}

function Input({ style, placeholder, ...props }: InputProps) {
    return (
        <AntInput style={style} className={styles.input} { ...props } placeholder={placeholder}  />
    )
}

export default Input
